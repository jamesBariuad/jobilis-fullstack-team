import React from "react";
import { Link } from "react-router-dom";
import styles from "../../homepage.module.css";
import style2 from "./navbar.module.css";
const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("user");
    alert("Log out success!");
    window.location.assign("/");
  };

  let id = ""
  if (localStorage.length>=1){
    const token = localStorage.getItem("token")
   id = JSON.parse(atob(token.split(".")[1]))._id
   
  }
 

  
  return (
    
    <>
      <nav className={styles.navbar}>
        <img src={require("../../assets/images/jobilis logo.png")}></img>
        <div className={styles.navLinks}>
          <p>
            <Link to="/"> Home</Link>
          </p>
          {localStorage.length >= 1 ? (
            <>
              <div className={style2.dropdown}>
                <p className={style2.dropbtn}>Dashboards</p>
                <div className={style2.dropdowncontent}>
                  <a href={`/recruiter-dashboard/${id}`}>
                    <p>Recruiter</p>
                  </a>
                  <br></br>
                  <a href={`/freelancer-dashboard/${id}`}>
                    <p>Freelancer</p>
                  </a>
                </div>
              </div>
              <div className={style2.dropdown}>
                <p className={style2.dropbtn}>Services</p>
                <div className={style2.dropdowncontent}>
                  <a href="/freelancer/job-postings">
                    <p>Offer Services</p>
                  </a>
                  <br></br>
                  <a href="/select-freelancer">
                    <p>Find Services</p>
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              <p>
                {/* <a href="#About Us">About Us</a> */}
                <a href="/#About">About Us</a>
              </p>
              <p>
                <a href="/#Contact">Contact Us</a>
              </p>
            </>
          )}
        </div>
        <div className={styles.navbarbuttons}>
          {localStorage.length >= 1 ? (
            <>
              <Link to="/profile">
                <button>My Account</button>
              </Link>
              <button className="white_btn" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button>LOG IN</button>
              </Link>
              <Link to="/signup">
                <button>SIGN UP</button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
