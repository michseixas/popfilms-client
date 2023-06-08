import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../contexts/auth.context";
import { getUserInfo } from "../services/user.service";
import { deleteUser } from "../services/user.service";
import EditUserInfo from "../components/EditUserInfoModal";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getLikedMovies } from "../services/imdb.service";



function UserProfilePage() {
  const [userInfo, setUserInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const [movieLike, setMovieLike] = useState([]);
  


  const { user } = useContext(authContext); // get the user token so we can access it's ID, to fetch data
  //const userId = user._id;
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo(user._id) // The initial get to populate userInfo object has to be done with the user Id that is in the AUTH TOKEN, otherwise UserId is empty
      .then((response) => {
        const data = response.data; /// get the user's data
        console.log(data); // Log the data to see if we have correct data
        setUserInfo(data); // populate the userInfo Object with the user's data
        setCount((count) => count + 1); //set count for the looping to stop

        return getLikedMovies(data.likedMovies);
      })
      .then((resp) => {
        console.log("response de promiseall", resp);
        setMovieLike(
          resp.map((element) => {
            return element.data;
          })
        );
      })
      .catch((error) => console.error(error));
  }, []);


  


 
  // useEffect(() => {
  //  console.log("esto es movilike",movieLike)

  // }, [movieLike]);
  //the function captures the file selected by the user and updates it with the selected file by the user
  const handleUpdateAvatar = (event) => {
    console.log("Update avatar");
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Generate a temporary URL for the selected image
      setUserInfo((prevUserInfo) => ({ ...prevUserInfo, imageUrl })); // Update the imageUrl in the userInfo state
    }
    setAvatarFile(file);
  };

  

  //this function send request to the server to delete user profile by Id
  const handleDeleteProfile = () => {
    console.log("Delete profile button clicked");
    deleteUser(user._id)
      .then(() => {
        navigate("/logout");
      })
      .catch((error) => console.error(error));
  };

  if (!deleteUser && deleted) return <Navigate to="/" />;

  return (
    <div className="container mt-5">
      <div>
        <img src={userInfo.imageUrl} alt="Avatar" className="img-fluid" />
        <input
          type="file"
          className="btn btn-outline-dark"
          onChange={handleUpdateAvatar}
          accept="image/*"
        />
      </div>

      <EditUserInfo userId={user._id} />

      <h1>Liked Movies</h1>
      {movieLike.map((movie) => (
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

      <div>
        <button
          type="submit"
          className="btn btn-danger"
          onClick={handleDeleteProfile}
        >
          Delete profile
        </button>
      </div>
    </div>
  );
}

export default UserProfilePage;
