import React from "react";

// @mui material components
// import Grid from "@mui/material/Grid";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Tooltip from "@mui/material/Tooltip";
// import Icon from "@mui/material/Icon";
// import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
// import MDBox from "components/MDBox";
// import MDBadgeDot from "components/MDBadgeDot";
// import MDButton from "components/MDButton";
// import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import MDTypography from "components/MDTypography";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import axios from "axios";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const buttonStyles = {
  backgroundColor: "#007BFF",
  color: "white",
  padding: "10px 20px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
};

const inputStyles = {
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "10px",
  fontSize: "16px",
};

const From = () => {
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChangeAccordion = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // State for display details, variables will be stored within the display details object.
  const [displayDetails, setDisplayDetails] = useState({});

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const headers = {
        Authorization: "Token e06ac2eca287fc7136dceb7780bdee299a23a6d6",
      };

      axios
        .post("https://resume-api-6u3t4.ondigitalocean.app/file-uploading/", formData, { headers })
        .then((response) => {
          // Handle success
          console.log("File uploaded successfully", response.data);
        })
        .catch((error) => {
          // Handle error
          console.error("Error uploading file", error);
        });
    } else {
      // Handle no file selected error
      console.error("No file selected");
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <h1>Advanced Search</h1>
      <MDBox>
        <input style={inputStyles} type="file" onChange={handleFileChange} />
        <button style={buttonStyles} onClick={handleUpload}>
          Upload Resume
        </button>
      </MDBox>
      <Stack spacing={3} sx={{ width: 1000 }}>
        <Autocomplete
          multiple
          id="tags-standard"
          options={top100Keywords}
          getOptionLabel={(option) => option.title}
          defaultValue={[top100Keywords[13]]}
          onChange={handleChangeData}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Any Keywords"
              placeholder="Skills, Designation, Role"
              onChange={handleChangeData}
              value={advancedSearchData.anyKeys}
              name="anyKeys"
            />
          )}
        />
        <Autocomplete
          multiple
          id="tags-standard"
          options={top100Keywords}
          getOptionLabel={(option) => option.title}
          defaultValue={[top100Keywords[13]]}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="All Keywords"
              placeholder="Skills, Designation, Role"
            />
          )}
        />
        <Autocomplete
          multiple
          id="tags-standard"
          options={top100Keywords}
          getOptionLabel={(option) => option.title}
          defaultValue={[top100Keywords[13]]}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Excluding Keywords"
              placeholder="Skills, Designation, Role"
            />
          )}
        />
      </Stack>

      <MDBox className="input" sx={{ display: "flex", marginTop: "20px" }}>
        <p>Total Experience:</p>
        <MDBox sx={{ display: "flex" }}>
          <Autocomplete
            className="experience"
            sx={{ width: 300, marginRight: "20px", marginLeft: "20px" }}
            defaultValue="min"
            options={["0", "1", "2", "3", "4", "5"]}
            renderInput={(params) => <MDInput {...params} variant="standard" />}
          />
          <p>To</p>
          <Autocomplete
            className="experience"
            sx={{ width: 300, marginRight: "20px", marginLeft: "20px" }}
            defaultValue="max"
            options={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
            renderInput={(params) => <MDInput {...params} variant="standard" />}
          />
          <p>in years</p>
        </MDBox>
      </MDBox>
      <MDBox className="input" sx={{ display: "flex", marginTop: "20px", marginBottom: "20px" }}>
        <p>Annual Salary</p>
        <Autocomplete
          className="experience"
          sx={{ width: 50, marginRight: "20px", marginLeft: "20px" }}
          defaultValue="₹"
          options={["$", "€", "£", "¥", "₣"]}
          renderInput={(params) => <MDInput {...params} variant="standard" />}
        />
        <MDBox sx={{ display: "flex" }}>
          <Autocomplete
            className="experience"
            sx={{ width: 100, marginRight: "20px", marginLeft: "20px" }}
            defaultValue="Lacs"
            options={[
              "0",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
            ]}
            renderInput={(params) => <MDInput {...params} variant="standard" />}
          />
          <Autocomplete
            className="experience"
            sx={{ width: 200, marginRight: "20px" }}
            defaultValue="Thousand"
            options={[
              "0",
              "5",
              "10",
              "15",
              "20",
              "25",
              "30",
              "35",
              "40",
              "45",
              "50",
              "55",
              "60",
              "65",
              "70",
              "75",
              "80",
              "85",
              "90",
              "95",
            ]}
            renderInput={(params) => <MDInput {...params} variant="standard" />}
          />
          <span>To</span>
          <Autocomplete
            className="experience"
            sx={{ width: 100, marginRight: "20px", marginLeft: "20px" }}
            defaultValue="Lacs"
            options={[
              "0",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
            ]}
            renderInput={(params) => <MDInput {...params} variant="standard" />}
          />
          <Autocomplete
            className="experience"
            sx={{ width: 200 }}
            defaultValue="Thousand"
            options={[
              "0",
              "5",
              "10",
              "15",
              "20",
              "25",
              "30",
              "35",
              "40",
              "45",
              "50",
              "55",
              "60",
              "65",
              "70",
              "75",
              "80",
              "85",
              "90",
              "95",
            ]}
            renderInput={(params) => <MDInput {...params} variant="standard" />}
          />
        </MDBox>
      </MDBox>
      <MDBox className="location" sx={{ marginBottom: "20px" }} display="flex">
        <p>Current Location</p>
        <Autocomplete
          defaultValue="Type or select a location from the list"
          options={["New Delhi", "NCR", "Bangalore", "Mumbai", "Chennai", "Pune"]}
          renderInput={(params) => <MDInput {...params} variant="standard" />}
          sx={{ width: 500, marginLeft: "20px" }}
        />
      </MDBox>

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChangeAccordion("panel1")}
        sx={{ borderRadius: "10px" }}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Educational Details</Typography>
        </AccordionSummary>
        <MDBox sx={{ marginTop: "20px", marginLeft: "20px", marginBottom: "10px" }}>
          UG Qualifications
        </MDBox>
        <MDBox sx={{ marginLeft: "20px" }}>
          <ToggleButtonGroup
            color="info"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="Any UG Qualifications">Any UG Qualifications</ToggleButton>
            <ToggleButton value="Specific UG Qualifications">
              Specific UG Qualifications
            </ToggleButton>
            <ToggleButton value="UG not necessary">UG not necessary</ToggleButton>
          </ToggleButtonGroup>
        </MDBox>
        <MDBox sx={{ marginLeft: "20px", marginRight: "20px" }}>
          <MDInput
            type="text"
            label="Institute Name"
            fullWidth
            placeholder="Institue name"
            margin="normal"
          />
        </MDBox>

        <MDBox display="flex" className="input" sx={{ margin: "20px" }}>
          <p>Year of Graduation</p>
          <Autocomplete
            defaultValue="From"
            sx={{ width: 300, marginLeft: "20px", marginRight: "20px" }}
            options={[
              "2010",
              "2011",
              "2012",
              "2013",
              "2014",
              "2015",
              "2016",
              "2017",
              "2018",
              "2019",
              "2020",
              "2022",
              "2023",
            ]}
            renderInput={(params) => <MDInput {...params} variant="standard" />}
          />

          <Autocomplete
            defaultValue="To"
            sx={{ width: 300 }}
            options={[
              "2010",
              "2011",
              "2012",
              "2013",
              "2014",
              "2015",
              "2016",
              "2017",
              "2018",
              "2019",
              "2020",
              "2022",
              "2023",
            ]}
            renderInput={(params) => <MDInput {...params} variant="standard" />}
          />
        </MDBox>
        <MDBox className="location" sx={{ display: "flex", margin: "20px" }}>
          <p>Education Type</p>
          <Autocomplete
            defaultValue="Any"
            sx={{ width: 300, marginLeft: "20px" }}
            options={["Any", "Full Time", "Part Time", "Correspondence"]}
            renderInput={(params) => <MDInput {...params} variant="standard" />}
          />
        </MDBox>
        <MDBox sx={{ marginLeft: "20px", marginBottom: "10px" }}>PG Qualifications</MDBox>
        <ToggleButtonGroup
          color="info"
          value={alignment}
          exclusive
          onChange={handleChange}
          sx={{ marginLeft: "20px" }}
          aria-label="Platform"
        >
          <ToggleButton value="Any PG Qualifications">Any PG Qualifications</ToggleButton>
          <ToggleButton value="Specific PG Qualifications">Specific PG Qualifications</ToggleButton>
          <ToggleButton value="PG not necessary">PG not necessary</ToggleButton>
        </ToggleButtonGroup>
        <MDBox>
          <MDInput
            sx={{ marginLeft: "10px" }}
            type="text"
            label="Institute Name"
            fullWidth
            placeholder="Institue name"
            margin="normal"
          />
        </MDBox>

        <MDBox display="flex" className="input" sx={{ margin: "20px" }}>
          <p>Year of Graduation</p>
          <Autocomplete
            defaultValue="From"
            sx={{ width: 300, marginLeft: "20px", marginRight: "20px" }}
            options={[
              "2010",
              "2011",
              "2012",
              "2013",
              "2014",
              "2015",
              "2016",
              "2017",
              "2018",
              "2019",
              "2020",
              "2022",
              "2023",
            ]}
            renderInput={(params) => <MDInput {...params} variant="standard" />}
          />

          <Autocomplete
            defaultValue="To"
            sx={{ width: 300 }}
            options={[
              "2010",
              "2011",
              "2012",
              "2013",
              "2014",
              "2015",
              "2016",
              "2017",
              "2018",
              "2019",
              "2020",
              "2022",
              "2023",
            ]}
            renderInput={(params) => <MDInput {...params} variant="standard" />}
          />
        </MDBox>
        <MDBox className="location" sx={{ display: "flex", margin: "20px" }}>
          <p>Education Type</p>
          <Autocomplete
            defaultValue="Any"
            sx={{ width: 300, marginLeft: "20px" }}
            options={["Any", "Full Time", "Part Time", "Correspondence"]}
            renderInput={(params) => <MDInput {...params} variant="standard" />}
          />
        </MDBox>
        {/* <AccordionDetails>
          <Typography></Typography>
        </AccordionDetails> */}
      </Accordion>
      {/* <AccordionDetails>
        <Typography></Typography>
      </AccordionDetails> */}
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChangeAccordion("panel2")}
        sx={{ borderRadius: "10px", marginTop: "20px" }}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Employment Details</Typography>
        </AccordionSummary>

        <MDBox sx={{ paddingRight: "20px", paddingLeft: "20px", paddingTop: "20px" }}>
          <p>Functional Area</p>
          <Autocomplete
            defaultValue="Select Functional Area/Role(s) or Start typing"
            sx={{ width: 300 }}
            options={[
              "Any",
              "Accounting / Tax / Company Secretary / Audit",
              "Agent",
              "Airline / Reservations / Ticketing / Travel",
              "Analytics & Business Intelligence",
              "Anchoring / TV / Films / Production",
            ]}
            renderInput={(params) => <MDInput {...params} variant="standard" />}
          />
          {/* <MDInput type="text" label="Industry" fullWidth margin="normal" /> */}
          <MDBox sx={{ paddingTop: "20px" }}>
            <p>Industry</p>
            <Autocomplete
              defaultValue="Select Industry(s) or start typing"
              sx={{ width: 300 }}
              options={[
                "2010",
                "2011",
                "2012",
                "2013",
                "2014",
                "2015",
                "2016",
                "2017",
                "2018",
                "2019",
                "2020",
                "2022",
                "2023",
              ]}
              renderInput={(params) => <MDInput {...params} variant="standard" />}
            />
          </MDBox>

          <MDInput
            type="text"
            label="Employers"
            placeholder="Type company name"
            fullWidth
            margin="normal"
          />
          <MDInput
            type="text"
            label="Exclude Employers"
            placeholder="Type company name"
            fullWidth
            margin="normal"
          />
          <MDInput
            type="text"
            label="Designation"
            placeholder="Type designation"
            fullWidth
            margin="normal"
          />
          <MDBox sx={{ paddingBottom: "20px", paddingTop: "20px" }}>
            <p>Notice Period</p>
            <Autocomplete
              defaultValue="Type here or select"
              sx={{ width: 300 }}
              options={[
                "2010",
                "2011",
                "2012",
                "2013",
                "2014",
                "2015",
                "2016",
                "2017",
                "2018",
                "2019",
                "2020",
                "2022",
                "2023",
              ]}
              renderInput={(params) => <MDInput {...params} variant="standard" />}
            />
          </MDBox>
        </MDBox>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChangeAccordion("panel3")}
        sx={{ borderRadius: "10px", marginTop: "20px" }}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Additional Details</Typography>
        </AccordionSummary>
        <MDBox sx={{ paddingRight: "20px", paddingLeft: "20px", paddingTop: "20px" }}>
          <p>Candidate Category</p>
          <Autocomplete
            defaultValue="Select Category"
            sx={{ width: 300 }}
            options={["1", "2", "3", "4"]}
            renderInput={(params) => <MDInput {...params} variant="standard" />}
          />
          <MDBox sx={{ paddingTop: "20px" }}>
            <FormGroup>
              <FormControlLabel control={<Switch />} label="Search Women Candidates Only" />
              <FormControlLabel
                control={<Switch />}
                label="Search Candidates with Special Abilities Only"
              />
            </FormGroup>
          </MDBox>

          {/* <MDInput type="text" label="Candidate Age (Min)" placeholder="Min" margin="normal" />
        <MDInput type="text" label="Candidate Age (Max)" placeholder="max" margin="normal" /> */}
          <MDBox sx={{ display: "flex", marginBottom: "20px" }}>
            <Grid item xs={12} lg={5}>
              <MDBox mb={1.5} lineHeight={0}>
                <MDTypography
                  component="label"
                  variant="button"
                  color="text"
                  fontWeight="regular"
                ></MDTypography>
              </MDBox>
              <p>Candidate Age</p>
              <Autocomplete
                sx={{ width: 300 }}
                defaultValue="MIN"
                options={[
                  "18 years",
                  "19 years",
                  "20 years",
                  "21 years",
                  "22 years",
                  "23 years",
                  "24 years",
                  "25 years",
                  "26 years",
                  "27 years",
                  "28 years",
                  "29 years",
                  "30 years",
                ]}
                renderInput={(params) => <MDInput {...params} variant="standard" />}
              />
            </Grid>
            <Grid item xs={12} lg={5}>
              <MDBox mb={1.5} lineHeight={0}>
                <MDTypography
                  component="label"
                  variant="button"
                  color="text"
                  halfWidth
                  fontWeight="regular"
                ></MDTypography>
              </MDBox>
              <p>Candidate Age</p>
              <Autocomplete
                defaultValue="MAX"
                sx={{ width: 300, marginLeft: "15px" }}
                options={[
                  "18 years",
                  "19 years",
                  "20 years",
                  "21 years",
                  "22 years",
                  "23 years",
                  "24 years",
                  "25 years",
                  "26 years",
                  "27 years",
                  "28 years",
                  "29 years",
                  "30 years",
                ]}
                renderInput={(params) => <MDInput {...params} variant="standard" />}
              />
            </Grid>
          </MDBox>
          {/* <MDInput type="text" label="Work Status for USA" fullWidth margin="normal" /> */}
          <p>Work status for USA</p>
          <Autocomplete
            defaultValue="Select"
            sx={{ width: 300 }}
            options={["yes eligible", "not eligible"]}
            renderInput={(params) => <MDInput {...params} variant="standard" />}
          />

          <MDBox sx={{ paddingTop: "20px", paddingBottom: "20px" }}>
            <p>Work Permit For</p>
            <Autocomplete
              defaultValue="Select Country"
              sx={{ width: 300 }}
              options={["India", "Italy", "Japan", "Indonesia", "Jordan"]}
              renderInput={(params) => <MDInput {...params} variant="standard" />}
            />
          </MDBox>
        </MDBox>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChangeAccordion("panel4")}
        sx={{ borderRadius: "10px", marginTop: "20px" }}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Display Details</Typography>
        </AccordionSummary>
        <MDBox sx={{ paddingRight: "20px", paddingLeft: "20px" }}>
          <p>Show only candidate with</p>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  onChange={(e, val) => {
                    setDisplayDetails({
                      ...displayDetails,
                      verifiedMobile: val,
                    });
                  }}
                />
              }
              label="Verified mobile number"
            />
            <FormControlLabel
              control={
                <Switch
                  onChange={(e, val) => {
                    setDisplayDetails({
                      ...displayDetails,
                      verifiedEmail: val,
                    });
                  }}
                />
              }
              label="Verified email ID"
            />
            <FormControlLabel
              control={
                <Switch
                  onChange={(e, val) => {
                    setDisplayDetails({
                      ...displayDetails,
                      attachedResume: val,
                    });
                  }}
                />
              }
              label="Attached Resume"
            />
          </FormGroup>
          <MDBox sx={{ display: "flex", flexDirection: "column" }}>
            <MDBox sx={{ display: "flex", alignItems: "center" }}>
              Show Candidate Seeking
              <break />
              <Autocomplete
                defaultValue="Job Type"
                sx={{ width: 300, marginLeft: "15px" }}
                options={["1", "2", "3", "4", "5"]}
                onChange={(e, val) => {
                  setDisplayDetails({
                    ...displayDetails,
                    jobType: val,
                  });
                }}
                renderInput={(params) => <MDInput {...params} variant="standard" />}
              />
              <Autocomplete
                defaultValue="Employement Type"
                sx={{ width: 300, marginLeft: "15px" }}
                options={["1", "2", "3", "4", "5"]}
                onChange={(e, val) => {
                  setDisplayDetails({
                    ...displayDetails,
                    employmentType: val,
                  });
                }}
                renderInput={(params) => <MDInput {...params} variant="standard" />}
              />
            </MDBox>
            <MDBox>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(e, val) => {
                        setDisplayDetails({
                          ...displayDetails,
                          searchPremiumResume: val,
                        });
                      }}
                    />
                  }
                  label="Search only Premium Resumes"
                />
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(e, val) => {
                        setDisplayDetails({
                          ...displayDetails,
                          searchFeaturedCandidates: val,
                        });
                      }}
                    />
                  }
                  label="Search only Featured Candidates"
                />
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(e, val) => {
                        setDisplayDetails({
                          ...displayDetails,
                          searchCandidatesBySMS: val,
                        });
                      }}
                    />
                  }
                  label="Search Only those candidates that can be contacted by SMS"
                />
              </FormGroup>
            </MDBox>
          </MDBox>
          <MDBox sx={{ marginBottom: "20px" }}>
            <p>Resume per page</p>
            <Autocomplete
              defaultValue="SELECT"
              sx={{ width: 300 }}
              options={["1", "2", "3", "4", "5"]}
              onChange={(e, val) => {
                setDisplayDetails({
                  ...displayDetails,
                  resumePerPage: val,
                });
              }}
              renderInput={(params) => <MDInput {...params} variant="standard" />}
            />
          </MDBox>

          {/* <MDInput type="text" label="Sort By" placeholder="Relevance" fullWidth margin="normal" /> */}
          <MDBox sx={{ marginBottom: "20px" }}>
            <p>Sort By</p>
            <Autocomplete
              defaultValue="Relevance"
              sx={{ width: 300 }}
              options={["1", "2", "3", "4", "5"]}
              onChange={(e, val) => {
                setDisplayDetails({
                  ...displayDetails,
                  relevance: val,
                });
              }}
              renderInput={(params) => <MDInput {...params} variant="standard" />}
            />
          </MDBox>

          <p>Semantic Search</p>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  onChange={(e, val) => {
                    setDisplayDetails({
                      ...displayDetails,
                      semanticSearch: val,
                    });
                  }}
                />
              }
              label="ON"
            />
          </FormGroup>
        </MDBox>
      </Accordion>
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
//small change
export default From;
