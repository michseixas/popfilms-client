//This SignupPage was the first step Signup implemented in our project but is not being used anymore, since whe decided to use SignupModal for login.
//We keep this code for study purposes. 

import React, { useContext, useState } from "react";
import Alert from "../components/Alert";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { authContext } from "../contexts/auth.context";
import { signup } from "../services/auth.service";


function SignupPage() {
  let baseUrl = import.meta.env.VITE_API_URL + "/auth";
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);

  const navigate = useNavigate();

  const { isLoggedIn, loading, signupIsOk } = useContext(authContext);
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    setLoadingImage (true);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);
    // setImageUrl('uploading')
    axios.post(baseUrl + '/upload', uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.data.fileUrl);
        setLoadingImage(false);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (loadingImage) return;
    if (username == "" || email== "" || password == "" || passwordRepeat == "") {
      console.log("error: fields missing");
      setError("Some fields are missing");
      return;
    }
    if (password != passwordRepeat) {
      console.log("passwords should match");
      setError("Passwords should match");
      return;
    }

    const user = { username, email, password, imageUrl };

    // axios
    //   .post(baseUrl + "/signup", user)
    signup(user)
      .then((resp) => {
        console.log(resp);
        signupIsOk();//We call this function from the auth.context to set the signup ok to true so the login page can show the confirmation alert.
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      });
  };

  if (!loading && isLoggedIn) return <Navigate to="/" />;

  return (
    <div>
      <h1 className="text-center">Signup</h1>
      <form onSubmit={submitHandler} className="w-75 mx-auto">
        {error != "" && <Alert message={error} />}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordrepeat" className="form-label">
            Repeat password
          </label>
          {/* //cloudinary start*/}
          <label>Image:</label>
          {loadingImage && <p>Loading image...</p>}
        <input type="file" onChange={(e) => handleFileUpload(e)} />
          {/* //cloudinary end*/}
          <input
            type="password"
            className="form-control"
            id="passwordrepeat"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled= {loadingImage}>
          Signup
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
