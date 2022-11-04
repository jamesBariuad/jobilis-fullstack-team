import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { Container } from "@mui/system";
import { useLocation, useNavigate } from "react-router";
const RecruitHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectCategory = () => {
    navigate({ pathname: "/select-freelancer" });
  };
  return (
   <Container>
     <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "2em",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        backgroundColor: "#61B1E9",
        zIndex: "10",
      }}
    >
      <h1>
        {location.state.freelancer} in {location.state.city}
      </h1>
      <Button variant="contained" disableElevation onClick={selectCategory}>
        Change
      </Button>
    </Box>
   </Container>
  );
};

export default RecruitHeader;
