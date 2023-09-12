import React, { useState } from "react";

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
import DashboardNavbar from "../components/DashboardNavbar/index";
// import Footer from "examples/Footer";
// import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
// import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
// import MDTypography from "components/MDTypography";
// import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  padding: "10px 15px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
};

// const inputStyles = {
//   border: "1px solid #ccc",
//   borderRadius: "4px",
//   padding: "10px",
//   fontSize: "16px",
// };

const Search = () => {
  const [alignment, setAlignment] = useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [expanded, setExpanded] = useState("panel1");

  const handleChangeAccordion = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [advancedSearchData, setAdvancedSearchData] = useState({
    anyKeys: [],
    allKeys: [],
    excludingKeys: [],
    expMin: null,
    expMax: null,
    currency: null,
    salMinLac: null,
    salMaxLac: null,
    location: null,
    education: null,
    skills: [],
    employers: [],
    excludeEmployers: [],
    designation: [],
  });

  const [file, setFile] = useState(null);

  const notifyOnResolve = () => toast.success("file upload successful");
  const notifyOnReject = () => toast.error("Failed to upload");
  const notifyOnPending = () => toast.info("File uploading");

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      for (const f of file) {
        // console.log(f);
        formData.append("file", f);
      }
      // console.log(formData);

      const headers = {
        Authorization: "Token e06ac2eca287fc7136dceb7780bdee299a23a6d6",
      };

      // Display the 'File uploading' message
      notifyOnPending();

      axios
        .post("https://resume-api-6u3t4.ondigitalocean.app/file-uploading/", formData, { headers })
        .then((response) => {
          // Handle success
          notifyOnResolve();
          console.log("File uploaded successfully", response.data);
        })
        .catch((error) => {
          // Handle error
          notifyOnReject();
          console.error("Error uploading file", error);
        });
    } else {
      // Handle no file selected error
      console.error("No file selected");
    }
  };

  function handleChangeData(event) {
    setAdvancedSearchData((prevAdvancedSearchData) => {
      return {
        ...prevAdvancedSearchData,
        [event.target.name]: event.target.value,
      };
    });
  }

  const navigate = useNavigate();
  const goToFilteredResumePage = () => {
    let params = {};

    if (advancedSearchData.anyKeys) {
      params.any_keywords = advancedSearchData.anyKeys;
    }
    if (advancedSearchData.allKeys) {
      params.all_keywords = advancedSearchData.allKeys;
    }
    if (advancedSearchData.excludingKeys) {
      params.exclude_keywords = advancedSearchData.excludingKeys;
    }
    if (advancedSearchData.location) {
      params.location = advancedSearchData.location;
    }
    if (advancedSearchData.employers) {
      params.employers = advancedSearchData.employers;
    }
    if (advancedSearchData.excludeEmployers) {
      params.exclude_employers = advancedSearchData.excludeEmployers;
    }
    if (advancedSearchData.designation) {
      params.designation = advancedSearchData.designation;
    }
    if (advancedSearchData.expMin && advancedSearchData.expMax) {
      params.experience_level = advancedSearchData.expMax - advancedSearchData.expMin;
    }
    // if (displayDetails.attachedResume) {
    //   params.attached_resume = "true";
    // }
    if (advancedSearchData.expMin) {
      params.expMin = advancedSearchData.expMin;
    }
    if (advancedSearchData.expMax) {
      params.expMax = advancedSearchData.expMax;
    }
    if (advancedSearchData.salMinLac) {
      params.salMinLac = Number(advancedSearchData.salMinLac) * 100000;
    }
    if (advancedSearchData.salMaxLac) {
      params.salMaxLac = Number(advancedSearchData.salMaxLac) * 100000;
    }
    if (advancedSearchData.education) {
      params.education = advancedSearchData.education;
    }
    if (advancedSearchData.skills) {
      params.skills = advancedSearchData.skills;
    }

    // console.log(params);

    navigate({
      pathname: "/filter-resume-details",
      search: createSearchParams(params).toString(),
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <MDBox
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <h2>Advanced Search</h2>
        <MDBox>
          <input type="file" onChange={handleFileChange} />
          <button style={buttonStyles} onClick={handleUpload}>
            Upload Resume
          </button>{" "}
          <ToastContainer />
        </MDBox>
      </MDBox> */}

      <Stack spacing={3} sx={{ width: 1000 }}>
        <Autocomplete
          multiple
          freeSolo
          id="tags-standard"
          options={top18Keywords.map((x) => x.title)}
          // getOptionLabel={(option) => option.title}
          // defaultValue={[top18Keywords[13]]}
          onChange={(e, val) => {
            setAdvancedSearchData({
              ...advancedSearchData,
              anyKeys: val,
            });
          }}
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
          options={top18Keywords.map((x) => x.title)}
          // getOptionLabel={(option) => option.title}
          // defaultValue={[top18Keywords[13]]}
          onChange={(e, val) => {
            setAdvancedSearchData({
              ...advancedSearchData,
              allKeys: val,
            });
          }}
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
          options={top18Keywords.map((x) => x.title)}
          // getOptionLabel={(option) => option.title}
          // defaultValue={[top18Keywords[13]]}
          onChange={(e, val) => {
            setAdvancedSearchData({
              ...advancedSearchData,
              excludingKeys: val,
            });
          }}
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
        <Typography fontSize={16}>Total Experience:</Typography>
        <MDBox sx={{ display: "flex" }}>
          <Autocomplete
            className="experience"
            sx={{ width: 300, marginRight: "20px", marginLeft: "20px" }}
            // defaultValue="min"
            options={Array.from({ length: 31 }, (_, i) => String(i))}
            renderInput={(params) => <MDInput {...params} variant="standard" placeholder="From" />}
            onChange={(e, val) => {
              setAdvancedSearchData({
                ...advancedSearchData,
                expMin: val,
              });
            }}
            value={advancedSearchData.expMin}
            name="expMin"
          />
          <Typography fontSize={16}>To</Typography>
          <Autocomplete
            className="experience"
            sx={{ width: 300, marginRight: "20px", marginLeft: "20px" }}
            // defaultValue="max"
            placeholder="Max"
            options={Array.from({ length: 31 }, (_, i) => String(i))}
            renderInput={(params) => <MDInput {...params} variant="standard" />}
            onChange={(e, val) => {
              setAdvancedSearchData({
                ...advancedSearchData,
                expMax: val,
              });
            }}
            value={advancedSearchData.expMax}
            name="expMax"
          />
          <Typography fontSize={16}>in Years</Typography>
        </MDBox>
      </MDBox>
      <MDBox className="input" sx={{ display: "flex", marginTop: "20px", marginBottom: "20px" }}>
        <Typography fontSize={16}>Annual Salary:</Typography>
        <Autocomplete
          className="experience"
          sx={{ width: 80, marginLeft: "20px" }}
          // defaultValue="₹"
          options={["IND", "USD"]}
          onChange={(e, val) => {
            setAdvancedSearchData({
              ...advancedSearchData,
              currency: val,
            });
          }}
          renderInput={(params) => <MDInput {...params} variant="standard" />}
        />
        <MDBox sx={{ display: "flex" }}>
          <Autocomplete
            className="experience"
            sx={{ width: 100, marginRight: "20px", marginLeft: "20px" }}
            // defaultValue="0"

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
            renderInput={(params) => <MDInput {...params} variant="standard" placeholder="Lacs" />}
            onChange={(e, val) => {
              setAdvancedSearchData({
                ...advancedSearchData,
                salMinLac: val,
              });
            }}
            // value={advancedSearchData.salMinLac}
            name="salMinLac"
          />
          {/* <Autocomplete
            className="experience"
            sx={{ width: 200, marginRight: "20px" }}
            // defaultValue="Thousand"

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
            renderInput={(params) => (
              <MDInput {...params} variant="standard" placeholder="Thousand" />
            )}
            onChange={(e, val) => {
              setAdvancedSearchData({
                ...advancedSearchData,
                salMinTh: val,
              });
            }}
            // value={advancedSearchData.salMinTh}
            name="salMinTh"
          /> */}
          <Typography fontSize={16}>To</Typography>
          <Autocomplete
            className="experience"
            sx={{ width: 100, marginRight: "20px", marginLeft: "20px" }}
            // defaultValue="Lacs"

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
            renderInput={(params) => <MDInput {...params} variant="standard" placeholder="Lacs" />}
            onChange={(e, val) => {
              setAdvancedSearchData({
                ...advancedSearchData,
                salMaxLac: val,
              });
            }}
            // value={advancedSearchData.salMaxLac}
            name="salMaxLac"
          />
          {/* <Autocomplete
            className="experience"
            sx={{ width: 200 }}
            // defaultValue="Thousand"

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
            renderInput={(params) => (
              <MDInput {...params} variant="standard" placeholder="Thousand" />
            )}
            onChange={(e, val) => {
              setAdvancedSearchData({
                ...advancedSearchData,
                salMaxTh: val,
              });
            }}
            // value={advancedSearchData.salMaxTh}
            name="salMaxTh"
          /> */}
        </MDBox>
      </MDBox>
      <MDBox className="location" display="flex">
        <Typography fontSize={16}>Current Location:</Typography>
        <Autocomplete
          options={["New Delhi", "NCR", "Bangalore", "Mumbai", "Chennai", "Pune"]}
          renderInput={(params) => (
            <MDInput
              {...params}
              variant="standard"
              placeholder="Type or select a location from the list"
            />
          )}
          sx={{ width: 500, marginLeft: "20px" }}
          onChange={(e, val) => {
            setAdvancedSearchData({
              ...advancedSearchData,
              location: val,
            });
          }}
          // value={advancedSearchData.location}
          name="location"
        />
      </MDBox>
      <MDInput
        type="text"
        label="Education"
        placeholder="Education Details"
        fullWidth
        variant="standard"
        margin="normal"
        onChange={(e) => {
          setAdvancedSearchData({
            ...advancedSearchData,
            education: e.target.value,
          });
        }}
      />
      <Autocomplete
        multiple
        freeSolo
        id="tags-standard"
        options={top18Keywords.map((x) => x.title)}
        // getOptionLabel={(option) => option.title}
        // defaultValue={[top18Keywords[13]]}
        onChange={(e, val) => {
          setAdvancedSearchData({
            ...advancedSearchData,
            skills: val,
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Skills"
            placeholder="Enter your Skills"
          />
        )}
      />
      <Autocomplete
        className="noShowOption"
        sx={{ marginTop: "10px" }}
        multiple
        freeSolo
        id="tags-standard"
        options={employerList}
        // getOptionLabel={(option) => option.title}
        // defaultValue={[top18Keywords[13]]}
        onChange={(e, val) => {
          setAdvancedSearchData({
            ...advancedSearchData,
            employers: val,
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Employers"
            placeholder="Enter previous employers"
          />
        )}
      />
      <Autocomplete
        className="noShowOption"
        sx={{ marginTop: "10px" }}
        multiple
        freeSolo
        id="tags-standard"
        options={employerList}
        // getOptionLabel={(option) => option.title}
        // defaultValue={[top18Keywords[13]]}
        onChange={(e, val) => {
          setAdvancedSearchData({
            ...advancedSearchData,
            excludeEmployers: val,
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Exclude Employers"
            placeholder="Enter previous employers to exclude"
          />
        )}
      />
      <Autocomplete
        className="noShowOption"
        sx={{ marginTop: "10px" }}
        multiple
        freeSolo
        id="tags-standard"
        options={top18Keywords.map((x) => x.title)}
        // getOptionLabel={(option) => option.title}
        // defaultValue={[top18Keywords[13]]}
        onChange={(e, val) => {
          setAdvancedSearchData({
            ...advancedSearchData,
            designation: val,
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Designation"
            placeholder="Enter designation to search for"
          />
        )}
      />

      <MDButton
        type="submit"
        color="primary"
        sx={{ width: 300, marginTop: "20px" }}
        onClick={goToFilteredResumePage}
      >
        Submit
      </MDButton>
      {/* </Link> */}
    </DashboardLayout>
  );
};
const top18Keywords = [
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

const employerList = [
  "Microsoft",
  "Amazon",
  "Netflix",
  "Google",
  "AirBnB",
  "Uber",
  "Meta",
  "Instagram",
  "X/Twitter",
];

export default Search;
