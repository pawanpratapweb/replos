const express = require("express");
const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static("public"));

// Define routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
