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
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Card } from "@mui/material";
import DefaultPricingCard from "examples/Cards/PricingCards/DefaultPricingCard";

const Popup = (props) => {
  if (!props.isOpen) return null;

  return <></>;
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
