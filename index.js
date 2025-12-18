const express = require("express");
const app = express();
const uuid = require("uuid"); //uuid object
const uuidv4 = uuid.v4; //uuidv4 will take the v4 function of uuid 
const port = 3000;
const path = require("path");
const methodOverride = require("method-override"); //very useful used in overriding the post or get request with patch or delete request

app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method")); //It lets your app pretend a POST request is actually PATCH or DELETE

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : uuidv4(),
        username : "apna Collage",
        content : "I love coding!"
    },
    {
        id : uuidv4(),
        username : "Praveen",
        content : "Studying rest"
    },
    {
        id : uuidv4(),
        username : "Roshni",
        content : "Studying rest"
    }
];

app.get("/posts", (req,res) => {  //show all the post or a kind of home page
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req,res) => {  //serve the form
    res.render("new.ejs");
});

app.post("/posts", (req, res) => { //creating new post
    let {username, content} = req.body;
    let id = uuidv4(); //this will generate a unique id for post everytime
    posts.push({id, username, content});
    res.redirect("/posts"); //redirecting to original page
});

app.get("/posts/:id", (req, res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});

app.get("/posts/:id/edit", (req, res) => { //route to serve the form to update content
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

app.patch("/posts/:id", (req,res) =>{ //route to update content
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) =>{
    let {id} = req.params;
    posts = posts.filter(post => post.id !== id); //deleting the element with id 
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});