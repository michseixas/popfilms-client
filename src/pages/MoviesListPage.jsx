import { getMoviesByType } from "../services/imdb.service";
import { Navigate, useParams, Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { filterContext } from "../contexts/filter.context";


function MoviesListPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]); 
  const { text } =
  useContext(filterContext);
  let { listId } = useParams();

  useEffect(() => {
    filterMovies(text)
  }, [text]);

  useEffect(() => {
    getMoviesByType(listId) // from imdb.service
      .then((resp) => {
        console.log("response from service", resp)
        if(resp.data.items) {
          setMovies(resp.data.items);
          console.log(resp.data.items);
          //setFilteredMovies brings all the movies to the array filteredMovies that is later used to filter the movies
          //this helps to show all the movies when there are no filters applied.
          setFilteredMovies(resp.data.items);  
          setLoading(false);
        } else if(resp.data.results) {
          setMovies(resp.data.results);
          console.log(resp.data.results);
          //setFilteredMovies brings all the movies to the array filteredMovies that is later used to filter the movies
          //this helps to show all the movies when there are no filters applied.
          setFilteredMovies(resp.data.results);  
          setLoading(false);
        }
       
      })
      .catch((err) => console.log(err));
  }, [])

  // filter a list of movies based on a text input and update the filtered movies state or variable.
  const filterMovies = (text) => {
    if (text === "") {
      setFilteredMovies(movies); // Set filteredMovies to the complete array of movies
    } else {
      setFilteredMovies(
        movies.filter((movie) =>
          movie.title.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };


  useEffect(() => {
   console.log("Movies filtered", filteredMovies)
  }, [filteredMovies]);

  let title = "";
  if (listId === "top250") title = "Top 250 Movies of all times";
  else if (listId === "mostpopular") title = "Most Popular Movies";
  else if (listId === "theater") title = "New Movies in Theaters Now";
  else if (listId === "comingsoon") title = "Coming soon";
  else if (listId === "drama") title = "Drama";
  else if (listId === "comedy") title = "Comedy";
  else if (listId === "action") title = "Action";
  else if (listId === "romance") title = "Romance";
  else if (listId === "animation") title = "Animation";
  else if (listId === "biography") title = "Biography";
  else if (listId === "adventure") title = "Adventure";
  else if (listId === "family") title = "Family";

  return (
    <div className="bg-black text-white">
      <h1>{title}</h1>
      {loading ? (
        <div className="w-100 text-center mt-5 mb-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <div className="row w-75 mx-auto mt-5">
        {/* // while you don't filter anything, filteredMovies equals the complete array of movies unfiltered. */}
          {filteredMovies.map((movie) => (
            <div className="col-3 p-1" key={movie.id}>
              <div className="card">
                <div className="card-body">
                  {/* <h5 className="card-title">{movie.title}</h5> */}
                  <p className="card-text">{movie.description}</p>
                  <p className="card-text">{movie.genres}</p>
                  <div className="imageDisplayed responsive-image">
                  <Link to={`/movies/${movie.id}`}>
                    <img src={movie.image} loading="lazy" alt={movie.title} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MoviesListPage;