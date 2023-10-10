# Kudos - real-time chat app

Kudos is a real-time chat web application that allows users to create accounts, send instant messages to other users, and collaborate in groups.

## Notable features

- **Group chats:** Create groups with two or more members and exchange messages within the group. All messages are sent to every member.

- **Real-time notifications:** Whenever a message is sent, the recipient is notified instantly. In groups, all members, as recipients, are notified.

- **Online and offline statuses:** Determined based on if the recipient is currently logged in. Users can view the status of the recipient(s).

- **Authentication and authorization:** Secure user accounts and permissions are created and managed with JWT (JSON Web Tokens).

## Technologies

- **Front-end:** Developed using Vue and hosted on Firebase. CI/CD implemented using GitHub Actions for automatic deployment to Firebase when changes are pushed

- **API:** Developed in Node.js and deployed on Render with integrated CI/CD

- **Websockets:** Real-time communication between client and server handled by Socket.io

- **Database:** Utilizes MongoDB as the database with Mongoose as the ODM. Database hosted on MongoDB Atlas

- **Authentication and authorization:** JSON Web Tokens (JWT)

## Visit

https://kudos-caca8.web.app

## Contributing

If you found an issue or would like to submit an improvement to this project, please submit an issue using the issues tab above. If you would like to submit a PR with a fix, reference the issue you created!

## Improvements in mind

- Implement the feature for users to add or remove friends and restrict sending messages and creating groups to friends only. Also view the online/offline status of friends.
- Implement email verification for new user registration and when a user updates their email address.
- Allow users to upload profile images and send and receive files.
- Configure page transitions. Improve hover animations for clickable items.
- Implement unit tests.

## Like the project?

I'm currently studying for a master's degree in computer science at Manchester Metropolitan University and looking for a placement or a full-time role. If you have an opportunity, why not send me an email or send me a message via one of my social media accounts?