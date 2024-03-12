# DAT076-WebApp

Higher or Lower game for the failrate of courses studied at Chalmers University of Technology. Developed as a project in the course DAT076 Web applications at Chalmers.

# Final Report

The final report can be found in the root layer i.e. the top folder and is named "Webapp_Project_Report_group18.pdf"

# Structure

The application is divided into the two directories client, which contains the frontend, and server, which contains the backend. The client directory contains the folders public and src. Public contains the index.html file and src contains the rest of the frontend implementation. src contains the folders Error with files for error handling, Home with files for home screen functionality, Login with the login screen, Leaderboard, Play with singleplayer, multiplayer and general game funcitonality. Then the src folder contains the other frontend files such as host, join, app, index, currentuser etc.

The server directory consists of a model, a service and a router layer as well as the database implementation. The model layer contains the interfaces and classes used such as player, course, user etc. The service layer contains the files with the functions necessary for the backend logic that manages all data, database fetching etc. Then the router layer contains the files which defines the API for communication with the server.
