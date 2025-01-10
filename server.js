// server.js

const express = require('express');
const path = require('path');
const app = express();
// Serve static files (HTML, GLTF, JS, etc.) from the "public" folder
app.use(express.static('public'));

app.get("/",(err,res)=>
{
    res.sendFile("./Untitled-1.html")
})

// Start the server
const port = process.env.PORT || 3000;  // Use Render's PORT environment variable
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
