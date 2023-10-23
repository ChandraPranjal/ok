const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

app.post('/recommendMovies', (req, res) => {
  const movie1 = req.body.movie1;
  const movie2 = req.body.movie2;
  console.log(movie1 , movie2);

  // Replace the Python script path with your actual Python script path
  const pythonScriptPath = '/home/pc/Desktop/Begining/webdev/HackOn/Final/Backend/LLM/python_script.py';

  // Construct the Python command to run the script with the user's input
  const command = `python ${pythonScriptPath} ${movie1} ${movie2}`;

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
