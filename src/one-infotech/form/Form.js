import React, { useState } from "react";

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
// import MDButton from "components/MDButton";
// import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

const From = () => {
  const [missingDetails, setMissingDetails] = useState("");
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
          label="email"
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
          label="phone"
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
              anyKeys: val,
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
              accomplishment: e.target.value,
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
              accomplishment: e.target.value,
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
              accomplishment: e.target.value,
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
              accomplishment: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="accomplishment"
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
              accomplishment: e.target.value,
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
              accomplishment: e.target.value,
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
              referral: e.target.value,
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
              accomplishment: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="referrals"
          placeholder="Referrals"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              accomplishment: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="availability"
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
          label="culturalFit"
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
              accomplishment: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="applicantSources"
          placeholder="Applicant Source"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              applicantSources: e.target.value,
            })
          }
        />
        <TextField
          variant="standard"
          label="qualification"
          placeholder="Qualification"
          onChange={(e) =>
            setMissingDetails({
              ...missingDetails,
              qualification: e.target.value,
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
  { title: "Frontend Development" },
  { title: "Backend Development" },
  { title: "Fullstack Development" },
  { title: "Data Analytics" },
  { title: "Data Science" },
  { title: "Frontend Development" },
  { title: "Backend Development" },
  { title: "Fullstack Development" },
  { title: "Data Analytics" },
  { title: "Data Science" },
  { title: "Frontend Development" },
  { title: "Backend Development" },
  { title: "Fullstack Development" },
  { title: "Data Analytics" },
  { title: "Data Science" },
  { title: "Frontend Development" },
  { title: "Backend Development" },
  { title: "Fullstack Development" },
  { title: "Data Analytics" },
  { title: "Data Science" },
  { title: "Frontend Development" },
  { title: "Backend Development" },
  { title: "AI/ML" },
];
export default From;
