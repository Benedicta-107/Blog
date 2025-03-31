import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));// to access public files.

let posts = [];

app.get("/", (req, res) => {
  res.render("index.ejs", {posts,});//gets the file and renders it on the browser
});

app.get("/new", (req, res) => {
    res.render("new.ejs", {posts,});//gets the file and renders it on the browser
  });




// to post OR RENDER the new.ejs
app.post("/new", (req, res) => {
    let { title, content } = req.body;
    //to convert plain text lists into HTML lists
    if (content.includes("\n")){
        const items = content.split("\n").map(item => `<li>${item.trim()}</li>`).join("");
        content = `<ul>${items}</ul>`; // Convert text into an HTML list
    }
    posts.push({ title, content });
    res.redirect('/');
});

//to update post
app.post('/update', (req, res) => {
    const { index, title, content } = req.body; // Get index, title, and content
    posts[index] = { title, content }; // Update the post
    res.redirect('/'); // Redirect back
});

// to delete post
app.post("/delete", (req, res) => {
    const { index } = req.body;//Get the index from the request body
    posts.splice(index, 1);//Remove the post at this index
    res.redirect("/");
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });  


  