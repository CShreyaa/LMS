import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
const Home =()=>{
    const image = require ("../images/cartoon-kids-studying-in-library-vector-27851909.jpg")
    return(
        <div className="Home-Page bg-white text-dark container-fluid d-flex justify-content-center align-items-center">
            <div className="row container ">
                <div className="col-lg-6 d-flex justify-content-center align-items-start flex-column" style={{height:"91.5vh"}}>
                    <h3 style={{fontSize:"80px"}}>LIBRARY MANAGMENT SYSTEM</h3>
                    <p className="mb-0" style={{color:"gray"}}>Checkout The Books From Here.</p>
                    <Link to="/books" className="viewBook my-3 ">View Books</Link>
                </div>
                <div className="col-lg-6 d-flex justify-content-center align-items-end flex-column" style={{height:"91.5vh"}}>
                    <img className="img-fluid homeimg" src={image} alt="/"/>
                </div>
            </div>
        </div>
    );
};
export default Home;
<img className="img-fluid homeimg" src="https://appinventiv.com/wp-content/uploads/sites/1/2017/09/8-Reasons-Developing-Native-Mobile-Apps-is-Worth.png" alt="/" height="390px" />
