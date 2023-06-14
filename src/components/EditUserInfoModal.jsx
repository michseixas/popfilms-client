import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { getUserInfo } from "../services/user.service";
import { authContext } from "../contexts/auth.context";

let baseUrl = import.meta.env.VITE_API_URL + "/user";

function EditUserInfo({ userId }) {
  console.log(userId);
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(0);
  const [updateInfo, setUpdateInfo] = useState(false);
  const navigate = useNavigate();
  const { isPremium , setIsPremium } = useContext(authContext);

  const handleClose = () => setShow(false);

  useEffect(() => {
    getUserInfo(userId) // The initial get to populate userInfo object has to be done with the user Id that is in the AUTH TOKEN, otherwise UserId is empty
      .then((response) => {
        const data = response.data; /// get the user's data
        console.log(data); // Log the data to see if we have correct data
        setUserInfo(data); // populate the userInfo Object with the user's data
        setUserName(data.username || ""); //update user's username in the state
        setFirstName(data.firstName || ""); //update user's FirstName in the state
        setLastName(data.lastName || ""); //update user's lastName in the state
        setCountry(data.country || ""); //update user's country in the state
        setCity(data.city || ""); //update user's city in the state
        setEmail(data.email || ""); //update user's email in the state
        setCount((count) => count + 1); //set count for the looping to stop
        setIsPremium(data.isPremium); //update user's role in the state
      })
      .catch((error) => console.error(error));
  }, [updateInfo]);

  const handleShow = () => {
    setShow(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .put(baseUrl + "/" + userId + "/update", {
        username,
        firstName,
        lastName,
        city,
        country,
        email,
        isPremium: Boolean(isPremium),
      }) //update user info, replaced the :userId placeholder for the actual userId
      .then((response) => {
        const updatedUser = response.data; // server returns the updated user info
        console.log(updatedUser);
        setIsPremium(response.data.isPremium);
        handleClose(); //close modal (process complete)
        navigate("/profile");
        // window.location.reload(); //reload the page to display the updated info
        setUpdateInfo(!updateInfo);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div>
        <div className="mb-3">
          <label htmlFor="usernameInput" className="form-label">
            User Name: {userInfo.username}
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="firstNameInput" className="form-label">
            First Name: {userInfo.firstName}
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="lastNameInput" className="form-label">
            Last Name: {userInfo.lastName}
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="isPremiumInput" className="form-label">
            Premium user: {userInfo.isPremium ? "yes" : "no"}
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email: {userInfo.email}
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="countryInput" className="form-label">
            Country: {userInfo.country}
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="cityInput" className="form-label">
            City: {userInfo.city}
          </label>
        </div>
      </div>

      <Button variant="primary" onClick={handleShow}>
        Edit Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter User Name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPremium">
              {/* <Form.Label>Premium</Form.Label>
            <Form.Check // prettier-ignore
                type="checkbox"
                id="isPremium"
                checked={isPremium} 
                label="Check for Premium Access"
                onChange={(e) => setIsPremium(e.target.checked)}
              /> */}
              </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditUserInfo;
