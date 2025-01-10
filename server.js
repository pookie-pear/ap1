const express = require('express');
const app = express();

app.use(express.static("./public"));

// Serve the main HTML file
app.get("/", function(req, res){
  res.redirect("./Untitled-1.html");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
