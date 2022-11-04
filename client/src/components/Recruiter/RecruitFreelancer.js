import { Box, Button } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import RecruitFilter from "./RecruitFilter";
import RecruitHeader from "./RecruitHeader";
import RecruitMain from "./RecruitMain";

const RecruitFreelancer = () => {
  return (
    <div>
      <RecruitHeader/>
      <Container>
       
       <div className="recuiter-content">
        <RecruitFilter/>
        <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
        <RecruitMain/>
        </div>
       </div>
      </Container>
    </div>
  );
};

export default RecruitFreelancer;
