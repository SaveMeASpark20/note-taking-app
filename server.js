//Load env variables
require("dotenv").config();


//Import dependencies
const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const connectToDb = require("./config/connectToDb")
const noteController = require("./controller/notesController");
const usersController = require("./controller/usersController");
const requireAuth = require("./middleware/requireAuth")


//Create an express app
const app = express();

//configure 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
    }
));
 
//Connect to database
connectToDb()

//routing
app.post("/signup", usersController.signup)
app.post("/login", usersController.login)
app.get("/logout", usersController.logout)
app.get("/check-auth", requireAuth, usersController.checkAuth)

app.get("/notes", requireAuth, noteController.fetchNotes)
app.get("/notes/:id", requireAuth, noteController.fetchNote)
app.post("/notes", requireAuth, noteController.createNote)
app.put("/notes/:id", requireAuth, noteController.updateNote)
app.delete("/notes/:id", requireAuth, noteController.deleteNote)

//start our server
app.listen(process.env.PORT, () => {console.log("Connected to Port")} )
