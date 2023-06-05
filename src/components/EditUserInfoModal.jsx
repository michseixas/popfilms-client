import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { getUserInfo } from "../services/user.service";

let baseUrl = "http://localhost:5005/user";

function EditUserInfo({ userId }) {
  console.log(userId);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [userInfo, setUserInfo] = useState({});
  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    getUserInfo(userId) // The initial get to populate userInfo object has to be done with the user Id that is in the AUTH TOKEN, otherwise UserId is empty
      .then((response) => {
        const data = response.data; /// get the user's data
        console.log(data); // Log the data to see if we have correct data
        setUserInfo(data); // populate the userInfo Object with the user's data
        setUserName(data.username || ""); //update user's username in the state
        setName(data.name || ""); //update user's name in the state
        setEmail(data.email || ""); //update user's email in the state
        setCount((count) => count + 1); //set count for the looping to stop
      })
      .catch((error) => console.error(error));
  }, []);

  const handleShow = () => {
    setShow(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post(baseUrl + "/" + userId + "/update", { username, name, email }) //update user info, replaced the :userId placeholder for the actual userId
      .then((response) => {
        const updatedUser = response.data; // server returns the updated user info
        console.log(updatedUser);
        handleClose(); //close modal (process complete)
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
          <label htmlFor="nameInput" className="form-label">
            Name: {userInfo.name}
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email: {userInfo.email}
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
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
