import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile/UserProfile";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Jobpostings from "./components/Freelancer/Jobpostings";
import SelectFreelancer from "./components/Recruiter/SelectFreelancer";
import RecruitFreelancer from "./components/Recruiter/RecruitFreelancer";
import RecruiterDashboard from "./components/Recruiter/RecruiterDashboard";
import FreelancerDashboard from "./components/Freelancer/FreelancerDashboard";

function App() {
  const user = localStorage.getItem("token");
  let id = ""
  if (localStorage.length>=1){
    const user = localStorage.getItem("token")
   id = JSON.parse(atob(user.split(".")[1]))._id
   
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Homepage />} />
        {user && (
            <>
            <Route path="/profile" element={<UserProfile />} />

            <Route
              path="/freelancer/job-postings"
              exact
              element={<Jobpostings />}
            />

            <Route path="/select-freelancer" element={<SelectFreelancer />} />
            <Route path="/recruit-freelancer" element={<RecruitFreelancer />} />
            <Route
              exact path={`/recruiter-dashboard/${id}`}
              element={<RecruiterDashboard />}
            />
            <Route
              exact path={`/freelancer-dashboard/${id}`}
              element={<FreelancerDashboard />}
            />
          </>
        )}
        {/* <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/freelancer" element={<Navigate replace to="/login" />} />
        <Route path="/recruiter" element={<Navigate replace to="/login" />} />
        <Route path="/profile" element={<Navigate replace to="/login" />} /> */}

        {/* <Route path="/home" element={<Homepage/>} /> */}
        {/* <Route path="freelancer" element={<Freelancer />} />
        <Route path="recruiter" element={<Recruiter />} />
        <Route path="/profile" exact element={<UserProfile />} /> */}
        {/* <Route path="/freelancer/previous-bookings" exact element={<FreelancerPrevBook />} />
        <Route path="/freelancer/edit-details" exact element={<EditDetails />} /> */}
      </Routes>
    </>
  );
}
//sample comment - Gecka
export default App;
