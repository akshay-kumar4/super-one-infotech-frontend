/**
=========================================================
* Material Dashboard 2 PRO React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-routers components
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import SchoolIcon from "@mui/icons-material/School";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
// import { Grid, Container } from "@mui/material";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import MDButton from "components/MDButton";
import Popup from "one-infotech/form/Popup";

// React tostify component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { Grid } from "@mui/material";

const style = {
  position: "absolute as absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ProfileInfoCard({
  name,
  jobTitle,
  phone,
  info,
  data,
  email,
  skills,
  location,
  education,
  shadow,
}) {
  const notifyOnFail = () => {
    toast.error("Resume Not Found !!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      // progress: undefined,
      style: {
        background: "#333",
        color: "#fff",
        fontSize: "18px",
        padding: "15px",
        // borderRadius: "13px",
        boxShadow: "0px 0px rgb(0,0,0)",
      },
    });
  };

  const handleDownload = () => {
    // setOpen(true);
    if (!data.resume_permanent_link) {
      notifyOnFail();
      return; // Don't proceed if resume link is not defined or null
    }

    // Now you can proceed with the Axios request and opening a new tab
    axios
      .get(
        "https://resume-api-6u3t4.ondigitalocean.app/file-uploading/?file_link=" +
          data.resume_permanent_link,
        {
          headers: {
            Authorization: "Token e06ac2eca287fc7136dceb7780bdee299a23a6d6",
          },
        }
      )
      .then((x) => {
        console.log(x.data.public_file_link);
        window.open(x.data.public_file_link);
      })
      .catch((error) => {
        console.log(error);
        notifyOnFail();
      });
  };
  const firstEmail = email.split(/[,/]/)[0];
  // Split the location string by ","
  const locationParts = location.split(/[,\s/]/);

  // Extract the first location (index 0)
  const firstLocation = locationParts[0];

  // Extract the second location (index 1) if it exists, or an empty string if it doesn't
  const secondLocation = locationParts[1] ? locationParts[1].trim() : "";

  // Combine the first and second locations without the "india" part
  const formattedLocation = secondLocation
    ? `${firstLocation.trim()} ${secondLocation}`
    : firstLocation.trim();

  skills = skills || "";
  const [maxSkillsCharactersToShow, setMaxSkillsCharactersToShow] = useState(40);
  const [maxEducationCharactersToShow, setMaxEducationCharactersToShow] = useState(35);
  const trimmedSkills = skills.trim();
  // let maxSkillsCharactersToShow = 50;
  let displayedSkills = trimmedSkills.slice(0, maxSkillsCharactersToShow);
  const moreSkills = trimmedSkills.length > maxSkillsCharactersToShow;

  // Update maxSkillsCharactersToShow based on window.innerWidth
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 850 && width <= 1100) {
        setMaxSkillsCharactersToShow(28);
        setMaxEducationCharactersToShow(25); // Set max characters to 10 for both skills and education
      } else {
        setMaxSkillsCharactersToShow(40); // Default value for other screen widths
        setMaxEducationCharactersToShow(35); // Default value for other screen widths
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call the handler once to set the initial value
    handleResize();

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  education = education || "";

  // Trim any leading or trailing whitespace from the skills and education strings
  const trimmedEducation = education.trim();

  // // Define the maximum number of characters to display
  // let maxEducationCharactersToShow = 58;

  // Get the first 40 characters of the skills and education strings
  let displayedEducation = trimmedEducation.slice(0, maxEducationCharactersToShow);

  // Check if there are more characters to display for skills and education
  const moreEducation = trimmedEducation.length > maxEducationCharactersToShow;

  if (!phone) {
    return null; // You can also render a message or handle this case differently
  }
  // Check if the jobTitle prop is provided and not null/undefined
  if (!jobTitle) {
    return null; // You can also render a message or handle this case differently
  }
  // Split the phone prop using a regular expression to match "," or "/"
  // const phoneNumbers = phone.split(/[ ,/]+/);
  // const phoneNumbers = phone.split(/[,/]/);
  const phoneNumbers = phone.split(/[,/]+/);
  // Trim any leading or trailing whitespace from each phone number
  const trimmedPhoneNumbers = phoneNumbers.map((number) => number.trim().slice(0, 17));
  // Split the jobTitle prop using a regular expression to match "," or "/"
  const jobTitles = jobTitle.split(/[,/]/);
  // Trim any leading or trailing whitespace from each job title
  const trimmedJobTitles = jobTitles.map((title) => title.trim());
  // Extract the first phone number (index 0)
  const firstPhoneNumber = trimmedPhoneNumbers[0];
  // Extract the first job title (index 0)
  const firstJobTitle = trimmedJobTitles[0];

  return (
    <MDBox>
      {/* <Grid component>
        <Grid item> */}
      <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
        <MDBox
          display="flex"
          // justifyContent="space-between"
          alignItems="center"
          pt={2}
          px={2}
          wrap="wrap"
          // sx={{ border: "2px solid green" }}
        >
          <MDTypography variant="h5" fontWeight="medium" textTransform="capitalize">
            <Icon>
              <PersonIcon sx={{ marginTop: "-5px" }} />
            </Icon>
          </MDTypography>
          <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            &nbsp; &nbsp;
            {name}
          </MDTypography>
        </MDBox>
        <MDBox>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            // spacing={0}
            // padding={0}
            // columns={12}
            sx={{ marginTop: "5px", height: "62px" }}
            wrap="wrap"
          >
            <Grid item sx={{ margin: "3px" }}>
              <MDTypography variant="h6" fontWeight="light" textTransform="capitalize">
                <Icon>
                  <PhoneIcon sx={{ marginTop: "-5px" }} />
                </Icon>
                &nbsp;
                {firstPhoneNumber}
              </MDTypography>
            </Grid>
            <Grid item sx={{ margin: "5px" }}>
              <MDTypography variant="h6" fontWeight="light" textTransform="capitalize">
                <Icon>
                  <MailIcon sx={{ marginTop: "-5px" }} />
                </Icon>
                &nbsp;
                {firstEmail}
              </MDTypography>
            </Grid>
            {formattedLocation != "NULL" ? (
              <Grid item sx={{ margin: "5px" }}>
                <MDTypography variant="h6" fontWeight="light" textTransform="capitalize">
                  <Icon>
                    <PlaceIcon sx={{ marginTop: "-5px" }} />
                  </Icon>
                  &nbsp;
                  {formattedLocation}
                </MDTypography>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
        </MDBox>
        <MDBox opacity={1}>
          <Divider sx={{ marginBottom: "3px", marginTop: "3px" }} />
        </MDBox>
        <MDBox p={1}>
          <MDBox mb={2} lineHeight={2}>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              columns={8}
              // sx={{ border: "2px solid red" }}
            >
              <Grid item xs={0.3}>
                <Icon>
                  <WorkOutlineIcon sx={{ marginTop: "-12px" }} />
                </Icon>
              </Grid>
              <Grid item xs={7} sx={{ marginTop: "3px" }}>
                <MDTypography variant="h6" fontWeight="regular" textTransform="capitalize">
                  {/* &nbsp; &nbsp; */}
                  {firstJobTitle}
                </MDTypography>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox mb={2} lineHeight={2}>
            <Grid container direction="row" justifyContent="space-evenly" columns={8}>
              <Grid item xs={0.3}>
                <Icon>
                  <SchoolIcon sx={{ marginTop: "-12px" }} />
                </Icon>
              </Grid>
              <Grid item xs={7} sx={{ marginTop: "3px" }}>
                <MDTypography variant="h6" fontWeight="regular" textTransform="capitalize">
                  {/* &nbsp; &nbsp; */}
                  {displayedEducation}
                  {moreEducation && (
                    <MDTypography sx={{ display: "inline-flex" }} variant="h6" fontWeight="light">
                      ...
                    </MDTypography>
                  )}
                </MDTypography>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox mb={2} lineHeight={0}>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              columns={8}
              // sx={{ border: "2px solid black" }}
            >
              <Grid item xs={0.3}>
                <Icon>
                  <MilitaryTechIcon sx={{ marginTop: "-5px" }} />
                </Icon>
              </Grid>
              <Grid item xs={7} sx={{ height: "30px" }}>
                <MDTypography variant="h6" fontWeight="regular" textTransform="capitalize">
                  {/* &nbsp; &nbsp; */}
                  {displayedSkills}
                  {moreSkills && (
                    <MDTypography sx={{ display: "inline-flex" }} variant="h6" fontWeight="light">
                      ...
                    </MDTypography>
                  )}
                </MDTypography>
                {/* <MDTypography
                  variant="h6"
                  fontWeight="regular"
                  textTransform="capitalize"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {displayedSkills}
                  {moreSkills && (
                    <MDTypography sx={{ display: "inline-flex" }} variant="h6" fontWeight="light">
                      ...
                    </MDTypography>
                  )}
                </MDTypography> */}
              </Grid>
            </Grid>
          </MDBox>
          <MDBox>
            <Divider sx={{ marginBottom: "7px", marginTop: "3px" }} />
          </MDBox>
          <MDBox marginTop={2} mb={1}>
            <MDButton color="dark" onClick={handleDownload}>
              Download Resume
            </MDButton>
            <ToastContainer />
          </MDBox>
        </MDBox>
      </Card>
      {/* </Grid>
      </Grid> */}
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            </Box>
          </Modal> */}
      {/* </Grid>
      </Grid> */}
    </MDBox>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  name: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  info: PropTypes.string,
  shadow: PropTypes.bool,
  phone: PropTypes.string.isRequired,
  skills: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  education: PropTypes.string.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    job_titles: PropTypes.string,
    email: PropTypes.string,
    education: PropTypes.string,
    skills: PropTypes.string,
    experience_level: PropTypes.string,
    company_names: PropTypes.string,
    phone: PropTypes.string,
    resume_permanent_link: PropTypes.string,
  }).isRequired,
};

export default ProfileInfoCard;
