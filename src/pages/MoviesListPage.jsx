import React, { useEffect, useState } from "react";
import { getTheater } from "../services/imdb.service";

function MoviesListPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTheater()
      .then((resp) => {
        setMovies(resp.data.items);
        console.log(resp.data.items)
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Movies List page - All movies here!</h1>

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
            <div className="col-4 p-1" key={movie.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">{movie.description}</p>
                  <div className = "imageDisplayed"> <img src={movie.image} alt={movie.title} /></div>
                  {}
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
