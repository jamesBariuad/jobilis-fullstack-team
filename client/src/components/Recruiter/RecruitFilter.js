import React from "react";
import Divider from "@mui/material/Divider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Rating from "@mui/material/Rating";
const RecruitFilter = () => {
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        elevation={0}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Stack direction="row" spacing={1}>
            <FilterAltIcon />
            <h3>Filter</h3>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" spacing={4} >
            <h4>Price</h4>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox  />}
                label="₱ 500 below"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="₱ 600 - ₱ 800"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="₱800 and above"
              />
            </FormGroup>
            <Divider orientation="vertical" flexItem />
            <h4>Ratings</h4>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox  />}
                label={ <Rating name="read-only" value={5} readOnly />}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={ <Rating name="read-only" value={4} readOnly />}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={<Rating name="read-only" value={3} readOnly />}
              />
               <FormControlLabel
                control={<Checkbox />}
                label={<Rating name="read-only" value={2} readOnly />}
              />
               <FormControlLabel
                control={<Checkbox />}
                label={<Rating name="read-only" value={1} readOnly />}
              />
            </FormGroup>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Divider />
    </div>
  );
};

export default RecruitFilter;
