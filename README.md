# DTEKIT community festival API

Link to the hosted version: https://dtek.onrender.com/api/ - will provide a description of all the available endpoints. 

DTEKIT festival API is the backend to a full stack webapp for a community run festival that I help to organise. I have used a Node.js express server using MongoDb and Google cloud to serve endpoints. The frontend is currently in development.

Users: I have made it possible to create, update, delete a user as well as a log in function. I have used bcrypt in order to encrypt and validate passwords. no un-ecrypted passwords are stored in the backend. The users information is stored on a mongoDb atlas cluster. 

Pics: its possible to fetch image urls (original photos stored on google cloud) of photos from past festivals, this can be combined with filtering, sort_by and pagination. Its also possible to upload an image as well using jpg/png - which will post to the cloud.

Mixes: its possible to fetch audio file urls (stored on google cloud) of past years dj mixes. They can also be filtered by year.

