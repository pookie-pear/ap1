// server.js

const express = require('express');
const path = require('path');
const app = express();
const port = 8102;

// Serve static files (HTML, GLTF, JS, etc.) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",(err,res)=>
{
    res.sendFile("./Untitled-1.html")
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
