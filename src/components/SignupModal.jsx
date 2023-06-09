import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useContext, useState } from "react";
import Alert from "../components/Alert";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { authContext } from "../contexts/auth.context";
import { signup } from "../services/auth.service";
// require('dotenv').config();



let baseUrl = import.meta.env.VITE_API_URL + "/auth";


function SignupModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, loading, signupIsOk } = useContext(authContext);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [premiumCode, setPremiumCode] = useState("");

  const handleFileUpload = (e) => {
    setLoadingAvatar(true);


    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);
    axios.post(baseUrl + '/upload', uploadData)
      .then(response => {
        console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.data.fileUrl);
        setLoadingAvatar(false);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  const submitHandler = (e) => {
    e.preventDefault();


    if (username == "" || email== "" || password == "" || passwordRepeat == "") {

      setError("Some fields are missing");
      return;
    }
    if (password != passwordRepeat) {
      setError("Passwords should match");
      return;
    }

    
    const user = { username, email, password, imageUrl, premiumCode};


    if (!loadingAvatar) {
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
    } else {
      console.log("Please upload an image");
    }

  };

  if (!loading && isLoggedIn) return <Navigate to="/" />;


  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Signup
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
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
                <input
                  type="password"
                  className="form-control"
                  id="passwordrepeat"
                  value={passwordRepeat}
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                />
              </div>

              {/* //checks for premium code*/}
              <div className="mb-3">
                <label htmlFor="premiumCode" className="form-label">
                  Premium Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="premiumCode"
                  value={premiumCode}
                  onChange={(e) => setPremiumCode(e.target.value)}
                />
              </div>
              {/* //checks if Premium end*/}

              {/* //cloudinary start*/}
              <div className="mb-3">
                <label htmlFor="imageUrl" className="form-label">
                  Upload image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="imageUrl"
                  // value={imageUrl}
                  onChange={(e) => handleFileUpload(e)}
                />
                {loadingAvatar && <p>Image is loading.....</p>}
              </div>
              {/* //cloudinary end */}

              <Button
                type="submit"
                className="btn btn-primary"
                variant="dark"
                onClick={handleClose}
                disabled={loadingAvatar}
              >
                Signup
              </Button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignupModal;