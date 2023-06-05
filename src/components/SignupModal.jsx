import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useContext, useState } from "react";
import Alert from "../components/Alert";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { authContext } from "../contexts/auth.context";
import { signup } from "../services/auth.service";

function SignupModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, loading, signupIsOk } = useContext(authContext);

  const submitHandler = (e) => {
    e.preventDefault();


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

    const user = { username, email, password };

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
    <>
      <Button variant="primary" onClick={handleShow}>
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
            <button type="submit" className="btn btn-primary" onClick={handleClose}>
            Signup
            </button>
        </form>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignupModal;