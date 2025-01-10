const express = require('express');
const app = express();



// Serve the main HTML file
app.get("/", function(req, res){
  res.send("igga");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
