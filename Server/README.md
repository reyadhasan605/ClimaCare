# Server for chatgpt API calling

This is a node js server for calling chatgpt using API. Before started you have to have a valid api key of chatgpt. You can find the api key in [link](https://platform.openai.com/docs/api-reference)

# Start the server
To start the server, run
```
node server.js
```
It will start the server in the localhost 8000 port by default. You can change the port number in the code line 50.

# Code description
If someone hit the submit button from the react application, then the request of the body part will contain the user prompt. After getting the userprompt, it will pass to the chatgpt using line 36-40. Response message will pass as a json in line 43. One can also increase the token size to get the larger response.
