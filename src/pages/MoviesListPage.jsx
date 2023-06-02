import { useEffect } from "react";
import { getTheater } from "../services/imdb.service";


function MoviesListPage() {
  useEffect(() => {
    getTheater()
    .then(resp => {
      console.log("que trae esooooo", resp.data.item);

  })
  .catch(err => console.log(err))
  }, [])


  return (
    <div>
    <h1>Movies List page all movies here! </h1>
    </div>
  )
}

export default MoviesListPage;