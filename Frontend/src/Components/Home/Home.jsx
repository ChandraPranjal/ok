import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = "7e5122f42b3d47b2f9c1deaf4e1d2214";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";
const recommended = "recommendations"; // Add a new constant for recommended movies

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>

    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);


const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]); // Add state for recommended movies
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
      setUpcomingMovies(results);
    };
    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
      setNowPlayingMovies(results);
    };
    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
      setPopularMovies(results);
    };
    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
      setTopRatedMovies(results);
    };

    const getAllGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setGenre(genres);
      console.log(genres);
    };

    getAllGenre();

    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();

    async function fetchRecommended() {
      try {
        // Define the request data
        const requestData = {
          movie1: 354912,
          movie2: 497698,
          languages: ["ja", "en"],
          adult: 1
        };

        // Make a POST request to the recommended movies endpoint
        const response = await axios.post("http://localhost:8000/recommendMovies", requestData);
        console.log(response.data);
        // Update the state with recommended movies data
        setRecommendedMovies(response.data.recommendations);
      } catch (error) {
        console.error("Error fetching recommended movies:", error);
      }
    }

    // Call the fetchRecommended function when the component is mounted
    fetchRecommended();

  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
            : "rgb(16, 16, 16)",
        }}
      >
        {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

        <div>
          <button>
            <BiPlay /> Play
          </button>
          <button>
            My List <AiOutlinePlus />
          </button>
        </div>
      </div>
      <div className="row">
        <h2>Recommended Movies</h2>
        <div className="card-container">
          {recommendedMovies.map((item, index) => (
            <Card key={index} img={item.poster_url} />
          ))}
        </div>
      </div>
      <Row title={"Upcoming"} arr={upcomingMovies} />
      {/* <Row title={"Now Playing"} arr={nowPlayingMovies} /> */}
      {/* <Row title={"Popular"} arr={popularMovies} /> */}
      {/* <Row title={"Top Rated"} arr={topRatedMovies} /> */}



    </section>
  );
};

export default Home;
