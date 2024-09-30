import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import "../components/mix.css";

const Login = () => {
    const [inpval, setInpval] = useState({
        email: "",
        password: ""
    });

    const history = useNavigate();

    const setVal = (e) => {
        const { name, value } = e.target;
        setInpval(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const loginuser = async (e) => {
        e.preventDefault();

        const { email, password } = inpval;

        if (!email || !password) {
            alert("Please enter your email and password");
            return;
        }

        try {
            const response = await fetch("http://localhost:1000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (data.error) {
                alert(data.error);
            } else {
                localStorage.setItem("usersdatatoken", data.result.token);
                localStorage.setItem("userEmail", data.result.user.email); // Store user's email
                history("/books"); // Redirect to books page upon successful login
                setInpval({ email: "", password: "" });
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please try again later.");
        }
    };

    return (
        <>
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h3>Login Page</h3>
                    </div>
                    <form>
                        <div className='form_input text-left'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' value={inpval.email} onChange={setVal} name='email' id='email' placeholder='Enter your email address' />
                        </div>
                        <div className='form_input text-left'>
                            <label htmlFor='password'>Password</label>
                            <div className='two'>
                                <input type='password' value={inpval.password} onChange={setVal} name='password' id='password' placeholder='Enter your password' />
                            </div>
                        </div>
                        <button className='btnn' onClick={loginuser}>Login</button>
                        <p>Don't have an Account? <NavLink to="/register">Sign Up</NavLink> </p>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Login;
