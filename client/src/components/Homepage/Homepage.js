import { MDBCardImage } from "mdb-react-ui-kit";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./homepage.module.css";

const Homepage = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    

      <div className={styles.wholepage}>
        <div className={styles.home}>
          <div className={styles.text}>
            <h2>Lorem ipsum!</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              quis nisl est. Praesent convallis, sapien vel vestibulum
              elementum, lacus risus imperdiet nisl, id facilisis erat ipsum eu
              dui. Duis sit amet nibh et tellus pretium varius. Nulla
              ullamcorper enim quis orci luctus, vel feugiat velit porttitor. Ut
              pharetra euismod ante, a feugiat mauris blandit eu. Curabitur in
              quam turpis. Donec id aliquam metus. Duis feugiat purus orci, et
              molestie turpis varius vel. Aenean ut nisi ultrices, congue dui
              nec, facilisis est. Suspendisse eu tempus massa, vel pretium
              ligula.
            </p>
            <br></br>
            <a href="/#Services">
              <button className={styles.findhelpinghand}>Find a helping hand</button>
            </a>
          </div>
          <img
            className={styles.homeimage}
            src="https://cdn-icons-png.flaticon.com/512/2640/2640788.png"
          ></img>
        </div>
        <div className={styles.servicescontainer} id="Services">
          <h2>What can we help you with?</h2>
          <br />
          <br />
          <div className={styles.categycontainer} >
            <div className={styles.category}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/4829/4829642.png"
                className={styles.categoryimage}
              ></img>
              <h4>Babysitter</h4>
              <p>This is a description</p>
              <button>LEARN MORE</button>
            </div>
            <div className={styles.category}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/7040/7040484.png"
                className={styles.categoryimage}
              />
              <h4>Laundress</h4>
              <p>This is a description</p>
              <button>LEARN MORE</button>
            </div>
            <div className={styles.category}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2870/2870667.png"
                className={styles.categoryimage}
              />
              <h4>House Cleaner</h4>
              <p>This is a description</p>
              <button>LEARN MORE</button>
            </div>
          </div>
        </div>
        <div className={styles.aboutuscontainer} id="About">
          <h2>About Us</h2>
          <br></br>
          <br></br>
          <div className={styles.developerscontainer}>
            <div className={styles.dev}>
              <div className={styles.devimage}>image</div>
              <h4>Gecka</h4>
              <p>This is a description</p>
            </div>
            <div className={styles.dev}>
              <div className={styles.devimage}>image</div>
              <h4>Debbie</h4>
              <p>This is a description</p>
            </div>
            <div className={styles.dev}>
              <div className={styles.devimage}>image</div>
              <h4>JC</h4>
              <p>This is a description</p>
            </div>
            <div className={styles.dev}>
              <div className={styles.devimage}>image</div>
              <h4>Aldrick</h4>
              <p>This is a description</p>
            </div>
            <div className={styles.dev}>
              <div className={styles.devimage}>image</div>
              <h4>James</h4>
              <p>This is a description</p>
            </div>
          </div>
        </div>
        <div className={styles.contactcontainer} id="Contact">
          <div>
            <br></br>
            <h2 className={styles.contacttext}>Contact Us</h2>
            <p className={styles.contacttext}>Have any suggestions?</p>
          </div>
          <br></br>
          <br></br>
          <div className={styles.inputfields}>
            <input placeholder="Name"></input>
            <input placeholder="Email" type="email"></input>
            <input placeholder="Subject"></input>
            <textarea
              placeholder="Message"
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <br></br>
          <button>Submit</button>
          <br />
        </div>
        <a href="#">Back to Top</a>
        <br></br>
        © Copyright JoBilis 2022
        <br></br>
        <br></br>
      </div>
    
  );
};

export default Homepage;
