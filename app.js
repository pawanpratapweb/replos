const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const port = 3000;


const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// Serve static files from the public directory
app.use(express.static("public"));

// Define routes
app.get("/aiapi", async (req, res) => {
  async function createCompletion(prompt) {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 27,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response.data.choices;
  }

  createCompletion(req.query.prompt).then((response) => {
    res.send(response);
  }).catch((error) => {
    console.log(error);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});