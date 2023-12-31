import React, { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import Modal from "@mui/material/Modal";
// @mui material components
// import Grid from "@mui/material/Grid";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Tooltip from "@mui/material/Tooltip";
// import Icon from "@mui/material/Icon";
// import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
// import MDBadgeDot from "components/MDBadgeDot";
import MDButton from "components/MDButton";
// import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../components/DashboardNavbar/index";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
import { Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";

const buttonStyles = {
  backgroundColor: "#007BFF",
  color: "white",
  padding: "10px 15px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
};

// const initialFormData = {
//   name: "",
//   email: "",
//   phone: "",
//   keywords: "",
//   education: "",
//   experienceLevel: "",
//   skills: "",
//   industryExperience: "",
//   accomplishment: "",
//   jobTenure: "",
//   jobTitles: "",
//   salaryLevel: "",
//   companyNames: "",
//   referrals: "",
//   availability: "",
//   relevanceOfRole: "",
//   culturalFit: "",
//   keywordsInCoverletter: "",
//   remoteWork: false,
//   qualifications: "",
//   location: "",
//   applicantSources: "",
//   jobHopping: false,
// };

const From = () => {
  const getUser = useSelector((state) => state.user);
  const [missingDetails, setMissingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    keywords: [],
    education: "",
    experienceLevel: "",
    skills: [],
    industryExperience: "",
    accomplishment: "",
    jobTenure: "",
    jobTitles: "",
    salaryLevel: "",
    companyNames: "",
    referrals: "",
    availability: "",
    relevanceOfRole: "",
    culturalFit: "",
    keywordsInCoverletter: [],
    remoteWork: false,
    qualifications: "",
    location: "",
    applicantSources: "",
    jobHopping: false,
  });
  var skillRef = useRef(null);
  var keywordsRef = useRef(null);
  var coverLetterKeywordsRef = useRef(null);
  const [showError, setShowError] = useState(false);
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const [emailError, setEmailError] = useState("");
  // Step 2: Add state for Modal Visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Step 3: Toggle Modal Visibility
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const clearInputs = () => {
    setMissingDetails({
      name: "",
      email: "",
      phone: "",
      keywords: [],
      education: "",
      experienceLevel: "",
      skills: [],
      industryExperience: "",
      accomplishment: "",
      jobTenure: "",
      jobTitles: "",
      salaryLevel: "",
      companyNames: "",
      referrals: "",
      availability: "",
      relevanceOfRole: "",
      culturalFit: "",
      keywordsInCoverletter: [],
      remoteWork: false,
      qualifications: "",
      location: "",
      applicantSources: "",
      jobHopping: false,
    });
  };
  const handleDataUpload = () => {
    // Check if any of the required fields is missing
    console.log([...missingDetails.keywords, keywordsRef.current.querySelector("input").value]);
    if (
      !missingDetails.name ||
      !missingDetails.email ||
      !missingDetails.phone ||
      // [...missingDetails.keywords, keywordsRef.current.querySelector("input").value].length == 0 ||
      (missingDetails.keywords.length == 0 &&
        keywordsRef.current.querySelector("input").value == "") ||
      !missingDetails.education ||
      !missingDetails.experienceLevel ||
      (missingDetails.skills.length == 0 && skillRef.current.querySelector("input").value == "") ||
      !missingDetails.industryExperience ||
      !missingDetails.accomplishment ||
      !missingDetails.jobTenure ||
      !missingDetails.jobTitles ||
      !missingDetails.salaryLevel ||
      !missingDetails.companyNames ||
      !missingDetails.referrals ||
      !missingDetails.availability ||
      !missingDetails.relevanceOfRole ||
      !missingDetails.culturalFit ||
      (missingDetails.keywordsInCoverletter.length == 0 &&
        coverLetterKeywordsRef.current.querySelector("input").value == "") ||
      !missingDetails.qualifications ||
      !missingDetails.location ||
      !missingDetails.applicantSources
    ) {
      if (!missingDetails.name) {
        toast.error("Please enter your name.");
      }
      if (!missingDetails.email) {
        toast.error("Please enter your email.");
      }
      if (!missingDetails.phone) {
        toast.error("Please enter your phone.");
      }
      if (
        missingDetails.keywords.length == 0 &&
        keywordsRef.current.querySelector("input").value == ""
      ) {
        toast.error("Please enter some keywords.");
      }
      if (!missingDetails.education) {
        toast.error("Please enter your education.");
      }
      if (!missingDetails.experienceLevel) {
        toast.error("Please enter your experience level.");
      }
      if (
        missingDetails.skills.length == 0 &&
        skillRef.current.querySelector("input").value == ""
      ) {
        toast.error("Please enter your skills.");
      }
      if (!missingDetails.industryExperience) {
        toast.error("Please enter your industry experience.");
      }
      if (!missingDetails.accomplishment) {
        toast.error("Please enter your accomplishments.");
      }
      if (!missingDetails.jobTenure) {
        toast.error("Please enter job tenure.");
      }
      if (!missingDetails.jobTitles) {
        toast.error("Please enter your job title.");
      }
      if (!missingDetails.salaryLevel) {
        toast.error("Please enter your salary level.");
      }
      if (!missingDetails.companyNames) {
        toast.error("Please enter your previous company names.");
      }
      if (!missingDetails.referrals) {
        toast.error("Please enter your referrals.");
      }
      if (!missingDetails.availability) {
        toast.error("Please enter job availability.");
      }
      if (!missingDetails.relevanceOfRole) {
        toast.error("Please enter your role relevance.");
      }
      if (!missingDetails.culturalFit) {
        toast.error("Please enter your cultural fit.");
      }
      if (
        missingDetails.keywordsInCoverletter.length == 0 &&
        coverLetterKeywordsRef.current.querySelector("input").value == ""
      ) {
        toast.error("Please enter your cover letter keywords.");
      }
      if (!missingDetails.qualifications) {
        toast.error("Please enter your qualification.");
      }
      if (!missingDetails.location) {
        toast.error("Please enter your location.");
      }
      if (!missingDetails.applicantSources) {
        toast.error("Please enter your application source.");
      }
      // console.log(missingDetails);
      // toast.error("Oops! It looks like you missed something. Please complete all required fields.");
      return; // Stop form submission
    }

    const formData = new FormData();
    // Append form data here
    formData.append("name", missingDetails.name);
    formData.append("email", missingDetails.email);
    formData.append("phone", missingDetails.phone);
    formData.append(
      "keywords",
      keywordsRef.current.querySelector("input").value
        ? [...missingDetails.keywords, keywordsRef.current.querySelector("input").value]
        : missingDetails.keywords
    );
    formData.append("education", missingDetails.education);
    formData.append("experience_level", missingDetails.experienceLevel);
    formData.append(
      "skills",
      skillRef.current.querySelector("input").value
        ? [...missingDetails.skills, skillRef.current.querySelector("input").value]
        : missingDetails.skills
    );
    formData.append("industry_experience", missingDetails.industryExperience);
    formData.append("accomplishment", missingDetails.accomplishment);
    formData.append("job_tenure", missingDetails.jobTenure);
    formData.append("job_titles", missingDetails.jobTitles);
    formData.append("salary_level", missingDetails.salaryLevel);
    formData.append("company_names", missingDetails.companyNames);
    formData.append("referrals", missingDetails.referrals);
    formData.append("avaialability", missingDetails.availability);
    formData.append("relevance_of_role", missingDetails.relevanceOfRole);
    formData.append("cultural_fit", missingDetails.culturalFit);
    formData.append(
      "keywords_in_coverletter",
      coverLetterKeywordsRef.current.querySelector("input").value
        ? [
            ...missingDetails.keywordsInCoverletter,
            coverLetterKeywordsRef.current.querySelector("input").value,
          ]
        : missingDetails.keywordsInCoverletter
    );
    formData.append("remote_work", missingDetails.remoteWork);
    formData.append("qualifications", missingDetails.qualifications);
    formData.append("location", missingDetails.location);
    formData.append("applicant_sources", missingDetails.applicantSources);
    formData.append("job_hopping", missingDetails.jobHopping);

    const headers = {
      Authorization: `Token ${getUser.token}`,
    };
    console.log(formData.get("skills"));

    axios
      .post("https://resume-api-6u3t4.ondigitalocean.app/resume-data/", formData, { headers })
      .then((response) => {
        // Handle success
        console.log("Form Data uploaded successfully", response.data);
        toast.success("Form submitted successfully");
        clearInputs();
      })
      .catch((error) => {
        // Handle error
        console.error("Error uploading Form Data", error);
        toast.error("Oops! Something went wrong. Please try again later.");
      });
  };

  // const notifyOnResolve = () => toast.success("File upload successful", { autoClose: 2000 });
  const notifyOnResolve = (currentIndex, total) =>
    toast.success(`File upload successful (${currentIndex}/${total})`, { autoClose: 1000 });
  const notifyOnReject = () => toast.error("Failed to upload");
  const notifyOnPending = () => toast.info("File uploading");

  function handleUpload(e) {
    e.preventDefault();

    const files = fileRef.current.files;
    if (!files.length) return;

    const headers = {
      Authorization: "Token e06ac2eca287fc7136dceb7780bdee299a23a6d6",
    };

    notifyOnPending();

    // Function to send a single file
    const sendFile = (index) => {
      if (index >= files.length) return;

      const file = files[index];
      const reader = new FileReader();

      reader.onload = (event) => {
        const formData = new FormData();
        const blob = new Blob([event.target.result], { type: file.type });
        formData.append("file", blob, file.name.replace(/[^a-zA-Z0-9._]/g, ""));

        axios
          .post("https://resume-api-6u3t4.ondigitalocean.app/file-uploading/", formData, {
            headers,
          })
          .then((response) => {
            notifyOnResolve(index + 1, files.length); // +1 because index starts from 0
            console.log("success", response.data);
            // Send the next file
            sendFile(index + 1);
          })
          .catch((err) => {
            notifyOnReject();
            console.error(err);
            sendFile(index + 1);
          });
      };

      reader.readAsArrayBuffer(file);
    };

    // Start sending files
    sendFile(0);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Form.Group controlId="formFileMultiple" style={{ paddingRight: "15px" }}>
            <Form.Control type="file" multiple ref={fileRef} />
          </Form.Group>
          <Button variant="primary" onClick={handleUpload}>
            Upload Resume
          </Button>
          <ToastContainer />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ margin: "40px 0px" }}>
            <span style={{ padding: "5px 10px", background: "#ccc", borderRadius: "5px" }}>OR</span>
          </div>
        </Box>

        {/* <hr style={{ width: "100%", margin: "20px 0" }} /> */}
        <Stack spacing={3} sx={{ width: 1200 }}>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: 450 }}
              value={missingDetails.name}
              variant="standard"
              label="Name"
              placeholder="Enter your name"
              inputProps={{
                style: { fontSize: "17px" },
                onKeyPress: (e) => {
                  // Check if the key pressed is not a number
                  if (!/[a-z A-Z]/.test(e.key)) {
                    e.preventDefault();
                  }
                },
              }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  name: e.target.value,
                })
              }
              required
            />
            <TextField
              sx={{ width: 450 }}
              value={missingDetails.email}
              variant="standard"
              label="Email"
              placeholder="Enter your email"
              inputProps={{ style: { fontSize: "17px" } }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              type="email"
              onChange={(e) => {
                const emailValue = e.target.value;

                // Check if the email contains "@" and "."
                if (emailValue.includes("@") && emailValue.includes(".")) {
                  setEmailError("");
                } else {
                  setEmailError('Email should contain "@" and "."');
                }

                setMissingDetails({
                  ...missingDetails,
                  email: emailValue.split(" ").join(""),
                });
              }}
              required
              error={!!emailError}
              helperText={emailError}
            />
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: 450 }}
              value={missingDetails.phone}
              variant="standard"
              label="Phone"
              placeholder="Enter your phone"
              inputProps={{
                style: { fontSize: "17px" },
                onKeyPress: (e) => {
                  // Check if the key pressed is not a number
                  if (!/[0-9+]/.test(e.key)) {
                    e.preventDefault();
                  }
                },
              }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  phone: e.target.value,
                })
              }
              required
            />
            <Autocomplete
              sx={{ width: 450 }}
              value={missingDetails.keywords}
              multiple
              freeSolo
              id="tags-standard"
              options={top100Keywords.map((x) => x.title)}
              // getOptionLabel={(option) => option.title}
              // defaultValue={[top100Keywords[13]]}
              onChange={(e, val) => {
                setMissingDetails({
                  ...missingDetails,
                  keywords: val,
                });
              }}
              renderInput={(params) => (
                <TextField
                  sx={{ width: 450 }}
                  {...params}
                  ref={keywordsRef}
                  variant="standard"
                  label="Keywords"
                  placeholder="Skills, Designation, Role"
                  // inputProps={{ style: { fontSize: "17px" } }}
                  InputLabelProps={{ style: { fontSize: "17px" } }}
                  required
                />
              )}
            />
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginBottom: "10px",
            }}
          >
            <Autocomplete
              sx={{ width: 450 }}
              value={missingDetails.education}
              freeSolo
              id="tags-standard"
              options={CourseKeywords.map((x) => x.title)}
              // getOptionLabel={(option) => option.title}
              // defaultValue={[top100Keywords[13]]}
              onChange={(e, val) => {
                setMissingDetails({
                  ...missingDetails,
                  education: val,
                });
              }}
              renderInput={(params) => (
                <TextField
                  sx={{ width: 450 }}
                  {...params}
                  variant="standard"
                  label="Education"
                  placeholder="Enter Your education"
                  // inputProps={{ style: { fontSize: "17px" } }}
                  InputLabelProps={{ style: { fontSize: "17px" } }}
                  required
                />
              )}
            />
            {/* <TextField
              sx={{ width: 450 }}
              value={missingDetails.education}
              variant="standard"
              label="Education"
              placeholder="Enter your education"
              inputProps={{ style: { fontSize: "17px" } }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  education: e.target.value,
                })
              }
              required
            /> */}
            {/* <TextField
              sx={{ width: 450 }}
              value={missingDetails.experienceLevel}
              variant="standard"
              label="Experience level"
              placeholder="Enter your experience"
              inputProps={{ style: { fontSize: "17px" } }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  experienceLevel: e.target.value,
                })
              }
              required
            /> */}
            <TextField
              sx={{ width: 450 }}
              value={missingDetails.experienceLevel}
              variant="standard"
              label="Experience Level"
              placeholder="Enter your Experience Level"
              inputProps={{
                style: { fontSize: "17px" },
                onKeyPress: (e) => {
                  // Check if the key pressed is not a number
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                },
              }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  experienceLevel: e.target.value,
                })
              }
              required
            />
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginBottom: "10px",
            }}
          >
            <Autocomplete
              sx={{ width: 450 }}
              value={missingDetails.skills}
              multiple
              freeSolo
              id="tags-standard"
              // clearOnBlur={true}
              options={top100Keywords.map((x) => x.title)}
              // getOptionLabel={(option) => option.title}
              // defaultValue={[top100Keywords[13]]}
              onChange={(e, val) => {
                setMissingDetails({
                  ...missingDetails,
                  skills: val,
                });
              }}
              renderInput={(params) => (
                <TextField
                  sx={{ width: 450 }}
                  {...params}
                  ref={skillRef}
                  variant="standard"
                  label="Skills"
                  placeholder="Enter Your Skills"
                  // inputProps={{ style: { fontSize: "17px" } }}
                  InputLabelProps={{ style: { fontSize: "17px" } }}
                  required
                />
              )}
            />
            <TextField
              sx={{ width: 450 }}
              value={missingDetails.industryExperience}
              variant="standard"
              label="Industry Experience"
              placeholder="Enter your industry experience"
              inputProps={{ style: { fontSize: "17px" } }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  industryExperience: e.target.value,
                })
              }
              required
            />
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: 450 }}
              value={missingDetails.accomplishment}
              variant="standard"
              label="Accomplishment"
              placeholder="Enter you accomplishment"
              inputProps={{ style: { fontSize: "17px" } }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  accomplishment: e.target.value,
                })
              }
              required
            />
            <TextField
              sx={{ width: 450 }}
              value={missingDetails.jobTenure}
              variant="standard"
              label="Job Tenure"
              placeholder="Enter your tenure"
              inputProps={{ style: { fontSize: "17px" } }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  jobTenure: e.target.value,
                })
              }
              required
            />
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: 450 }}
              value={missingDetails.jobTitles}
              variant="standard"
              label="Job Titles"
              placeholder="Enter your job titles"
              inputProps={{ style: { fontSize: "17px" } }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  jobTitles: e.target.value,
                })
              }
              required
            />
            <TextField
              sx={{ width: 450 }}
              value={missingDetails.salaryLevel}
              variant="standard"
              label="Enter salary level"
              placeholder="Salary Level"
              // inputProps={{ style: { fontSize: "17px" } }}
              inputProps={{
                style: { fontSize: "17px" },
                onKeyPress: (e) => {
                  // Check if the key pressed is not a number
                  if (!/[0-9+]/.test(e.key)) {
                    e.preventDefault();
                  }
                },
              }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  salaryLevel: e.target.value,
                })
              }
              required
            />
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: 450 }}
              value={missingDetails.companyNames}
              variant="standard"
              label="Company Name"
              placeholder="Enter company name"
              inputProps={{ style: { fontSize: "17px" } }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  companyNames: e.target.value,
                })
              }
              required
            />
            <TextField
              sx={{ width: 450 }}
              value={missingDetails.referrals}
              variant="standard"
              label="Referrals"
              placeholder="Referrals"
              inputProps={{ style: { fontSize: "17px" } }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  referrals: e.target.value,
                })
              }
              required
            />
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: 450 }}
              value={missingDetails.availability}
              variant="standard"
              label="Availability"
              placeholder="availability"
              inputProps={{ style: { fontSize: "17px" } }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  availability: e.target.value,
                })
              }
              required
            />
            <TextField
              sx={{ width: 450 }}
              value={missingDetails.relevanceOfRole}
              variant="standard"
              label="Relevance of Role"
              placeholder="Relevance Of Role"
              inputProps={{ style: { fontSize: "17px" } }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  relevanceOfRole: e.target.value,
                })
              }
              required
            />
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: 450 }}
              value={missingDetails.culturalFit}
              variant="standard"
              label="Cultural Fit"
              placeholder="Cultural Fit"
              inputProps={{ style: { fontSize: "17px" } }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  culturalFit: e.target.value,
                })
              }
              required
            />
            <Autocomplete
              sx={{ width: 450 }}
              value={missingDetails.keywordsInCoverletter}
              multiple
              freeSolo
              id="tags-standard"
              options={top100Keywords.map((x) => x.title)}
              // getOptionLabel={(option) => option.title}
              // defaultValue={[top100Keywords[13]]}
              onChange={(e, val) => {
                setMissingDetails({
                  ...missingDetails,
                  keywordsInCoverletter: val,
                });
              }}
              renderInput={(params) => (
                <TextField
                  sx={{ width: 450 }}
                  {...params}
                  ref={coverLetterKeywordsRef}
                  variant="standard"
                  label="Keywords in Cover Letter"
                  placeholder="Enter keywords in your cover letter"
                  // inputProps={{ style: { fontSize: "17px" } }}
                  InputLabelProps={{ style: { fontSize: "17px" } }}
                  required
                />
              )}
            />
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: 450 }}
              value={missingDetails.qualifications}
              variant="standard"
              label="Qualifications"
              placeholder="Qualifications"
              inputProps={{ style: { fontSize: "17px" } }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  qualifications: e.target.value,
                })
              }
              required
            />
            <TextField
              sx={{ width: 450 }}
              value={missingDetails.location}
              variant="standard"
              label="Location"
              placeholder="Enter your preferred location"
              inputProps={{ style: { fontSize: "17px" } }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  location: e.target.value,
                })
              }
              required
            />
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: 450 }}
              value={missingDetails.applicantSources}
              variant="standard"
              label="Applicant Sources"
              placeholder="Applicant Source"
              inputProps={{ style: { fontSize: "17px" } }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  applicantSources: e.target.value,
                })
              }
              required
            />
            <FormControlLabel
              sx={{ width: 160 }}
              control={
                <Switch
                  value={missingDetails.jobHopping}
                  onChange={(e) => {
                    setMissingDetails({
                      ...missingDetails,
                      jobHopping: e.target.checked,
                    });
                  }}
                />
              }
              label="Job Hopping"
              required
            />
            <FormControlLabel
              sx={{ width: 165 }}
              control={
                <Switch
                  value={missingDetails.remoteWork}
                  onChange={(e) => {
                    setMissingDetails({
                      ...missingDetails,
                      remoteWork: e.target.checked,
                    });
                  }}
                />
              }
              label="Remote Work"
              required
            />
          </MDBox>

          <MDBox sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <MDButton variant="contained" color="primary" onClick={handleDataUpload}>
              Submit
            </MDButton>
          </MDBox>
        </Stack>
      </Box>
    </DashboardLayout>
  );
};
const top100Keywords = [
  { title: "Quality Control" },
  { title: "Process Quality" },
  { title: "Quality Assurance" },
  { title: "Quality Audit" },
  { title: "Process Audit" },
  { title: "Quality System" },
  { title: "QMS" },
  { title: "MR" },
  { title: "ISO certification" },
  { title: "Internal Audit" },
  { title: "QMS Implementation" },
  { title: "QA/QC" },
  { title: "SQA" },
  { title: "Supplier Quality" },
  { title: "Supplier Quality Assurance" },
  { title: "Quality Engineer" },
  { title: "Quality Manager" },
  { title: "VQI" },
  { title: "Vendor Quality Assurance" },
  { title: "Quality System Implementation" },
  { title: "Lab Quality" },
  { title: "NTTF" },
  { title: "In process Quality" },
  { title: "LAB Testing" },
  { title: "Calibration" },
  { title: "Standard Room" },
  { title: "TS 16949" },
  { title: "OHSAS Implementation" },
  { title: "LAB Technician" },
  { title: "In process Inspection" },
  { title: "Market Quality" },
  { title: "Out Going Quality" },
  { title: "Customer Quality" },
  { title: "Field Quality" },
  { title: "Field Testing" },
  { title: "Rejection analysis" },
  { title: "Customer Complaints" },
  { title: "Warranty Claims" },
  { title: "Warranty" },
  { title: "Claims" },
  { title: "Product Quality" },
  { title: "PDQA" },
  { title: "APQP" },
  { title: "PPAP" },
  { title: "Product Quality Assurance" },
  { title: "Quality Inspection" },
  { title: "Plant Quality" },
  { title: "Final Quality" },
  { title: "Quality Check" },
  { title: "Production" },
  { title: "Manufacturing" },
  { title: "Machine Shop" },
  { title: "Weld Shop" },
  { title: "Paint Shop" },
  { title: "Press Shop" },
  { title: "CNC" },
  { title: "Fanuc" },
  { title: "Mazak" },
  { title: "Siemens" },
  { title: "PLC" },
  { title: "SPMS" },
  { title: "Grinder" },
  { title: "Grinding" },
  { title: "HMC" },
  { title: "CNC Machines" },
  { title: "Razor Machines" },
  { title: "Shift In charge" },
  { title: "Production Supervisor" },
  { title: "Production Management" },
  { title: "Production Manager" },
  { title: "Production Engineer" },
  { title: "Manufacturing Operations" },
  { title: "Shop floor" },
  { title: "Factory Operations" },
  { title: "Machining" },
  { title: "VMC" },
  { title: "Turner" },
  { title: "CNC Programming" },
  { title: "Machine Programming" },
  { title: "PLC Automation" },
  { title: "SCADA" },
  { title: "Industrial Automation" },
  { title: "HMI" },
  { title: "Allen Bradley" },
  { title: "PLC Programming" },
  { title: "PLC Panel" },
  { title: "PLC Application" },
  { title: "Programme Logic Control" },
  { title: "Purchase" },
  { title: "Vendor Development" },
  { title: "Supplier Development" },
  { title: "Supplier Audits" },
  { title: "Vendor Audits" },
  { title: "SCM" },
  { title: "Material" },
  { title: "Procurement" },
  { title: "Raw Material" },
  { title: "Buying" },
  { title: "Global Sourcing" },
  { title: "Imports" },
  { title: "Import Planning" },
  { title: "International Sourcing" },
  { title: "International Vendor Management" },
  { title: "International Purchase" },
  { title: "Domestic Purchase" },
  { title: "Indirect Purchase" },
  { title: "Buyer" },
  { title: "Material Procurement" },
  { title: "Costing" },
  { title: "Pricing" },
  { title: "VA/Ve" },
  { title: "Cost Sheets" },
  { title: "Strategic Sourcing" },
  { title: "RFQ" },
  { title: "Negotiations" },
  { title: "Zero based costing" },
  { title: "Cost analysis" },
  { title: "CAPEX" },
  { title: "OPEX" },
  { title: "Product Costing" },
  { title: "Maintenance" },
  { title: "MTTR" },
  { title: "MTBF" },
  { title: "Preventive Maintenance" },
  { title: "Predictive Maintenance" },
  { title: "CNC Maintenance" },
  { title: "PLC Maintenance" },
  { title: "PLC Maintenance" },
  { title: "Erection" },
  { title: "Commissioning" },
  { title: "CAPEX" },
  { title: "Machine Installation" },
  { title: "Machine Maintenance" },
  { title: "Utility" },
  { title: "Utilities" },
  { title: "AC DC Drives" },
  { title: "ETP" },
  { title: "Projects" },
  { title: "Spare parts" },
  { title: "DG Sets" },
  { title: "Transformers" },
  { title: "Plant Maintenance" },
  { title: "Sales" },
  { title: "Marketing" },
  { title: "Dealer Development" },
  { title: "Dealer Sales" },
  { title: "Network Development" },
  { title: "Network Expansion" },
  { title: "Dealer Management" },
  { title: "Dealer Training" },
  { title: "Business Development" },
  { title: "Branding" },
  { title: "Pricing" },
  { title: "Area sales" },
  { title: "Territory sales" },
  { title: "National Sales" },
  { title: "Competitor analysis" },
  { title: "Product Planning" },
  { title: "Product Marketing" },
  { title: "Market Research" },
  { title: "Product Life cycle" },
  { title: "Product Matrix" },
  { title: "Marketing matrix" },
  { title: "Promotions" },
  { title: "Campaigns" },
  { title: "CSR" },
  { title: "Corporate Social Responsibility" },
  { title: "Brand Promotion" },
  { title: "Product Research" },
  { title: "Sales Planning" },
  { title: "Sales Training" },
  { title: "Rural Sales" },
  { title: "Cluster Sales" },
  { title: "Second Sales" },
  { title: "Fleet Sales" },
  { title: "Institutional Sales" },
  { title: "Corporate Sales" },
  { title: "Government Sales" },
  { title: "B2B" },
  { title: "B2C" },
  { title: "MLM" },
  { title: "Advertise" },
  { title: "Modern Trade" },
  { title: "ATL" },
  { title: "BTL" },
  { title: "Distributor" },
  { title: "Distribution Management" },
  { title: "Finance" },
  { title: "Accounts" },
  { title: "Taxation" },
  { title: "Tax" },
  { title: "Audit" },
  { title: "Internal Control" },
  { title: "Internal Audit" },
  { title: "Transfer Pricing" },
  { title: "Factory Accounts" },
  { title: "Plant Accounts" },
  { title: "GST" },
  { title: "BRS" },
  { title: "Chartered Accountant" },
  { title: "CMA" },
  { title: "CS" },
  { title: "ACA" },
  { title: "FCA" },
  { title: "Legal" },
  { title: "US gAAP" },
  { title: "FICO" },
  { title: "R&D" },
  { title: "Research & Development" },
  { title: "New Product Design" },
  { title: "Design" },
  { title: "Design & Development" },
  { title: "Product Design" },
  { title: "New Product Development" },
  { title: "Product Development" },
  { title: "CAE" },
  { title: "Vehicle Integration" },
  { title: "Vehicle Testing" },
  { title: "Prototype Development" },
  { title: "APQP" },
  { title: "PPAP" },
  { title: "FEA" },
  { title: "FMEA" },
  { title: "Abacus" },
  { title: "Ansys" },
  { title: "Dyna" },
  { title: "Product Research" },
  { title: "Environment" },
  { title: "Safety" },
  { title: "Health" },
  { title: "Energy" },
  { title: "Fire" },
  { title: "Safety Audits" },
  { title: "OHSAS" },
  { title: "Sustainability" },
  { title: "Recycling" },
  { title: "CSR" },
  { title: "Corporate Social Responsibility" },
  { title: "RLI" },
  { title: "CLI" },
  { title: "Regional Labour Institute" },
  { title: "Central Labour Institute" },
  { title: "Process Engineering" },
  { title: "Manufacturing Engineering" },
  { title: "Project Engineering" },
  { title: "Lean Manufacturing" },
  { title: "TPS" },
  { title: "Toyota Production System" },
  { title: "New Product development" },
  { title: "Production Engineering" },
  { title: "New Projects" },
  { title: "KANBAN" },
  { title: "Kaizen" },
  { title: "5s" },
  { title: "JIT" },
  { title: "Industrial Engineering" },
  { title: "Industrial Engineer" },
  { title: "Time Study" },
  { title: "Motion Study" },
  { title: "Method Study" },
];

