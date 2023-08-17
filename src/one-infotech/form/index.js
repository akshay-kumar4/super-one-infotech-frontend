import React from "react";
// small change
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

const From = () => {
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChangeAccordion = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  // meaw meaw
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <h1>Advanced Search</h1>
      <Stack spacing={3} sx={{ width: 1000 }}>
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
              label="Any Keywords"
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

      {/* <MDInput
        type="text"
        label="Any Keywords"
        fullWidth
        placeholder="Any Keywords"
        margin="normal"
      />
      <MDInput
        type="text"
        label="All Keywords"
        fullWidth
        placeholder="All Keywords"
        margin="normal"
      />
      <MDInput
        type="text"
        label="Excluding Keywords"
        fullWidth
        placeholder="Excluding Keywords"
        margin="normal"
      /> */}
      {/* <div className="input">
        <MDInput
          type="integer"
          label="Experience (min)"
          halfWidth
          placeholder="min"
          margin="normal"
        /> */}
      {/* <span>To</span> */}
      {/* <MDInput type="integer" label="max" halfWidth placeholder="max" margin="normal" />
      </div> */}
      <div className="input">
        <p>Total Experience(in years)</p>
        <Autocomplete
          className="experience"
          sx={{ width: 300 }}
          defaultValue="min"
          options={["0", "1", "2", "3", "4", "5"]}
          renderInput={(params) => <MDInput {...params} variant="standard" />}
        />
        <Autocomplete
          className="experience"
          sx={{ width: 300 }}
          defaultValue="max"
          options={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
          renderInput={(params) => <MDInput {...params} variant="standard" />}
        />
      </div>
      <div className="input">
        <p>Annual Salary(LPA)</p>
        <Autocomplete
          className="experience"
          sx={{ width: 300 }}
          defaultValue="min"
          options={[
            "0",
            "1",
            "1.25",
            "1.5",
            "1.75",
            "2",
            "2.25",
            "2.5",
            "2.75",
            "3",
            "3.25",
            "3.5",
            "3.75",
            "4",
            "4.25",
            "4.5",
            "4.75",
            "5",
          ]}
          renderInput={(params) => <MDInput {...params} variant="standard" />}
        />
        <Autocomplete
          className="experience"
          sx={{ width: 300 }}
          defaultValue="max"
          options={[
            "1",
            "1.25",
            "1.5",
            "1.75",
            "2",
            "2.25",
            "2.5",
            "2.75",
            "3",
            "3.25",
            "3.5",
            "3.75",
            "4",
            "4.25",
            "4.5",
            "4.75",
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
      </div>
      <div className="location">
        <p>Current Location</p>
        <Autocomplete
          defaultValue="Type or select a location from the list"
          options={["New Delhi", "NCR", "Bangalore", "Mumbai", "Chennai", "Pune"]}
          renderInput={(params) => <MDInput {...params} variant="standard" />}
        />
      </div>
      {/* </div> */}
      {/* <div className="input">
        <MDInput
          type="integer"
          label="Annual Salary (min)"
          halfWidth
          placeholder="min"
          margin="normal"
        /> */}
      {/* <span>To</span> */}
      {/* <MDInput type="integer" label="max" halfWidth placeholder="max" margin="normal" />
      </div>
      <MDInput
        type="location"
        label="Current Location"
        fullWidth
        placeholder="Type or select location from list"
        margin="normal"
      />
      <Accordion expanded={expanded === "panel1"} onChange={handleChangeAccordion("panel1")}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Educational Details</Typography>
        </AccordionSummary>
        <h3>UG Qualifications</h3>
        <ToggleButtonGroup
          color="info"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="Any UG Qualifications">Any UG Qualifications</ToggleButton>
          <ToggleButton value="Specific UG Qualifications">Specific UG Qualifications</ToggleButton>
          <ToggleButton value="UG not necessary">UG not necessary</ToggleButton>
        </ToggleButtonGroup>
        <MDInput
          type="text"
          label="Institute Name"
          fullWidth
          placeholder="Institue name"
          margin="normal"
        />
        <div className="input">
          <MDInput
            type="integer"
            label="Year of graduation (From)"
            halfWidth
            placeholder="From"
            margin="normal"
          /> */}
      {/* <span>To</span> */}
      {/* <MDInput type="integer" label="To" halfWidth placeholder="To" margin="normal" />
        </div>
        <MDInput
          type="text"
          label="Education type"
          fullWidth
          placeholder="Type here or select"
          margin="normal"
        /> */}
      {/* <h3>PG Qualifications</h3>
        <ToggleButtonGroup
          color="info"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="Any PG Qualifications">Any PG Qualifications</ToggleButton>
          <ToggleButton value="Specific PG Qualifications">Specific PG Qualifications</ToggleButton>
          <ToggleButton value="PG not necessary">PG not necessary</ToggleButton>
        </ToggleButtonGroup>

        <MDInput
          type="text"
          label="Institute Name"
          fullWidth
          placeholder="Institue name"
          margin="normal"
        />
        <div className="input">
          <MDInput
            type="integer"
            label="Year of graduation (From)"
            halfWidth
            placeholder="From"
            margin="normal"
          /> */}
      {/* <span>To</span> */}
      {/* <MDInput type="integer" label="To" halfWidth placeholder="To" margin="normal" />
        </div>
        <MDInput
          type="text"
          label="Education type"
          fullWidth
          placeholder="Type here or select"
          margin="normal"
        /> */}
      <Accordion expanded={expanded === "panel1"} onChange={handleChangeAccordion("panel1")}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Educational Details</Typography>
        </AccordionSummary>
        <h3>UG Qualifications</h3>
        <ToggleButtonGroup
          color="info"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="Any UG Qualifications">Any UG Qualifications</ToggleButton>
          <ToggleButton value="Specific UG Qualifications">Specific UG Qualifications</ToggleButton>
          <ToggleButton value="UG not necessary">UG not necessary</ToggleButton>
        </ToggleButtonGroup>
        <MDInput
          type="text"
          label="Institute Name"
          fullWidth
          placeholder="Institue name"
          margin="normal"
        />
        <div className="input">
          <p>Year of Graduation</p>
          <Autocomplete
            defaultValue="From"
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
          {/* <span>To</span> */}
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
        </div>
        <div className="location">
          <p>Education Type</p>
          <Autocomplete
            defaultValue="Any"
            sx={{ width: 300 }}
            options={["Any", "Full Time", "Part Time", "Correspondence"]}
            renderInput={(params) => <MDInput {...params} variant="standard" />}
          />
        </div>
        <h3>PG Qualifications</h3>
        <ToggleButtonGroup
          color="info"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="Any PG Qualifications">Any PG Qualifications</ToggleButton>
          <ToggleButton value="Specific PG Qualifications">Specific PG Qualifications</ToggleButton>
          <ToggleButton value="PG not necessary">PG not necessary</ToggleButton>
        </ToggleButtonGroup>

        <MDInput
          type="text"
          label="Institute Name"
          fullWidth
          placeholder="Institue name"
          margin="normal"
        />
        <div className="input">
          <p>Year of Graduation</p>
          <Autocomplete
            defaultValue="From"
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
          {/* <span>To</span> */}
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
        </div>
        <div className="location">
          <p>Education Type</p>
          <Autocomplete
            defaultValue="Any"
            sx={{ width: 300 }}
            options={["Any", "Full Time", "Part Time", "Correspondence"]}
            renderInput={(params) => <MDInput {...params} variant="standard" />}
          />
        </div>
        <AccordionDetails>
          <Typography></Typography>
        </AccordionDetails>
      </Accordion>
      <AccordionDetails>
        <Typography></Typography>
      </AccordionDetails>

      <div>
        <Accordion expanded={expanded === "panel2"} onChange={handleChangeAccordion("panel2")}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Employment Details</Typography>
          </AccordionSummary>
          {/* <MDInput
            type="text"
            label="Functional Area"
            placeholder="Select Functional Area/Role(s) or start trying"
            fullWidth
            margin="normal"
          /> */}
          <Grid item xs={12} lg={5}>
            <MDBox mb={1.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" color="text" fontWeight="regular">
                Functional Area
              </MDTypography>
            </MDBox>
            <Autocomplete
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
          </Grid>
          <MDInput type="text" label="Industry" fullWidth margin="normal" />
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
          <MDInput
            type="text"
            label="Notice Period"
            placeholder="Type here if any"
            fullWidth
            margin="normal"
          />
          <AccordionDetails>
            <Typography></Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <Accordion expanded={expanded === "panel3"} onChange={handleChangeAccordion("panel3")}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Additional Details</Typography>
        </AccordionSummary>
        <MDInput
          type="text"
          label="Candidate Category"
          placeholder="Select Category"
          fullWidth
          margin="normal"
        />
        <FormGroup>
          <FormControlLabel control={<Switch />} label="Search Women Candidates Only" />
          <FormControlLabel
            control={<Switch />}
            label="Search Candidates with Special Abilities Only"
          />
        </FormGroup>
        {/* <MDInput type="text" label="Candidate Age (Min)" placeholder="Min" margin="normal" />
        <MDInput type="text" label="Candidate Age (Max)" placeholder="max" margin="normal" /> */}
        <span>
          <Grid item xs={12} lg={5}>
            <MDBox mb={1.5} lineHeight={0}>
              <MDTypography component="label" variant="button" color="text" fontWeight="regular">
                Candidate Age
              </MDTypography>
            </MDBox>
            <Autocomplete
              sx={{ width: 300 }}
              defaultValue="MIN"
              options={[
                "18years",
                "19years",
                "20years",
                "21years",
                "22years",
                "23years",
                "24years",
                "25years",
                "26years",
                "27years",
                "28years",
                "29years",
                "30years",
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
              >
                Candidate Age
              </MDTypography>
            </MDBox>
            <Autocomplete
              defaultValue="MAX"
              sx={{ width: 300 }}
              options={[
                "18years",
                "19years",
                "20years",
                "21years",
                "22years",
                "23years",
                "24years",
                "25years",
                "26years",
                "27years",
                "28years",
                "29years",
                "30years",
              ]}
              renderInput={(params) => <MDInput {...params} variant="standard" />}
            />
          </Grid>
        </span>
        {/* <MDInput type="text" label="Work Status for USA" fullWidth margin="normal" /> */}
        <Grid item xs={12} lg={5}>
          <MDBox mb={1.5} lineHeight={0} display="inline-block">
            <MDTypography component="label" variant="button" color="text" fontWeight="regular">
              Work Status for USA
            </MDTypography>
          </MDBox>
          <Autocomplete
            defaultValue="Select"
            options={["yes eligible", "not eligible"]}
            renderInput={(params) => <MDInput {...params} variant="standard" />}
          />
        </Grid>
        <MDInput
          type="text"
          label="Work Permit for"
          placeholder="Enter Country"
          fullWidth
          margin="normal"
        />
        <AccordionDetails>
          <Typography></Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "panel4"} onChange={handleChangeAccordion("panel4")}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Display Details</Typography>
        </AccordionSummary>
        <p>Show only candidate with</p>
        <FormGroup>
          <FormControlLabel control={<Switch />} label="Verified mobile number" />
          <FormControlLabel control={<Switch />} label="Verified email ID" />
          <FormControlLabel control={<Switch />} label="Attached Resume" />
        </FormGroup>
        <div>
          Show Candidate Seeking
          <break />
          <MDInput type="text" label="Job Type" margin="normal" />
          <MDInput type="text" label="Emplyement Type" margin="normal" />
          <FormGroup>
            <FormControlLabel control={<Switch />} label="Search only Premium Resumes" />
            <FormControlLabel control={<Switch />} label="Search only Featured Candidates" />
            <FormControlLabel
              control={<Switch />}
              label="Search Only those candidates that can be contacted by SMS"
            />
          </FormGroup>
        </div>
        <Grid item xs={12} lg={5}>
          <MDBox mb={1.5} lineHeight={0} display="inline-block">
            <MDTypography component="label" variant="button" color="text" fontWeight="regular">
              Resume per page
            </MDTypography>
          </MDBox>
          <Autocomplete
            sx={{ width: 300 }}
            defaultValue="SELECT"
            options={["1", "2", "3", "3", "4", "5"]}
            renderInput={(params) => <MDInput {...params} variant="standard" />}
          />
        </Grid>
        <MDInput type="text" label="Sort By" placeholder="Relevance" fullWidth margin="normal" />
        <p>Semantic Search</p>
        <FormGroup>
          <FormControlLabel control={<Switch />} label="ON" />
        </FormGroup>
        <AccordionDetails>
          <Typography></Typography>
        </AccordionDetails>
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
export default From;
