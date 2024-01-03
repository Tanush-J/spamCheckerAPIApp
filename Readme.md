Before starting the app it is assumed you have MySQL installed and running on your local machine (you can check services in machine to see if mysql is running).

Also you need to node.js installed in your machine.

To start the app:
1. Run "npm install" command in your terminal.
2. Go to the .env.example file and fill out the variables, I have left some comments to help you and don't change the values which are already filled and at the end change the file name to .env from .env.example.
3. next go to terminal and run "node seed.js" this will create and fill the database with random tables and entries.
4. next run "node index.js" this will start the app.

List of endpoints:
POST REQUEST- 
1. /register - payload in body = {"name": "example","phoneNumber": "7588794481","email": "example@example.com","password": "password1"}
2. /login - payload in body = {"phoneNumber": "7588794481","password": "password1"}
3. /markspam - payload in body = {"phoneNumber": "7588794481","reporterId": "1"}

GET REQUEST- 
4. /search/name - payload in query param - eg. localhost:3000/search/name?query=Tanush Jangid
5. /search/phone - payload in query param - eg. localhost:3000/search/phone?phoneNumber=1234567890
6. /userInfo - payload in query param - eg. localhost:3000/userInfo?phoneNumber=3376543210 (here depending on if searcher in contact list or not you see email in response)


Some assumptions I have made and changes I could have made are:
1. I am not hashing the password right now when saving it to database. I would have used something like bcrypt to hash.
2. I have added reporterId to spamData model, it doesn't have any perticular use case but to just track who is the user (even if not a register user) that reported that number.
3. In the id field in users model right now it's autoincrementing, but I would have used jwt as id.
4. when a user registers and he is already in the database as imported contact then I am destorying all those entry and adding this new entry. This is something I think can cause some problem regarding losing some of the tracking if user is in contact list of searcher. So I will comment that distroy line.