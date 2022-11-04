import { Container } from "@mui/system";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import "./SelectFreelancer.css";

const SelectFreelancer = () => {
  const navigate = useNavigate();
  const cities = [
    {
      value: "Manila",
      label: "Manila",
    },
    {
      value: "Muntinlupa",
      label: "Muntinlupa",
    },
    {
      value: "Taguig",
      label: "Taguig",
    },
  ];
  const [city, setCity] = React.useState("Manila");
  const [freelancer, setFreelancer] = useState("");
  const handleChange = (event) => {
    setCity(event.target.value);
  };
  const findFreelancer = (e) => {
    const state = {
      city:city,
      freelancer:e.target.name
    }
     navigate({
      pathname: "/recruit-freelancer",
      
    },{state:state});
  };


  return (
    <div className="flex categorySelectionContainer" style={{ height:"90vh"}}>
      <Container className="container">
        <Box sx={{ display: "flex", gap: "8px"}}>
          <LocationOnIcon className="location-icon" />
          <TextField
            sx={{ marginBottom: "30px" }}
            fullWidth
            id="outlined-select-currency"
            select
            label="Search a city"
            icon={<LocationOnIcon />}
            value={city}
            onChange={handleChange}
            variant="standard"
            // helperText="Please select a city"
          >
            {cities.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <h1>What are you looking for?</h1>
        <div className="flex card-container">
          <div className="card flex-column ">
            <h3>Babysitter</h3>
            <img src={require("../../assets/images/babysitter.png")} />
            <h3>
              Want to spend a night out with your spouse or friends? We'll help
              you find reliable babysitters in your neighbourhood.
            </h3>
            <Button
              variant="contained"
              disableElevation
              name="Babysitters"
              onClick={findFreelancer}
            >
              Find a babysitter
            </Button>
          </div>
          <div className="card flex-column ">
            <h3>Laundress</h3>
            <img src={require("../../assets/images/laundress.png")} />
            <h3>
              Don't have time to walk your dog? Nobody home to feed your cats?
              We've got you covered!r dog? Nobody home to feed your cats? We've
              got you covered!
            </h3>
            <Button
              name="Laundresses"
              variant="contained"
              disableElevation
              onClick={findFreelancer}
            >
              Find a laundress
            </Button>
          </div>
          <div className="card flex-column">
            <h3>Cleaner</h3>
            <img src={require("../../assets/images/broom.png")} />
            <h3>
              Who doesn't like to come home to a clean house? We'll help you
              find a good cleaner.
            </h3>
            <Button
              name="Cleaners"
              variant="contained"
              disableElevation
              onClick={findFreelancer}
            >
              find a cleaner
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SelectFreelancer;
