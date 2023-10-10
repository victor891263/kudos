# Kudos - API

This guide will walk you through the process of setting up and running the API on your local machine, as well as configuring a MongoDB database locally.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://docs.mongodb.com/manual/installation/) (Community Edition)

## Setting up the database locally

### 1. Start MongoDB Service

On Linux, you can use the following command:

```bash
sudo systemctl start mongod
```

On macOS, you can start MongoDB with:

```bash
brew services start mongodb-community@4.4
```

On Windows, open the Command Prompt as an administrator and run:

```bash
net start MongoDB
```

### 2.Connect to MongoDB

You can use the MongoDB command-line shell to interact with the database. Open a new terminal and run:

```
mongo
```

### 3. Create a database

In the MongoDB shell, create a new database (replace <database_name> with your desired name):

```
use <database_name>
```

Don't forget to retrieve the connection string so that it can be used to connect to the database in the next step (replace <database_name> with your desired name).

```
mongodb://localhost/<database_name>
```

## Running on your local machine

### 1. **Clone the repository:**

```
git clone https://github.com/victor891263/kudos.git .
cd kudos-server
```

### 2. **Install dependencies:**

```
npm install
```

### 3. **Configure environment variables:**

Create a `.env.local` file in the root directory and specify following:

- **DATABASE_URL:** connection string for your local MongoDB database

- **JWT_SECRET:** string used to generate json web tokens

### 4. **Start the development server:**

```
node index.js
```

The API will now be running at `http://localhost:<PORT>`, where `<PORT>` is the port specified in your `index.js` file.