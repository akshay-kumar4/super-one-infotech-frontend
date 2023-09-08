import React, { useState } from "react";
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

const From = () => {
  const [missingDetails, setMissingDetails] = useState("");

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
    formData.append("qualifications", missingDetails.qualification);
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
      })
      .catch((error) => {
        // Handle error
        console.error("Error uploading file", error);
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Stack spacing={3} sx={{ width: 1000 }}>
        {/* <MDBox> */}
        <TextField
          variant="standard"
          label="Name"
          placeholder="Enter you name"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              name: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="Email"
          placeholder="Enter you email"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              email: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="Phone"
          placeholder="Enter you phone"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              phone: e.target.value,
            })
          }
        />
        <Autocomplete
          multiple
          id="tags-standard"
          options={top100Keywords}
          getOptionLabel={(option) => option.title}
          defaultValue={[top100Keywords[13]]}
          onChange={(e, val) => {
            setMissingDetails({
              ...missingDetails,
              keywords: val,
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Keywords"
              placeholder="Skills, Designation, Role"
            />
          )}
        />
        <TextField
          variant="standard"
          label="Education"
          placeholder="Enter your education"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              education: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="Experience level"
          placeholder="Enter your experience"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              experienceLevel: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="Skills"
          placeholder="Enter your skills"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              skills: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="Industry Experience"
          placeholder="Enter your industry experience"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              industryExperience: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="Accomplishment"
          placeholder="Enter you accomplishment"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              accomplishment: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="Job Tenure"
          placeholder="Enter your tenure"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              jobTenure: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="Job Titles"
          placeholder="Enter your job titles"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              jobTitles: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="Enter salary level"
          placeholder="Salary Level"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              salaryLevel: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="Company Names"
          placeholder="Enter company names"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              companyNames: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="Referrals"
          placeholder="Referrals"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              referrals: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="Availability"
          placeholder="availability"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              availability: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="Relevance of Role"
          placeholder="Relevance Of Role"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              relevanceOfRole: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="Cultural Fit"
          placeholder="Cultural Fit"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              culturalFit: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="Keywords in coverletter"
          placeholder="Enter keywords in your coverletter"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              keywordsInCoverletter: e.target.value,
            })
          }
        />
        <FormControlLabel
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
        <TextField
          variant="standard"
          label="Qualifications"
          placeholder="Qualifications"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              qualifications: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="Location"
          placeholder="Enter your preferred location"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              accomplishment: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="Applicant Sources"
          placeholder="Applicant Source"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              applicantSources: e.target.value,
            })
          }
        />
        <FormControlLabel
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
        {/* </MDBox> */}
      </Stack>
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
  { title: "Senior Managr" },
  { title: "Full Time" },
  { title: "Part Time" },
  { title: "Contract Based" },
  { title: "Internship" },
  { title: "AI/ML" },
];
export default From;
