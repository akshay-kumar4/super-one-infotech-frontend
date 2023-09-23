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
import { useSelector } from "react-redux";
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
  const getUser = useSelector((state) => state.user);

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
        Authorization: `Token ${getUser.token}`,
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
        {/* <Autocomplete
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
        /> */}
        <Typography sx={{ marginInline: "1.5em" }} fontSize={16}>
          INR
        </Typography>
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
          options={[
            "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chhattisgarh",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttar Pradesh",
            "Uttarakhand",
            "West Bengal",
            "Andaman and Nicobar Islands",
            "Chandigarh",
            "Dadra and Nagar Haveli and Daman and Diu",
            "Lakshadweep",
            "Delhi",
            "Puducherry",
            "Ladakh",
            "Jammu and Kashmir",
          ]}
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
      {/* <MDInput
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
      /> */}
      <Autocomplete
        freeSolo
        id="tags-standard"
        sx={{ marginTop: "10px" }}
        options={CourseKeywords.map((x) => x.title)}
        // getOptionLabel={(option) => option.title}
        // defaultValue={[top18Keywords[13]]}
        onChange={(e, val) => {
          setAdvancedSearchData({
            ...advancedSearchData,
            education: val,
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Education"
            placeholder="Education Details"
          />
        )}
      />
      <Autocomplete
        multiple
        freeSolo
        sx={{ marginTop: "10px" }}
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
  { title: "Erection" },
  { title: "Commissioning" },
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
  { title: "FEA" },
  { title: "FMEA" },
  { title: "Abacus" },
  { title: "Ansys" },
  { title: "Dyna" },
  { title: "Environment" },
  { title: "Safety" },
  { title: "Health" },
  { title: "Energy" },
  { title: "Fire" },
  { title: "Safety Audits" },
  { title: "OHSAS" },
  { title: "Sustainability" },
  { title: "Recycling" },
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
  "Apple",
  "Facebook",
  "Tesla",
  "IBM",
  "Oracle",
  "Adobe",
  "Spotify",
  "Snap Inc.",
  "Zoom",
  "Salesforce",
  "Slack",
  "NVIDIA",
  "Intel",
  "AMD",
  "Cisco",
  "Samsung",
  "Sony",
  "LG",
  "Toshiba",
  "Panasonic",
  "Unilever",
  "Procter & Gamble",
  "Nestle",
  "PepsiCo",
  "Coca-Cola",
  "Johnson & Johnson",
  "Pfizer",
  "Roche",
  "Novartis",
  "Merck",
  "HSBC",
  "JPMorgan Chase",
  "Goldman Sachs",
  "Morgan Stanley",
  "Bank of America",
  "Wells Fargo",
  "Citigroup",
  "Volkswagen",
  "Toyota",
  "General Motors",
  "Ford",
  "Honda",
  "BMW",
  "Airbus",
  "Boeing",
  "GE",
  "Siemens",
  "3M",
  "Chevron",
  "ExxonMobil",
  "Shell",
  "BP",
  "Total",
  "Walmart",
  "Costco",
  "Nike",
  "Adidas",
  "McDonald's",
  "Starbucks",
  "KFC",
  "Dell",
  "HP",
  "Accenture",
  "Capgemini",
  "Tata Consultancy Services",
  "Infosys",
  "Wipro",
  "Lockheed Martin",
  "Raytheon",
  "Northrop Grumman",
  "Disney",
  "Warner Bros.",
  "Universal Pictures",
  "Comcast",
  "Verizon",
  "AT&T",
  "Vodafone",
  "Huawei",
  "ZTE",
  "Xiaomi",
  "Oppo",
  "Vivo",
  "FedEx",
  "DHL",
  "UPS",
  "Maersk",
  "Cargill",
  "Koch Industries",
  "Bechtel",
  "ABB",
  "Schneider Electric",
  "Philips",
  "Canon",
  "Hitachi",
  "Bosch",
  "L'Oreal",
  "Estee Lauder",
  "Revlon",
  "Colgate-Palmolive",
  "Kimberly-Clark",
  "Reckitt Benckiser",
  "Henkel",
  "GlaxoSmithKline",
  "Sanofi",
  "Bayer",
  "AstraZeneca",
  "Abbott Laboratories",
  "Eli Lilly",
  "Bristol-Myers Squibb",
  "Novo Nordisk",
  "Biogen",
  "Regeneron Pharmaceuticals",
  "Gilead Sciences",
  "Amgen",
  "Genentech",
  "Moderna",
  "AIG",
  "Allianz",
  "AXA",
  "MetLife",
  "Prudential Financial",
  "Zurich Insurance Group",
  "Munich Re",
  "Swiss Re",
  "Manulife",
  "Sun Life Financial",
  "Aviva",
  "Legal & General",
  "Standard Life Aberdeen",
  "NN Group",
  "Phoenix Group Holdings",
  "China Life Insurance",
  "Ping An Insurance",
  "AIA Group",
  "Samsung Life Insurance",
  "Tokio Marine",
  "Nippon Life",
  "Dai-ichi Life",
  "T&D Holdings",
  "Sompo Holdings",
  "MS&AD Insurance",
  "QBE Insurance",
  "Suncorp Group",
  "IAG",
  "Allstate",
  "Travelers",
  "Chubb",
  "Progressive",
  "Liberty Mutual",
  "USAA",
  "Hartford Financial Services",
  "Nationwide",
  "Farmers Insurance Group",
  "American Family Insurance",
  "Erie Insurance Group",
  "Auto-Owners Insurance",
  "State Farm",
  "Geico",
  "Berkshire Hathaway",
  "General Electric",
  "Honeywell",
  "Danaher",
  "Emerson Electric",
  "Mitsubishi Electric",
  "Thermo Fisher Scientific",
  "Johnson Controls",
];

const CourseKeywords = [
  { title: "Ph.D/Doctorate" },
  { title: "MPHIL (Masters of Philosophy)" },
  { title: "MBA/PGDM (Master of Business Administration)" },
  { title: "M.Tech (Masters Of Technology)" },
  { title: "M.S (Master of Science)" },
  { title: "MCA (Master of Computer Application)" },
  { title: "M.Com (Master of Commerce)" },
  { title: "PG (Diploma Postgraduate)" },
  { title: "M.A (Aaster of Arts)" },
  { title: "CA (Chartered Accountant)" },
  { title: "ICWA CMA (Institute of Cost and Works Accountants of India)" },
  { title: "M.Arch (Masters Of Architecture)" },
  { title: "M.Ch (Master Of Chirurgiae)" },
  { title: "M.Des (Master of Design)" },
  { title: "M.Ed (Master of Education)" },
  { title: "M.Pharma (Masters of Pharmacy)" },
  { title: "MCM (Masters Of Computer Management)" },
  { title: "MDS (Master Of Dental Surgery)" },
  { title: "MFA (Masters Of Fine Arts)" },
  { title: "MVSC (Masters Of Veterinary Science)" },
  { title: "B.Tech (Bachelor Of Technology)" },
  { title: "B.Com (Bachelor Of Commerce)" },
  { title: "B.Sc (Bachelor Of Science)" },
  { title: "B.A (Bachelor Of Arts)" },
  { title: "B.Arch (Bachelor of Architecture)" },
  { title: "B.B.A/B.M.S (Bachelor of Business Administration)" },
  { title: "B.Des (Bachelor of Design)" },
  { title: "B.Ed (Bachelor of Education)" },
  { title: "B.EI.ED (Bachelor of Elementary Education)" },
  { title: "B.P.ED (Bachelor of Physical Education)" },
  { title: "B.Pharma (Bachelor of Pharmacy)" },
  { title: "B.U.M.S (Bachelor of Unani Medicine & Surgery)" },
  { title: "BAMS (Bachelor of Ayurvedic Medicine and Surgery)" },
  { title: "BCA (Bachelor of Computer Application)" },
  { title: "BDS (Bachelor of Dental Surgery)" },
  { title: "BFA (Bachelor of Fine Arts)" },
  { title: "BHM (Bachelor of Hotel Management)" },
  { title: "BHMCT (Bachelor of Hotel Management and Catering Technology)" },
  { title: "BHMS (Bachelor of Homeopathic Medicine and Surgery)" },
  { title: "BVSC (Bachelor of Veterinary Science,)" },
  { title: "LLB (Bachelor of Laws)" },
  { title: "MBBS (Bachelor of Medicine and Bachelor of Surgery)" },
];

export default Search;
