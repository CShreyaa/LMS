import React, { useState } from 'react';
import { NavLink} from "react-router-dom";
import "../components/mix.css";

const Register = () => {
    const [inpval, setInpval] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    });

    const setVal = (e) => {
        const { name, value } = e.target;
        setInpval(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const addUserdata = async (e) => {
        e.preventDefault();

        const { fname, email, password, cpassword } = inpval;

        if (!fname || !email || !password || !cpassword) {
            alert("Please fill all fields");
            return;
        } else if (password !== cpassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:1000/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fname, email, password, cpassword })
            });

            const data = await response.json();
            if (data.error) {
                alert(data.error);
            } else {
                alert("User registered successfully");
                setInpval({ fname: "", email: "", password: "", cpassword: "" });
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed. Please try again later.");
        }
    };

    return (
        <>
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h3>Sign Up</h3>
                    </div>
                    <form>
                        <div className='form_input text-left'>
                            <label htmlFor='fname'>Name</label>
                            <input type='text' onChange={setVal} value={inpval.fname} name='fname' id='fname' placeholder='Enter your name' />
                        </div>
                        <div className='form_input text-left'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' onChange={setVal} value={inpval.email} name='email' id='email' placeholder='Enter your email address' />
                        </div>
                        <div className='form_input text-left'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' onChange={setVal} value={inpval.password} name='password' id='password' placeholder='Enter your password' />
                        </div>
                        <div className='form_input text-left'>
                            <label htmlFor='cpassword'>Confirm Password</label>
                            <input type='password' onChange={setVal} value={inpval.cpassword} name='cpassword' id='cpassword' placeholder='Confirm your password' />
                        </div>
                        <button className='btnn' onClick={addUserdata}>Sign Up</button>
                        <p>Already have an account? <NavLink to="/login">Log In</NavLink></p>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Register;