const CourseKeywords = [
  { title: "Ph.D/Doctorate" },
  { title: "MPHIL" },
  { title: "MBA/PGDM" },
  { title: "M.Tech" },
  { title: "MS/M.Sc(Science)" },
  { title: "MCA" },
  { title: "M.Com" },
  { title: "PG Diploma" },
  { title: "M.A" },
  { title: "CA" },
  { title: "DM" },
  { title: "ICWA (CMA)" },
  { title: "Integrated PG" },
  { title: "LLM" },
  { title: "M.Arch" },
  { title: "M.Ch" },
  { title: "M.Des" },
  { title: "M.Ed" },
  { title: "M.Pharma" },
  { title: "MCM" },
  { title: "MDS" },
  { title: "Medical-MS/MD" },
  { title: "MFA" },
  { title: "MVSC" },
  { title: "B.Tech/B.E" },
  { title: "B.Com" },
  { title: "B.Sc" },
  { title: "B.A" },
  { title: "Diploma" },
  { title: "B.Arch" },
  { title: "B.B.A/B.M.S" },
  { title: "B.Des" },
  { title: "B.Ed" },
  { title: "B.EI.ED" },
  { title: "B.P.ED" },
  { title: "B.Pharma" },
  { title: "B.U.M.S" },
  { title: "BAMS" },
  { title: "BCA" },
  { title: "BDS" },
  { title: "BFA" },
  { title: "BHM" },
  { title: "BHMCT" },
  { title: "BHMS" },
  { title: "BVSC" },
  { title: "LLB" },
  { title: "MBBS" },
];

export default From;
