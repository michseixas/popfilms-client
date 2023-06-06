import React from 'react';
import { likeMovie } from '../services/user.service';
import axios from "axios";
import { useParams, Link } from 'react-router-dom';

function MovieDetailsPage() {
  let {movieId} = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    axios.get(baseUrl + `/Top250Movies/k_xmndj5an/${movieId}`)
    .then(({data})=>{
        setMovie(data);
        setTimeout(()=>{
            setLoading(false);
        }, 1000);
    })
    .catch(err => console.log(err))
}, []);
  
return (
  <div>
      <Navbar />
      <h1>Movie Detail</h1>

      {loading && <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
          </div>}

      {!loading && <div className="card">
          <img src={movie.image} className="card-img-top" alt={movie.title} />
          <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text"> {movie.plot}</p>
              <p>Created at: {movie.createdAt}</p>
          </div>
      </div>}
      <div><Link to="/apartments">Go back</Link></div>
  </div>
)
  


//Like Movie
  const handleLikeMovie = () => {
    // Call the likeMovie function
    likeMovie()
      .then(response => {
        // Handle the successful response
        console.log('Movie liked successfully.');
      })
      .catch(error => {
        // Handle the error
        console.log('Error liking the movie:', error);
      });
  };

  return (
    <div>
      <h1>Movies detail page!!!!</h1>
      <button onClick={() => handleLikeMovie()}>Like</button>
    </div>
  );
}


export default MovieDetailsPage;

