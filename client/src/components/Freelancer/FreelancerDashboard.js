import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import { borderRadius, Container, height } from "@mui/system";
import Box from "@mui/material/Box";
import { AppBar, Select, Tab } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styles from "./FreelanceDashboard.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import styles2 from "./modal.module.css";

const FreelancerDashboard = () => {
  const params = useParams();
  const [recruits, setRecruits] = useState([]);
  const [service, setService] = useState([]);
  const [rerender, setRerender] = useState(1);

  let id = "";
  if (localStorage.length >= 1) {
    const user = localStorage.getItem("token");
    id = JSON.parse(atob(user.split(".")[1]))._id;
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/freelancer-dashboard/${id}`)
      .then((res) => {
        setRecruits(res.data);
        setService(res.data);
      });
  }, [rerender]);


  const [viewBy, setViewBy] = useState("All");
  const [toggleModal, setToggleModal] = useState(false);

  const activeBabysitterBookings = recruits?.filter(
    (recruit) => recruit.service === "Babysitter"
  );
  const activeLaundressBookings = recruits?.filter(
    (recruit) => recruit.service === "Laundress"
  );
  const activeCleanerBookings = recruits?.filter(
    (recruit) => recruit.service === "Cleaner"
  );

  const handleChange = (e) => {
    setViewBy(e.target.value);
    if (e.target.value === "All") {
      setService(recruits);
    }
    if (e.target.value === "Babysitter") {
      setService(activeBabysitterBookings);
    }
    if (e.target.value === "Laundress") {
      setService(activeLaundressBookings);
    }
    if (e.target.value === "Cleaner") {
      setService(activeCleanerBookings);
    }
  };

  const [idToDelete, setIdToDelete] = useState("");

  const handleFirstDeleteClick = (e) => {
    setIdToDelete(e.target.id);
    setToggleModal(true);
  };

  const handleSecondDeleteClick = () => {
    axios
      .delete(`http://localhost:8080/api/users/${idToDelete}`)
      .then(setRerender(rerender + 1));

    setToggleModal(false);
  };

  const handleAcceptClick = (e) => {
    setIdToDelete(e.target.id);
    console.log(id)
    // axios.put(`http://localhost:8080/api/users/${idToDelete}`,).then(setRerender(rerender + 1))
  }

  // console.log(recruits);
  return (
    <div>
      {/* <ul>
        {recruits.map((recruit) => (
          <>
            <li>
              Freelancer: {recruit.freelancerId.firstName}{" "}
              {recruit.freelancerId.firstName}
            </li>
            <li>Email: {recruit.freelancerId.email}</li>
            <li>Phone: {recruit.freelancerId.contact}</li>
            <li>Service: {recruit.service}</li>
            <li>Date: {recruit.date}</li>
            <li>Rating: {recruit.rating}</li>
            <li>Status: {recruit.status}</li>
            <br></br>
          </>
        ))}
      </ul> */}

      <div style={{ marginTop: "3em" }}>
        <Container>
          <div className={styles.dashboard}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Container>
                  <AppBar position="static">
                    <Toolbar>
                      <Typography variant="h6" component="div">
                        Freelancer Dashboard
                      </Typography>
                    </Toolbar>
                  </AppBar>
                </Container>
              </Grid>
              <Container>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      padding: "2em",
                      // flexDirection:"row",
                      // flexWrap: "wrap",
                      "& > :not(style)": {
                        m: 1,
                        width: "100%",
                        height: 300,
                      },
                    }}
                  >
                    <Paper elevation={8}>
                      <div className={styles.papers}>
                        <img src="https://cdn-icons-png.flaticon.com/512/4829/4829642.png"></img>
                        <div className={styles.text}>
                          <h4>Babysitting</h4>
                          <p>Total Active Booking/s:</p>
                          <h2>{activeBabysitterBookings.length}</h2>
                        </div>
                      </div>
                    </Paper>
                    <Paper elevation={8}>
                      <div className={styles.papers}>
                        <img src="https://cdn-icons-png.flaticon.com/512/7040/7040484.png"></img>
                        <div className={styles.text}>
                          <h4>Laundry</h4>
                          <p>Total Active Booking/s:</p>
                          <h2>{activeLaundressBookings.length}</h2>
                        </div>
                      </div>
                    </Paper>
                    <Paper elevation={8}>
                      <div className={styles.papers}>
                        <img src="https://cdn-icons-png.flaticon.com/512/2870/2870667.png"></img>
                        <div className={styles.text}>
                          <h4>Cleaning</h4>
                          <p>Total Active Booking/s:</p>
                          <h2>{activeCleanerBookings.length}</h2>
                        </div>
                      </div>
                    </Paper>
                  </Box>
                </Grid>
              </Container>

              <div className={styles.viewby}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    View Bookings
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={viewBy}
                    label="View Bookings"
                    onChange={handleChange}
                  >
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"Cleaner"}>Cleaner</MenuItem>
                    <MenuItem value={"Babysitter"}>Babysitter</MenuItem>
                    <MenuItem value={"Laundress"}>Laundress</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <Container>
                <Grid item xs={12}>
                  <TableContainer component={Paper} elevation={6}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <h3>Recruiter Name</h3>
                          </TableCell>
                          <TableCell align="left">
                            <h3>Service</h3>
                          </TableCell>
                          <TableCell align="left">
                            <h3>Date</h3>
                          </TableCell>
                          <TableCell align="left">
                            <h3>Contact No.</h3>
                          </TableCell>
                          <TableCell align="left">
                            <h3>Rate</h3>
                          </TableCell>
                          <TableCell align="left">
                            <h3>Status</h3>
                          </TableCell>
                          <TableCell align="left">
                            <h3>Action</h3>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      {recruits.length === 0 && (
                        <TableBody>
                          <TableCell align="center" colSpan={6}>
                            <strong> No Data Found</strong>
                          </TableCell>
                        </TableBody>
                      )}
                      <TableBody>
                        {service?.map((recruit) => (
                          <TableRow
                            key={recruit._id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            {service.length === 0 && (
                              <TableRow>
                                <TableCell align="center">
                                  No Bookings Found
                                </TableCell>
                              </TableRow>
                            )}
                            <TableCell component="th" scope="row" align="center">
                              {`${recruit.recruiterId?.firstName} ${recruit.recruiterId?.lastName}`}
                            </TableCell>
                            <TableCell align="center">
                              {recruit.service}
                            </TableCell>
                            <TableCell align="center">
                              {new Date(recruit.date).toDateString()}
                            </TableCell>
                            <TableCell align="center">
                              {recruit?.recruiterId?.contact}
                            </TableCell>
                            <TableCell align="center">
                              {recruit?.recruiterId?.ratings}
                            </TableCell>
                            <TableCell align="center">
                              {recruit.status}
                            </TableCell>
                            {recruit.status==="Pending"?
                            <TableCell align="center">
                            {}
                            <Button
                              variant="contained"
                              size="small"
                              color="success"
                              onClick={handleAcceptClick}
                              // startIcon={<DeleteIcon />}
                              id={recruit._id}
                            >
                              Accept
                            </Button>
                            <span> </span>
                            <Button
                              variant="outlined"
                              size="small"
                              color="error"
                              onClick={handleFirstDeleteClick}
                              // startIcon={<DeleteIcon />}
                              id={recruit._id}
                            >
                              Reject
                            </Button>
                          </TableCell>:
                          <TableCell align="center">
                            <Button
                              variant="outlined"
                              size="small"
                              color="error"
                              onClick={handleFirstDeleteClick}
                              // startIcon={<DeleteIcon />}
                              id={recruit._id}
                            >
                              Cancel
                            </Button>
                          </TableCell>
                            }
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Container>
            </Grid>
          </div>
        </Container>
      </div>
      {toggleModal ? (
        <div className={styles2.modal}>
          <div className={styles2.modalcontent}>
            <b>
              Are you sure you want to delete booking entry?
              <br></br>
              (this cant be undone)
            </b>

            <div className={styles2.modalbutton}>
              <button onClick={handleSecondDeleteClick}>Delete</button>
              <button onClick={() => setToggleModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default FreelancerDashboard;
