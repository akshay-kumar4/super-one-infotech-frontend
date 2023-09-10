import React from "react";
import PropTypes from "prop-types";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import LinkIcon from "@mui/icons-material/Link";
import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EngineeringIcon from "@mui/icons-material/Engineering";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

const Popup = (props) => {
  if (!props.isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: "23%",
        // top: "4%",
        zIndex: "100",
      }}
    >
      <MDBox
        sx={{
          backgroundColor: "#c9d1df",
          margin: "100px",
          borderRadius: "13px",
          width: "850px",
          display: "flex",
          padding: "20px",
          flexDirection: "column",
          boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.6)",
        }}
      >
        <MDTypography sx={{ justifyContent: "center" }}>
          {" "}
          <h1>{props.data.name}</h1>
        </MDTypography>
        <MDTypography sx={{ display: "inline-flex", marginTop: "15px" }}>
          {" "}
          <WorkOutlineIcon fontSize="large" style={{ width: "100px" }} />
          &nbsp;
          <h5>{props.data.job_titles}</h5>
        </MDTypography>
        <MDTypography sx={{ display: "inline-flex", marginTop: "15px" }}>
          {" "}
          <MailIcon fontSize="large" style={{ width: "100px" }} /> &nbsp;
          <h5>{props.data.email}</h5>
        </MDTypography>
        <MDTypography sx={{ display: "inline-flex", marginTop: "15px" }}>
          {" "}
          <PhoneIcon fontSize="large" style={{ width: "100px" }} />
          &nbsp;
          <h5 style={{ display: "flex", alignSelf: "center" }}>{props.data.phone}</h5>
        </MDTypography>
        <MDTypography sx={{ display: "inline-flex", marginTop: "15px" }}>
          {" "}
          <MilitaryTechIcon fontSize="large" style={{ width: "100px" }} />
          &nbsp;
          <h5 style={{ display: "flex", alignSelf: "center" }}>{props.data.experience_level}</h5>
        </MDTypography>
        <MDTypography sx={{ display: "inline-flex", marginTop: "15px" }}>
          {" "}
          <EngineeringIcon fontSize="large" style={{ width: "100px" }} /> &nbsp;
          <h5 style={{ display: "flex", alignSelf: "center" }}>{props.data.skills}</h5>
        </MDTypography>
        <MDTypography sx={{ display: "inline-flex", marginTop: "15px" }}>
          {" "}
          <BusinessIcon fontSize="large" style={{ width: "100px" }} /> &nbsp;
          <h5 style={{ display: "flex", alignSelf: "center" }}>{props.data.company_names}</h5>
        </MDTypography>
        <MDTypography sx={{ display: "inline-flex", marginTop: "15px" }}>
          {" "}
          <SchoolIcon fontSize="large" style={{ width: "100px" }} />
          &nbsp;
          <h5 style={{ display: "flex", alignSelf: "center" }}>{props.data.education}</h5>
        </MDTypography>
        <MDTypography sx={{ display: "inline-flex", marginBottom: "8px", marginTop: "8px" }}>
          {" "}
          <LinkIcon fontSize="large" style={{ width: "100px" }} />
          <a href={props.data.resume_permanent_link} target="/">
            {props.data.resume_permanent_link}
          </a>
        </MDTypography>
        <MDBox sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <button
            style={{
              height: "40px",
              backgroundColor: "white",
              border: "none",
              width: "200px",
              fontSize: "large",
              color: "balck",
              borderRadius: "10px",
              margin: "10px",
            }}
            onClick={props.onClose}
          >
            close
          </button>
        </MDBox>
      </MDBox>
    </div>
  );
};
Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    job_titles: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    education: PropTypes.string.isRequired,
    skills: PropTypes.string.isRequired,
    experience_level: PropTypes.string.isRequired,
    company_names: PropTypes.string.isRequired,
    phone: PropTypes.number.isRequired,
    resume_permanent_link: PropTypes.string.isRequired,
  }).isRequired,
};

export default Popup;
