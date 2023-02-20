import React, { Component, useState } from "react";
import { state, storedData } from "../storeData";

export default function SignUp() {
  const [userType, setUserType] = useState("");

  //  set username field for state object
  const getUsername = (event) => {

    state.username = event.target.value;

    console.log("Username:", state.username)
  }

  //  set passowrd field for state object
  const getPassword = (event) => {

    state.password = event.target.value;

    console.log("Password:", state.password)
  }

  //  set first name field for state object

  const getFirstName = (event) => {

    state.firstName = event.target.value;

    console.log("First Name:", state.firstName)
  }

  //  set last name field for state object

  const getLastName = (event) => {

    state.lastName = event.target.value;

    console.log("Last Name:", state.lastName)
  }
  
  // event handle when clicking submit button
  function handleSubmit (event) {
    
    event.preventDefault();
    
    var radios = document.getElementsByName("UserType")

    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked && i == 0) {
        state.userType = "resident"
      } else if (radios[i].checked && i == 1) {
        state.userType = "admin"
      }
    }

    console.log("un:", state.usernanme);

    storedData[state.username] = state;
    
    sessionStorage.setItem(state.username, JSON.stringify(state))

    console.log(storedData);    
  }



  return (
    <form onSubmit={handleSubmit}>

      <h3>Sign Up</h3>

      <div>
        Register As
        <input
          type="radio"
          name="UserType"
          value="Resident"
          checked="checked"
        />
        Resident
        <input
          type="radio"
          name="UserType"
          value="Admin"
        />
        Admin
      </div> 

      {userType == "Admin" ? (
        <div className="mb-3">
          <label>Secret Key</label>
          <input
            type="text"
            className="form-control"
            placeholder="Secret Key"
            name="key"
            // onChange={ getValue }
          />
        </div>
      ) : null}

      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          name="firstName"
          onChange={getFirstName}
        />
      </div>

      <div className="mb-3">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          name="lastName"
          onChange={getLastName}
        />
      </div>

      <div className="mb-3">
        <label>Username</label>
        <input
          type="username"
          className="form-control"
          placeholder="Enter username"
          name="username"
          onChange={getUsername}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name="password"
          onChange={getPassword}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/sign-in">sign in?</a>
      </p>
    </form>
  );
}

