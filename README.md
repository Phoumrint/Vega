# Overview
Simple web application project for creating and displaying vehicles.

This web application consists of four projects:
- Vega.Data project is a database project that uses Entity Framework to manage data in the database.
- Vega.API project is ASP.Net Core web api project that provides RESTful API for creating and retrieving vehicles.
- Vega.Web.Angular is a web client application using Angular for creating vehicles and displaying vehicles.
- Vega.Web.React is a similar web client application using React.

# Cloning projects
Cloning Vega from Github repo: https://github.com/Phoumrint/Vega.git
From Visual Studio Code
- Use "Git: Clone" command from Command Palette.
- Specify Github repo url: https://github.com/Phoumrint/Vega.git
- Specify parent directory for local repo.
- The local repo is stored in Vega folder under the parent folder.

# Pre-requisite
SQL Server must be installed in order to run the web application.

# Building and running projects
Open Vega folder from VS Code
From Integrated Terminal, change directory to Vega.API
Enter "dotnet restore"
Update SQL Server name under DefaultConnection in Vega.API\appsetings.json file
Run the server with command "dotnet run"
Add a new integrated terminal
From the second terminal, change directory to Vega.Web.Angular or Vega.Web.React
Enter "npm install"
Enter "npm start"
Open a web browser and navigate to "http://localhost:4200"
