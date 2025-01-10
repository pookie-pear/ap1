const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Catch 404 errors for static files
app.get("/",(err,res)=>
{
    res.sendFile("./Untitled-1.html")
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
