import React, { useState, useEffect, useContext } from "react";
import { authContext } from '../contexts/auth.context'
import {getUserInfo} from "../services/user.service";
import {deleteUser} from "../services/user.service";
import {updateUserInfo} from "../services/user.service";
import {updateImage} from "../services/user.service";

function UserProfilePage() {
  const [userInfo, setUserInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);


  const { user } = useContext(authContext); // get the user token so we can access it's ID, to fetch data
  const userId = user._id;

  useEffect(() => {
    getUserInfo(user._id) // The initial get to populate userInfo object has to be done with the user ID that is in the AUTH TOKEN, otherwise UserID is empty
      .then((response) => {
        const data = response.data; /// get the user's data
        console.log(data); // Log the data to see if we have correct data
        setUserInfo(data); // populate the userInfo Object with the user's data
        setCount((count) => count + 1); //set count for the looping to stop
      })
      .catch((error) => console.error(error));
    }, [])

  const handleEditProfile = () => {
    console.log('Edit profile button clicked');
    getUserInfo(userInfo._id) //retrive user info by Id
      .then((data) => {  //callback function will be executed
        console.log(data);
        setUserInfo(data); //update user info in the state
        setName(data?.name || "");  //update user name in the state
        setEmail(data?.email || ""); //update user email in the state
        setIsModalOpen(true);  //set the variable true so modal can open
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  };
  //the function captures the file selected by the user and updates it with the selected file by the user
  const handleUpdateAvatar = (event) => {
    console.log('Update avatar');
    const file = event.target.files[0];
    setAvatarFile(file);
  };

  //prints a message on the console 
  const handleSubmit = (event) => {
    console.log('Form submitted');
    event.preventDefault(); //prevents the page from reloading 

    // Update avatar if a new file is selected
    let updateAvatarPromise = Promise.resolve(); //ensure that variable is a promise
    if (avatarFile) {
      updateAvatarPromise = updateImage(userId, avatarFile)  //new file selected for avatar to be updateted in the server
        .then(() => {
          // update user info by id with avatar image
          return getUserInfo(userId);
        })
        .then((updatedUserInfo) => { //update user info after updating the avatar image
          setUserInfo(updatedUserInfo); //update state with user info 
        })
        .catch((error) => {
          console.error("Error updating user image:", error);
        });
    }

    // Update user info
    const updateUserInfoPromise = updateUserInfo(userInfo._id, { //update user info in the server (userName, name, email)
      userName,
      name,
      email,
    }).catch((error) => console.error(error));

    //update user avatar img and update user info before closing modal
    Promise.all([updateAvatarPromise, updateUserInfoPromise]) //array of promises that contains 2 promises (updateAvatarPromise, updateUserInfoPromise) return a new promise
      .then(() => {
        setIsModalOpen(false); //modal close if both promises are completed
      })
      .catch((error) => console.error(error));
  };

  //this function send request to the server to delete user profile by Id
  const handleDeleteProfile = () => {
    console.log('Delete profile button clicked');
    deleteUser(userInfo._id)
      .then(() => {  //deleting user data when button clicked
        // setUserInfo({});
        // setName("");
        // setEmail("");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-5">
    <h1>This is the Profile page for our users</h1>

    <div>
      <img src={userInfo.image} alt="Avatar" className="img-fluid" />
      <input type="file" onChange={handleUpdateAvatar} />
    </div>

    <div>
        <h4>User Name: {userInfo.userName}</h4>
        <h4>Name: {userInfo.name}</h4>
        <h4>Email: {userInfo.email}</h4>
      </div>

      <div>
        <button className="btn btn-primary" onClick={handleEditProfile}>
          Edit profile
        </button>
      </div>

      <div>
        <button className="btn btn-danger" onClick={handleDeleteProfile}>
          Delete profile
        </button>
      </div>
    </div>
  )
  
}

export default UserProfilePage;