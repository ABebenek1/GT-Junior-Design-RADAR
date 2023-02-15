import React from "react";
import EmoryLogo from "../images/emory.png"

export default function Login() {
    return (
        <>

            <div className="login-container">

                <div className="form-container">

                    <h1>Resident Dashboard</h1>

                    <form action="">
                        <table>
                            <tr>
                                <td><label htmlFor="">Username:</label></td>
                                <td><input type="text" placeholder="Username" size="30"/></td>
                            </tr>

                            <tr>
                                <td><label htmlFor="">Password:</label></td>
                                <td><input type="password" placeholder="Password" size="30"/></td>
                            </tr>

                        </table>
                    </form>

                    <button>Log in</button>

                    <p>New User? Register Here: <a href="url">Sign Up</a></p>
                    <p><a href="url">Forget Password?</a></p>

                </div>

                <div className="image-container">
                    <img src={EmoryLogo} alt="logo" className="logo"/>
                </div>

            </div>
        </>

    )
}