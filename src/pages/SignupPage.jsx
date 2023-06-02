import React, { useContext, useState } from "react";
import Alert from "../components/Alert";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { authContext } from "../contexts/auth.context";
import { signup } from "../services/auth.service";

let baseUrl = "http://localhost:5005/auth";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { isLoggedIn, loading } = useContext(authContext);

  const submitHandler = (e) => {
    e.preventDefault();

    

    if (username == "" || email== "" || password == "" || passwordRepeat == "") {
      console.log("error: fields missing");
      setError("error: fields missing");
      return;
    }
    if (password != passwordRepeat) {
      console.log("passwords should match");
      setError("error: passwords should match");
      return;
    }

    const user = { username, email, password };

    // axios
    //   .post(baseUrl + "/signup", user)
    signup({ username, email, password })
      .then((resp) => {
        console.log(resp);
        navigate("/login");
      })
      .catch((err) => setError("Could not finish the process, try again"));
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
          <input
            type="password"
            className="form-control"
            id="passwordrepeat"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
