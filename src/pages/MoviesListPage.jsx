import React, { useEffect, useState } from "react";
import { getMoviesByType } from "../services/imdb.service";
import { Navigate, useParams, Link } from "react-router-dom";

function MoviesListPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  let { listId } = useParams();
  console.log("que trajo listId", listId);

  useEffect(() => {
    getMoviesByType(listId)
      .then((resp) => {
        setMovies(resp.data.items);
        console.log(resp.data.items);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  let title = "";
  if (listId === "top250") title = "Top 250 Movies of all times";
  else if (listId === "mostpopular") title = "Most Popular Movies";
  else if (listId === "theater") title = "New Movies in Theaters Now";
  else if (listId === "comingsoon") title = "Coming soon";

  return (
    <div>
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
          {movies.map((movie) => (
            <div className="col-3 p-1" key={movie.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">{movie.description}</p>
                  <div className="imageDisplayed responsive-image">
                  <Link to={`/movies/${movie.id}`}>
                    <img src={movie.image} alt={movie.title} />
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
