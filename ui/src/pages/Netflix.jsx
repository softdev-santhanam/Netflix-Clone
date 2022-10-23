/* import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";


import Slider from "../components/Slider";
function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(getGenres());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
    // eslint-disable-next-line
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button
              onClick={() => navigate("/player")}
              className="flex j-center a-center"
            >
              <FaPlay />
              Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
export default Netflix;
 */

import axios from '../helpers/axios';
import requests from '../helpers/requests';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import Slider from "../components/Slider";

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Navbar from "../components/Navbar";

const Banner = () => {

  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(getGenres());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
    // eslint-disable-next-line
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };


    const [movie, setMovie] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        const request = await axios.get(requests.fetchNetflixOriginals);
        // console.log(request);

        setMovie(
            request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ]
        );
        
        return requests;
      };

      fetchData();
    }, []);
    
    // console.log(movie);

    // I am using the bellow function to controll the size of the banner description
    // Here i am passing the string and how much value i want in description
    function truncate(string, n) {
        return string?.length > n ? string.substring(0,n - 1) + "..." : string;
    }

  return (
    <Container 
      
        className='banner'
        style={{
            // Adding optional chaining because in usestate initially we have empty array so we can't acces 
            // the backdrop_path
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`,
            bacgroundSize: 'cover',
            backgroundPosition: "center center",
        }}
    >
      <Navbar isScrolled={isScrolled} />
        <div className='banner-contents'>
            <h1 className='banner-title'>
                {movie?.title || movie.name ||movie?.original_name}
            </h1>
            <div className='banner-butttons'>
                <button 
                onClick={() => navigate("/player")}
                className='banner-button'>
                  Play
                </button>
                <Link to="/MyList">
                <button className='banner-button'>My List</button>
                </Link>
            </div>
            <h1 className='banner-description'>
                {truncate(movie?.overview, 150)}
            </h1>
        </div>
        <div className='banner-fadeBottom' />
        <div className="slider">
        <Slider movies={movies} className="slider"></Slider>
        </div>
    </Container>
  );
};

const Container = styled.div`
 .banner {
    background-repeat: no-repeat;
    height: 448px;
    position: relative;
    object-fit: contain;
    color: white;
 }

 .banner-contents {
    margin-top: -30px;
    margin-left: 30px;
    padding-top: 80px;
    height: 190px;
 }

 .banner-title {
  margin-top: 40px;
    font-size: 3rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
 }

 .banner-description {
    width: 45rem;
    line-height: 1.3;
    padding-top: 1rem;
    font-size: 0.8rem;
    max-width: 360px;
    height: 80px;
 }

 .banner-button {
    cursor: pointer;
    color: white;
    outline: none;
    border: none;
    font-weight: 700;
    border-radius: 0.2vw;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin-right: 1rem;
    background-color: rgba(51, 51, 51, 0.5);
 }

 .banner-button:hover {
    color: #000;
    background-color: #e6e6e6;
    transition: all 0.2s;
 }

 .banner-fadeBottom {
    height: 7.4rem;
    background-image: linear-gradient(
        180deg,
        transparent,
        rgba(37, 37, 37, 0.67),
        #111
    )
 } 
 .slider {
  background-color: #111;
 }

@media screen and (min-device-width: 0px) and (max-device-width: 720px) { 
  .banner-contents {
    margin-top: 5px;
    margin-left: 30px;
    padding-top: 80px;
    height: 190px;
 }
  .banner-title {
    margin-top: 40px;
    font-size: 1rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
 }
}
`;
export default Banner;