import { Button, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import Rating from "@mui/material/Rating";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const RecruitMain = () => {
  useEffect(() => {
    axios.get('http://localhost:8080/api/users/')
    .then(res =>{
      if(userData.length === 0){
      setUserData(res.data)
      }
    }, [])})

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [userData, setUserData] = React.useState([]);
  const [date, setDate] = React.useState(new Date());

  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);
  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClick = (message) => () => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

// YUNG FILTER DITO IS FOR ACTIVE BABYSITTERS PALANG
// DI KO KASI MAKUHA YUNG LOCATION SAKA YUNG SERVICE DUN SA RECRUIT FILTER
// YUNG PRICE RANGE SAKA RATINGS DIN
// YUNG CHECKBOX DI KO DIN ALAM KUNG PAANO ISA LANG PWEDE PILIIN
 const freelancer = userData.filter(e=>e.services.babysitter.active === true && e.email !== localStorage.userEmail)



  const handleExited = () => {
    setMessageInfo(undefined);
  };
  return (
    <>
    {freelancer.map((e)=>
    <div style={{width:"45%",margin:"1em"}} >
      <div className="flex freelancer-card">
      <div className="freelancer-image">
          <img src={require("../../assets/images/sampleavatar.png")} />
        </div>
        <div className="freelancer-info">        
            <h3>{e.firstName}{" "}{e.lastName}</h3>
            <p>{e.services.babysitter.description}</p>
            <div className="flex freelancer-contact">
              <div className="flex freelancer-phone">
                <CallIcon />
                <p>{e.contact}</p>
              </div>
              </div>
              <Rating name="read-only" value={e.services.babysitter.rating} readOnly />
        </div>
        <div className="flex freelancer-right">
              <h3>₱ {e.services.babysitter.labor}</h3>
              <div>
                <label>Select preferred date:</label>
              <DatePicker
              selected={date}
              onChange={(e)=> setDate(e)}
              minDate={new Date()}
            />
              </div>
              <Button className="freelancer-bookbutton"
                variant="contained"
                onClick={handleClick(
                  "Successfully Booked. Kindly wait for the babysitter to accept the booking. Thank you!"
                )}
                disableElevation
              >
                Book Now
              </Button>
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                key={messageInfo ? messageInfo.key : undefined}
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                TransitionProps={{ onExited: handleExited }}
                action={<React.Fragment>
                  <Button color="secondary" size="small" onClick={handleClose}>
                    UNDO
                  </Button>
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    sx={{ p: 0.5 }}
                    onClick={handleClose}
                  >
                    <CloseIcon />
                  </IconButton>
                </React.Fragment>}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  {messageInfo ? messageInfo.message : undefined}
                </Alert>
              </Snackbar>
          </div>
      </div>
      
    </div>
    
         )}
  
    </>
  );
};

export default RecruitMain;
