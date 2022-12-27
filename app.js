const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose")



const homeStartingContent = "Aliquam a viverra libero eleifend tellus sed, molestie arcu. Donec ut laoreet magna, non pretium ligula.";

const aboutContent = " Ut ac mauris dapibus, eleifend tellus sed, molestie arcu. Donec ut laoreet magna, non pretium ligula. Aenean turpis est, pretium ut neque id, vestibulum feugiat massa. Sed bibendum tortor ultricies justo malesuada, et feugiat sapien facilisis.";

const contactContent = "Nam congue justo quam, et aliquet mauris lobortis a. Suspendisse vitae nisi efficitur, sollicitudin lacus sed, aliquet elit.";


const app = express();




app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://1Valizevbigiedavid:valisawesomer@cluster0.ayjbz.mongodb.net/?retryWrites=true", {useNewUrlParser: true});



const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
    Post.find({}, function(err, posts){

        res.render("Home", {
            homeStartingContent: homeStartingContent,
             posts: posts
            });

    });
    
});

app.get("/about", function (req, res) {
    res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function (req, res) {
    res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function (req, res) {
    res.render("compose");
});



app.post("/compose", function(req, res) {
     const post = new Post ({
         title : req.body.postTitle,
         content : req.body.newPost
     });

     post.save(function(err){
        if(!err){
            res.redirect("/");
        }
     });

    //  posts.push(post);

});

app.get("/posts/:postId", function(req, res) {
    const requestedPostId= req.params.postId;
    // const requestedTitle = _.lowerCase(req.params.postName);

    Post.findOne({_id:requestedPostId}, function(err, post){

        res.render("post", {
            title:post.title,
            content:post.content
        });

    });

    // posts.forEach(function(post) {
    //     const storedTitle = _.lowerCase(post.title);


    //     if (storedTitle === requestedTitle) {
            
    //     }
    // });
});






let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
    console.log("Server's running on port");
});