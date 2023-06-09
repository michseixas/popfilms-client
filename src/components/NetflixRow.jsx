import React, { Component , useEffect, useState } from "react";
import Slider from "react-slick";
import { getMoviesByType } from "../services/imdb.service";
import { Navigate, useParams, Link } from "react-router-dom";

function NetflixRow(props) {
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6
      };
      const listId = props.listId;
      const [movies, setMovies] = useState([]);


      useEffect(() => {
        getMoviesByType(listId) // from imdb.service
          .then((resp) => {
            console.log("response from service", resp)
            if(resp.data.items) {
              setMovies(resp.data.items);
              console.log(resp.data.items);
              setLoading(false);
            } else if(resp.data.results) {
              setMovies(resp.data.results);
              console.log(resp.data.results);
              setLoading(false);
            }
          })
          .catch((err) => console.log(err));
      }, [])
    

      return (
        <div>
        <br/>
          <h3> {props.title} </h3>
          <Slider {...settings}>
            {movies.map((movie) => (
            <div className="col-5 p-3" key={movie.id}>
              <div className="card">
                <div className="card-body">
                  <div className="imageDisplayed responsive-image">
                  <Link to={`/movies/${movie.id}`}>
                    <img src={movie.image} loading="lazy" alt={movie.title} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </Slider>
        </div>
      );
    }
  

  export default NetflixRow;