import React from "react";
import EmoryLogo from "../images/emory.png"
import { state } from "../storeData"
import { history } from "../index"



export default function Login() {
    // event handle when clicking submit button
    function handleSubmit (event) {
        for (var i = 0; i < sessionStorage.length; i++) {
            var key = sessionStorage.key(i)
            var value = sessionStorage.getItem(key)
            const password = value.split(",")[2].split(":")[1]
            const usertype = value.split(",")[0].split(":")[1]
            if (JSON.stringify("resident") == usertype && state.username === key && JSON.stringify(state.password) === password) {
                history.push("/resident_dashboard")
            } else if (JSON.stringify("admin") == usertype && state.username === key && JSON.stringify(state.password) === password) {
                history.push("/admin_dashboard")
            }
        }


    }

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
    
    return (
        <>

            <div className="login-container">

                <div className="form-container">

                    <h1>Resident Dashboard</h1>

                    <form action="">
                        <table>
                            <tr>
                                <td><label htmlFor="">Username:</label></td>
                                <td><input type="text" placeholder="Username" size="30" onChange={getUsername}/></td>
                            </tr>

                            <tr>
                                <td><label htmlFor="">Password:</label></td>
                                <td><input type="password" placeholder="Password" size="30" onChange={getPassword}/></td>
                            </tr>

                        </table>
                    </form>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                            Log in
                        </button>

                    <p>New User? Register Here: <a href="/sign-up">Sign Up</a></p>
                    <p><a href="url">Forget Password?</a></p>

                </div>

                <div className="image-container">
                    <img src={EmoryLogo} alt="logo" className="logo"/>
                </div>

            </div>
        </>

    )
}