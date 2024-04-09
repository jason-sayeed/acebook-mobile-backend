# Acebook MERN back-end mobile applications template

### Set up your project

1. Have one team member fork this repository
2. Rename the fork to `acebook-<team name>`
3. Every team member clone the fork to their local machine
4. Install dependencies:
   ```
   cd ../api
   npm install
   ```
### Setting up environment variables.

We need to create a `.env` file to contain our sensitive environment information. 

Create a file `api/.env` with the following contents:

```
MONGODB_URL="mongodb://0.0.0.0/acebook"
NODE_ENV="development"
JWT_SECRET="secret"
```

### How to run the server and use the app

Start the server application (in the `api` directory) in dev mode:

```
; cd api
; npm run dev
```

### Using this back-end

In order to figure out how to use this back-end, refer to the Mobile_Acebook_Backend.postman_collection.json file - all the details for the endpoints are contained there, so that you can structure your requests to this back-end from your mobile application. 
