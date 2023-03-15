const express = require("express");
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get('/api', (req, res) => {
  if (req.query.app) {
    fs.readFile(__dirname + "/apps/" + req.query.app + ".html", 'utf-8', (err, data) => {
      res.json({
        name: req.query.app,
        code: data
      });
    });

  }
});

app.use('/apps', express.static(path.join(__dirname, 'apps')));

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});