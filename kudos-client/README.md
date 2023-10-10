# Kudos - Front-end

## Run on your local machine

Before you begin, make sure you have the following prerequisites installed on your system:

- **Node.js**: Make sure you have Node.js installed on your system. You can download it from the [official Node.js website](https://nodejs.org/).

To run the front-end on your local machine, follow these steps:

1. **Clone the repository:**

    ```
    git clone https://github.com/victor891263/kudos.git .
    cd kudos-client
    ```

2. **Install dependencies:**

    ```
    npm install
    ```

3. **Configure environment variables:**

    Create a `.env.local` file in the root directory and specify the API endpoint.

4. **Start the development server:**

    ```
    npm run serve
    ```

    Open your web browser and navigate to `http://localhost:3000` to view the app. Now you have the front-end running locally on your machine. The page will reload if you make edits.

## Building

Run the following command to build the app for production to the `build` folder.

```
npm run build
```

It correctly bundles the front-end in production mode and optimizes the build for the best performance and deployment-ready.

## Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
