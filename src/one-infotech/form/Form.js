import React, { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

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

const From = () => {
  const [missingDetails, setMissingDetails] = useState("");
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  const handleDataUpload = () => {
    const formData = new FormData();
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
        console.log("File uploaded successfully", response.data);
        toast.success("Form submitted successfully");
      })
      .catch((error) => {
        // Handle error
        console.error("Error uploading file", error);
        toast.error("Error submitting form");
      });
  };

  const notifyOnResolve = () => toast.success("file upload successful");
  const notifyOnReject = () => toast.error("Failed to upload");
  const notifyOnPending = () => toast.info("File uploading");

  // const handleFileChange = (event) => {
  //   // console.log(event.target.files);
  //   let fileList = event.target.files;
  //   let newList = new DataTransfer();
  //   for (let i = 0; i < fileList.length; i++) {
  //     let newFile = new File([fileList[i]], fileList[i].name.replace(/[^a-zA-Z0-9._]/g, ""));
  //     newList.items.add(newFile);
  //   }
  //   for (let i = 0; i < newList.files.length; i++) {
  //     console.log(newList.files[i]);
  //   }
  //   event.target.files = newList.files;
  //   // setFile(event.target.files);
  //   setFile(newList.files);
  // };

  // const handleUpload = () => {
  //   if (file) {
  //     const formData = new FormData();
  //     for (const f of file) {
  //       // console.log(f);
  //       formData.append("file", f);
  //     }
  //     console.log(formData);
  //     const headers = {
  //       Authorization: "Token e06ac2eca287fc7136dceb7780bdee299a23a6d6",
  //     };
  //     // Display the 'File uploading' message
  //     notifyOnPending();
  //     axios
  //       .post("https://resume-api-6u3t4.ondigitalocean.app/file-uploading", formData, { headers })
  //       .then((response) => {
  //         // Handle success
  //         notifyOnResolve();
  //         console.log("File uploaded successfully", response.data);
  //       })
  //       .catch((error) => {
  //         // Handle error
  //         notifyOnReject();
  //         console.error("Error uploading file", error);
  //       });
  //   } else {
  //     // Handle no file selected error
  //     console.error("No file selected");
  //   }
  // };

  function handleUpload(e) {
    e.preventDefault();
    // console.log(fileRef.current.files);
    let files = fileRef.current.files;
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", new File([files[i]], files[i].name.replace(/[^a-zA-Z0-9._]/g, "")));
      // formData.append("file", files[i]);
    }
    console.log(formData.getAll("file"));
    const headers = {
      Authorization: "Token e06ac2eca287fc7136dceb7780bdee299a23a6d6",
      // "Content-Type": "multipart/form-data",
    };
    notifyOnPending();
    axios
      .post("https://resume-api-6u3t4.ondigitalocean.app/file-uploading/", formData, { headers })
      .then((response) => {
        notifyOnResolve();
        console.log("success" + response.data);
      })
      .catch((err) => {
        notifyOnReject();
        console.error(err);
      });
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <MDBox sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <input type="file" multiple ref={fileRef} />
        <button style={buttonStyles} onClick={handleUpload}>
          Upload Resume
        </button>
        <ToastContainer />
      </MDBox> */}
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Form.Group controlId="formFileMultiple">
            <Form.Control type="file" ref={fileRef} />
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
        <Stack spacing={3} sx={{ width: 1000 }}>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: 450 }}
              variant="standard"
              label="Name"
              placeholder="Enter your name"
              inputProps={{ style: { fontSize: "17px" } }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  name: e.target.value,
                })
              }
            />
            <TextField
              sx={{ width: 450 }}
              variant="standard"
              label="Email"
              placeholder="Enter your email"
              inputProps={{ style: { fontSize: "17px" } }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  email: e.target.value,
                })
              }
            />
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: 450 }}
              variant="standard"
              label="Phone"
              placeholder="Enter you phone"
              inputProps={{ style: { fontSize: "17px" } }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  phone: e.target.value,
                })
              }
            />
            <Autocomplete
              sx={{ width: 450 }}
              multiple
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
                  inputProps={{ style: { fontSize: "17px" } }}
                  InputLabelProps={{ style: { fontSize: "17px" } }}
                />
              )}
            />
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: 450 }}
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
            />
            <TextField
              sx={{ width: 450 }}
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
            />
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <Autocomplete
              sx={{ width: 450 }}
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
                  inputProps={{ style: { fontSize: "17px" } }}
                  InputLabelProps={{ style: { fontSize: "17px" } }}
                />
              )}
            />
            <TextField
              sx={{ width: 450 }}
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
            />
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: 450 }}
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
            />
            <TextField
              sx={{ width: 450 }}
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
            />
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: 450 }}
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
            />
            <TextField
              sx={{ width: 450 }}
              variant="standard"
              label="Enter salary level"
              placeholder="Salary Level"
              inputProps={{ style: { fontSize: "17px" } }}
              InputLabelProps={{ style: { fontSize: "17px" } }}
              onChange={(e) =>
                setMissingDetails({
                  ...missingDetails,
                  salaryLevel: e.target.value,
                })
              }
            />
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: 450 }}
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
            />
            <TextField
              sx={{ width: 450 }}
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
            />
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: 450 }}
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
            />
            <TextField
              sx={{ width: 450 }}
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
            />
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: 450 }}
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
            />
            <Autocomplete
              sx={{ width: 450 }}
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
                  inputProps={{ style: { fontSize: "17px" } }}
                  InputLabelProps={{ style: { fontSize: "17px" } }}
                />
              )}
            />
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: 450 }}
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
            />
            <TextField
              sx={{ width: 450 }}
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
            />
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: 450 }}
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
            />
            <FormControlLabel
              sx={{ width: 450 }}
              control={
                <Switch
                  onChange={(e) => {
                    setMissingDetails({
                      ...missingDetails,
                      jobHopping: e.target.checked,
                    });
                  }}
                />
              }
              label="Job Hopping"
            />
          </MDBox>
          <FormControlLabel
            sx={{ width: 450 }}
            control={
              <Switch
                onChange={(e) => {
                  setMissingDetails({
                    ...missingDetails,
                    remoteWork: e.target.checked,
                  });
                }}
              />
            }
            label="Remote Work"
          />

          {/* </MDBox> */}
          <MDBox>
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
  { title: "Data Analytics" },
  { title: "Data Science" },
  { title: "Frontend Development" },
  { title: "Backend Development" },
  { title: "Fullstack Development" },
  { title: "ReactJS" },
  { title: "NodeJS" },
  { title: "MongoDB" },
  { title: "HR" },
  { title: "SDE1" },
  { title: "SDE2" },
  { title: "Manager" },
  { title: "Senior Manager" },
  { title: "Full Time" },
  { title: "Part Time" },
  { title: "Contract Based" },
  { title: "Internship" },
  { title: "AI/ML" },
];
export default From;
