import React, { useContext, useState } from "react";
import axios from "axios";
import Alert from "../components/Alert";
import { authContext } from "../contexts/auth.context";
import { Navigate, useNavigate } from "react-router-dom";

let baseUrl = import.meta.env.VITE_API_URL + "/auth";

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    isAuthenticated,
    isLoggedIn,
    loading,
    signupOk,
    isPremium,
    signupDone,
  } = useContext(authContext);

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
        signupDone();
        //navigate("/");
      })
      .catch((err) => {
        setError("Could not finish the process, try again--------");
      });
  };

  if (!loading && isLoggedIn) return <Navigate to="/" />;

  return (
    <div>
      <h1 className="text-center text-white">Login</h1>
      {/* The following message will appear once the user successfully signs up to Popfilms. The signupOk variable is defined in the auth.context. */}
      <form onSubmit={submitHandler} className="w-75 mx-auto">
        {signupOk && (
          <Alert message="Thank you for signing up. You can now use your credentials to login to Popfilms." />
        )}
        {error != "" && <Alert message={error} />}
        <div className="mb-3 text-white">
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
        <div className="mb-3 text-white">
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
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <br></br>
      <div className="pop-login">
        <img src="/images/popfilmslogoNav.png" />
      </div>
      <br></br>
      <br></br>
    </div>
  );
}

export default LoginPage;
