require('dotenv').config();
const express = require("express");
require('express-async-errors');
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/api/signup', require('./routes/signup'))
app.use('/api/login', require('./routes/login'))
app.use(require('./middleware/error'))

const httpServer = createServer(app);

// error catching
process.on("uncaughtException", error => {
    console.log("Uncaught exception found: " + error);
});

process.on("unhandledRejection", error => {
    console.log("Unhandled rejected promise found: " + error);
});

// SOCKET STUFF

const generateToken = require('./utilities/generateToken');

const setUserStatus = require("./controllers/setUserStatus");
const findUser = require("./controllers/findUser");
const findGroups = require("./controllers/findGroups");
const findUsers = require('./controllers/findUsers');
const findChats = require('./controllers/findChats');
const findMessages = require('./controllers/findMesssages');
const joinGroup = require('./controllers/joinGroup');
const addChat = require('./controllers/addChat');
const addMessage = require('./controllers/addMessage');
const updateUnseen = require('./controllers/updateUnseen');
const editUser = require('./controllers/editUser');
const editGroup = require('./controllers/editGroup');
const leaveGroup = require('./controllers/leaveGroup');

const io = new Server(httpServer, {
    cors: {
        origin: "https://kudos-caca8.web.app/"
    }
});

io.use((socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        socket.data.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        next(error);
    }
})

io.on("connection", (socket) => {
    async function emitToJoinedRooms() {
        // emit an event to every conversation that the user is part of to notify that the user is now online
        const chats = await findChats(socket.data.user._id);
        if (chats.data) {
            chats.data.forEach(chat => {
                io.to(chat.id).emit("server:update-chats");
            })
        }
    }

    async function makeUserOnline() {
        await setUserStatus(socket.data.user._id, "online");
        await emitToJoinedRooms();
    }
    makeUserOnline();

    socket.on("client:get-user", async (userId, callback) => {
        const user = await findUser(userId);
        callback(user);
    })

    // client will request list of all users when it first loads. List of users are needed when a user tries to find another user to send message to or when creating a group
    socket.on("client:get-users", async (callback) => {
        const users = await findUsers(socket.data.user._id);
        callback(users);
    });

    socket.on("client:get-groups", async (callback) => {
        const groups = await findGroups();
        callback(groups);
    });

    // client will request list of chats when it first loads. Client will also request after a new chat has been created
    socket.on("client:get-chats", async (callback) => {
        const chats = await findChats(socket.data.user._id);
        if (chats.data) {
            const chatIds = chats.data.map(chat => chat.id);
            socket.join(chatIds);
        }
        callback(chats);
    });

    // client will request messages of the chat that the user chose to open/expand
    socket.on("client:get-messages", async (chatId, callback) => {
        const messages = await findMessages(chatId);
        callback(messages);
    });

    // client (user) sends a message to a recipient who has never communicated with the user or user creates a new group and sends a message to that group
    socket.on("client:post-chat", async ({ isGroup, name, members, message, description, img }, callback) => {
        members.push(socket.data.user._id);
        const newChat = await addChat(isGroup, name, members, description, img);
        if (newChat.error) {
            callback(newChat);
            return;
        }
        const firstMsg = await addMessage(message, socket.data.user._id, newChat.data.id);
        callback(firstMsg);
        if (firstMsg.data) {
            io.emit("server:update-chats");
        }
    });

    // client (user) sends a message to a recipient who has already communicated with the user
    socket.on("client:post-message", async (message, chatId, callback) => {
        const addedMsg = await addMessage(message, socket.data.user._id, chatId);
        callback(addedMsg);
        if (addedMsg.data) {
            io.to(chatId).emit("server:update-messages", addedMsg.data);
        }
    });

    // client opens or expands a chat, thereby 'seeing' the sent messages (the new messages are no longer 'unseen')
    socket.on("client:open-chat", async (chatId, callback) => {
        const response = await updateUnseen(socket.data.user._id, chatId);
        callback(response);
    });

    // client joins an already existing group
    socket.on("client:join-group", async (groupId, callback) => {
        const joinedGroup = await joinGroup(groupId, socket.data.user._id);
        callback(joinedGroup);
        if (joinedGroup.data) {
            io.to(joinedGroup.data.id).emit("server:update-chats");
        }
    });

    // client edits their user profile
    socket.on("client:edit-user", async (userId, newData, callback) => {
        const newUser = await editUser(userId, newData);
        if (newUser.data) {
            const { _id, name, img, status } = newUser.data;
            const token = generateToken({ _id, name, img, status });
            callback(newUser, token);
            await emitToJoinedRooms();
        }
        if (newUser.error) {
            callback(newUser, null);
        }
    });

    // client edits group
    socket.on("client:edit-group", async (groupId, newData, callback) => {
        const newGroup = await editGroup(groupId, newData);
        callback(newGroup);
        if (newGroup.data) {
            io.to(newGroup.data.id).emit("server:update-chats");
        }
    });

    // client leaves group
    socket.on("client:leave-group", async (groupId, callback) => {
        const updatedChats = await leaveGroup(groupId, socket.data.user._id);
        callback(updatedChats);
        if (updatedChats.data) {
            io.to(groupId).emit("server:update-chats");
        }
    });

    socket.on("disconnect", async (reason) => {
        await setUserStatus(socket.data.user._id, "offline");
        await emitToJoinedRooms();
    });
});

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to database'))
    .catch(error => console.log(error.message || 'Failed to connect to database'));

httpServer.listen(3003);