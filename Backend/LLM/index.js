const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const axios = require('axios'); // Import Axios for making API requests

const app = express();
app.use(bodyParser.json());

app.post('/recommendMovies', (req, res) => {
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
    
    console.log("Recommendation received" , recommendations);
    // Call the Rapid API for each recommended movie ID and collect the responses
    const rapidApiOptions = {
      method: 'GET',
      url: 'https://mdblist.p.rapidapi.com/',
      headers: {
        'X-RapidAPI-Key': '7d68801094msh194b333ba34d4c7p10434cjsnce3648dceb62',
        'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
      }
    };

    const responses = [];

    // Use async/await to make the API requests and collect the responses
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function fetchRecommendations() {
      for (const movieId of recommendations) {
        console.log("Movie id" , Number(movieId) );
        rapidApiOptions.params = { tm: Number(movieId) };
        try {
          const response = await axios.request(rapidApiOptions);
          console.log(response.data);
          responses.push(response.data);
        } catch (error) {
          console.error(`Error calling Rapid API: ${error}`);
        }
        // Add a delay between requests (e.g., 2 seconds)
        await delay(2000);
      }
      // Send the responses back as a JSON array
      res.json(responses);
    }

    fetchRecommendations();
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
