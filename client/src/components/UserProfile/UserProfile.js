import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
import axios from 'axios';


export default function UserProfile() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [contact, setContact] = useState("")
  const [email, setEmail] = useState("")
			useEffect(() => {
			  axios.get('http://localhost:8080/api/users/'+ localStorage.userEmail)
			  .then(res =>{
          console.log(res.data)
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setContact(res.data.contact);
          setEmail(res.data.email)});
			}, [])
     

  return (
    <div className="vh-100" style={{ backgroundColor: '#eee', height: "100vh" }}>
      <MDBContainer className="container py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="12" xl="4">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="text-center">
                <div className="mt-3 mb-4">
                  <MDBCardImage src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                    className="rounded-circle" fluid style={{ width: '100px' }} />
                </div>
                <MDBTypography tag="h4">{firstName}{" "}{lastName}</MDBTypography>
                <MDBCardText className="text-muted mb-4">
                  Contact: {contact}
                </MDBCardText>
                <MDBCardText className="text-muted mb-4">
                  Email: {email}
                </MDBCardText>
                <div>
                  My Dashboards: <br/>
                  <button><Link to = "/freelancer-dashboard/:id">As a Freelancer</Link></button>
                  <button><Link to = "/recruiter-dashboard/:id">As a Recruiter</Link></button>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}