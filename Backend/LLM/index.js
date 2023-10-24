const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.json());



app.post('/recommendMovies', (req, res) => {
  console.log("Api called");
  const movie1 = Number(req.body.movie1);
  const movie2 = Number(req.body.movie2);
  const languages = req.body.languages; // Get the list of selected languages

  // Replace the Python script path with your actual Python script path
  const pythonScriptPath = '/home/pc/Desktop/Begining/webdev/HackOn/Final/Backend/LLM/python_script.py';

  // Construct the Python command to run the script with the user's input and languages
  const command = `python ${pythonScriptPath} ${movie1} ${movie2} ${languages.join(' ')}`; // Pass the languages as space-separated values

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error}`);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Assuming the Python script prints the recommendations to stdout
    const recommendations = stdout.trim().split('\n');

    // Send the recommendations back as a JSON response
    res.json({ recommendations });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});