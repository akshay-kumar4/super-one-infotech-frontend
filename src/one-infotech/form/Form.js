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
    if (
      !missingDetails.name ||
      !missingDetails.email ||
      !missingDetails.phone ||
      !missingDetails.keywords ||
      !missingDetails.education ||
      !missingDetails.experienceLevel ||
      !missingDetails.skills ||
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
      !missingDetails.keywordsInCoverletter ||
      !missingDetails.qualifications ||
      !missingDetails.location ||
      !missingDetails.applicantSources
    ) {
      console.log(missingDetails);
      toast.error("Oops! It looks like you missed something. Please complete all required fields.");
      return; // Stop form submission
    }

    const formData = new FormData();
    // Append form data here
    formData.append("name", missingDetails.name);
    formData.append("email", missingDetails.email);
    formData.append("phone", missingDetails.phone);
    formData.append("keywords", missingDetails.keywords);
    formData.append("education", missingDetails.education);
    formData.append("experience_level", missingDetails.experienceLevel);
    formData.append("skills", missingDetails.skills);
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
    formData.append("keywords_in_coverletter", missingDetails.keywordsInCoverletter);
    formData.append("remote_work", missingDetails.remoteWork);
    formData.append("qualifications", missingDetails.qualifications);
    formData.append("location", missingDetails.location);
    formData.append("applicant_sources", missingDetails.applicantSources);
    formData.append("job_hopping", missingDetails.jobHopping);

    const headers = {
      Authorization: "Token e06ac2eca287fc7136dceb7780bdee299a23a6d6",
    };

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
                  if (!/[a-zA-Z+]/.test(e.key)) {
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
                  email: emailValue,
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
            <TextField
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
            />
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
];
export default From;
