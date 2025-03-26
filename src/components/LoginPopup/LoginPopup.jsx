import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login");
    const [userType, setUserType] = useState("Client"); // "Client" or "Admin"
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async (e) => {
    e.preventDefault();
    const endpoint = currState === "Login" ? "/login" : "/signup";

    try {
        const response = await fetch(`http://localhost:4000/api${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, userType }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(`Successfully ${currState === "Login" ? "logged in" : "signed up"} as ${userType}`);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userType", userType); // Store userType in localStorage

            window.location.href = userType === "Admin" ? "/admin-dashboard" : "/";
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert("Something went wrong.");
    }
};


    const onForgotPasswordHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/api/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Something went wrong.");
        }
    };

    return (
        <div className="login-popup">
            <form className="login-popup-container" onSubmit={onSubmitHandler}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>

                <div className="login-popup-role">
                    <label>Select Role:</label>
                    <select onChange={(e) => setUserType(e.target.value)}>
                        <option value="Client">Patient</option>
                        <option value="Admin">Doctor</option>
                    </select>
                </div>

                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <input name='name' type="text" placeholder='Your name' onChange={onChangeHandler} required />
                    )}
                    <input name="email" type="email" placeholder='Your email' onChange={onChangeHandler} required />
                    <input name="password" type="password" placeholder='Password' onChange={onChangeHandler} required />
                </div>

                <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>

                {currState === "Login" ? (
                    <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                )}

                {currState === "Login" && (
                    <p onClick={() => setShowForgotPassword(true)} style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>Forgot Password?</p>
                )}
            </form>

            {showForgotPassword && (
                <div className="forgot-password-popup">
                    <form className="forgot-password-container" onSubmit={onForgotPasswordHandler}>
                        <div className="forgot-password-title">
                            <h2>Forgot Password</h2>
                            <img onClick={() => setShowForgotPassword(false)} src={assets.cross_icon} alt="" />
                        </div>

                        <div className="forgot-password-inputs">
                            <input name="email" type="email" placeholder='Your email' onChange={onChangeHandler} required />
                        </div>

                        <button type="submit">Send Reset Link</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default LoginPopup;