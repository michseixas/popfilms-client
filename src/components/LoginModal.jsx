import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useContext, useState } from "react";
import Alert from "../components/Alert";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { authContext } from "../contexts/auth.context";
import { signup } from "../services/auth.service";

let baseUrl = import.meta.env.VITE_API_URL + "/auth";

function LoginModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { isAuthenticated, isLoggedIn, loading, signupOk } =
    useContext(authContext);

  const submitHandler = (e) => {
    e.preventDefault();

    if (username == "" || password == "") {
      console.log("error: fields missing");
      setError("error: fields missing");
      return;
    }
    axios
      .post(baseUrl + "/login", { username, password })
      .then(({ data }) => {
        let jwt = data.authToken;
        localStorage.setItem("authToken", jwt);
        isAuthenticated();
        //navigate("/");
      })
      .catch((err) => {
        setError("Could not finish the process, try again--------");
      });
  };

  if (!loading && isLoggedIn) return <Navigate to="/" />;

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Login
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h1 className="text-center">Login</h1>
            {/* The following message will appear once the user successfully signs up to Popfilms. The signupOk variable is defined in the auth.context. */}
            <form onSubmit={submitHandler} className="w-75 mx-auto">
              {signupOk && (
                <Alert message="Thank you for signing up. You can now use your credentials to login to Popfilms." />
              )}
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
              <Button type="submit" variant="dark" className="btn btn-primary" onClick={handleClose}>
                Login
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

export default LoginModal;
