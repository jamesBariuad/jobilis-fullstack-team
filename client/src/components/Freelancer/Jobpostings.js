import { Container } from "@mui/system";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import Switch from '@mui/material/Switch';
import axios from "axios";
import styles2 from "./modal.module.css"

const Jobpostings = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:8080/api/users/'+ localStorage.userEmail)
    .then(res =>{
      setBabySitter(res.data.services.babysitter.active)
      setLaundress(res.data.services.laundress.active)
      setCleaner(res.data.services.cleaner.active)
  }, [])})

  const toggleForm = () => {
    setOpenForm(true)
  };

  const [babySitter, setBabySitter] = React.useState(false);
  const [laundress, setLaundress] = React.useState(false);
  const [cleaner, setCleaner] = React.useState(false);

  const [openForm, setOpenForm] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState("");
  
  const [description, setDescription] = React.useState("");
  const [labor, setLabor] = React.useState(0);
  const [location, setLocation] = React.useState("");

  const handleSubmit = (e) =>{
      e.preventDefault();
      const userData = {
        description: description,
        location: location,
        labor: labor
      }
    if(selectedService === "Babysitter"){
      axios.put('http://localhost:8080/api/users/babysitter-input/'+ localStorage.userEmail, userData )
			  .then(res =>{console.log(res.data)})
        setOpenForm(false)
        alert("Details Updated Successfully!")
       
    }
    if(selectedService === "Laundress"){
      axios.put('http://localhost:8080/api/users/laundress-input/'+ localStorage.userEmail, userData )
      .then(res =>{console.log(res.data)})
      setOpenForm(false)
      alert("Details Updated Successfully!")
    }
    if(selectedService === "Cleaner"){
      axios.put('http://localhost:8080/api/users/cleaner-input/'+ localStorage.userEmail, userData )
			  .then(res =>{console.log(res.data)})
        setOpenForm(false)
        alert("Details Updated Successfully!")
    }
  } 
 
  return (
    <div className="flex SubmitJobPostContainer" style={{marginTop:"5em"}}>
      <Container className="container">
        <h1>Activate a service that you want to offer...</h1>
        <div className="flex card-container">
          <div className="card flex-column ">
            <h3>Babysitter</h3>
            <img  src={require("../../assets/images/babysitter.png") }  />
            <Switch
              checked={babySitter}
              onChange={()=>{ 
                setBabySitter(!babySitter)
                axios.put('http://localhost:8080/api/users/activate-babysitter/'+ localStorage.userEmail, {active: !babySitter} )
			          .then(res =>{console.log(res.data)})
              }}
              inputProps={{ 'aria-label': 'controlled' }}
            /> {babySitter === true ? "Activated" : "Deactivated"}
            <Button
              variant="contained"
              disableElevation
              name="Babysitters"
              onClick={()=> {
                toggleForm()
                setSelectedService("Babysitter")
              }}
            >
              Edit Details
            </Button>
          </div>
          <div className="card flex-column ">
            <h3>Laundress</h3>
            <img src={require("../../assets/images/laundress.png")} />
            <Switch
              checked={laundress}
              onChange={()=>{ 
                setLaundress(!laundress)
                axios.put('http://localhost:8080/api/users/activate-laundress/'+ localStorage.userEmail, {active: !laundress} )
			          .then(res =>{console.log(res.data)})
               }}
              inputProps={{ 'aria-label': 'controlled' }}
            />{laundress === true ? "Activated" : "Deactivated"}
            <Button
              name="Laundresses"
              variant="contained"
              disableElevation
              onClick={()=> {
                toggleForm()
                setSelectedService("Laundress")
              }}
            >
              Edit Details
            </Button>
          </div>
          <div className="card flex-column">
            <h3>Cleaner</h3>
            <img src={require("../../assets/images/broom.png")} />
            <Switch
              checked={cleaner}
              onChange={()=>{
                setCleaner(!cleaner)
                axios.put('http://localhost:8080/api/users/activate-cleaner/'+ localStorage.userEmail, {active: !cleaner} )
			          .then(res =>{console.log(res.data)})
               }}
              inputProps={{ 'aria-label': 'controlled' }}
            />{cleaner === true ? "Activated" : "Deactivated"}
            <Button
              name="Cleaners"
              variant="contained"
              disableElevation
              onClick={()=> {
                toggleForm()
                setSelectedService("Cleaner")
              }}
            >
              Edit Details
            </Button>
          </div>
        </div>
        <div >
          {openForm ? 

          (<div className={styles2.modal}>
            <div className={styles2.modalcontent}><h2>Input details for {selectedService} service:</h2><form>
              <label>Description:</label><br />
              <textarea onChange={(e)=> setDescription(e.target.value)} rows="10" cols="50" placeholder="Write a Concise Job Description.">
              </textarea><br />
              <label>Labor fee:</label>
              <input
                onChange={(e)=> setLabor(e.target.value)}
                type="number" /><br />
              <label>Location:</label>
              <select onChange={(e)=> setLocation(e.target.value)}>
                <option> --- Select City--- </option>
                <option> Manila </option>
                <option> Muntinlupa </option>
                <option> Taguig </option>
              </select><br/>
              <div className={styles2.modalbutton}>
              <button onClick={handleSubmit}>Submit</button>
              <button onClick={()=> setOpenForm(false)}>Cancel</button>
              </div>
            </form></div>
          </div>) : ("")}
        </div>
      </Container>
    </div>
  );
};

export default Jobpostings;
