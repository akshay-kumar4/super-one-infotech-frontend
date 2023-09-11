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
import { useState } from "react";

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
// import { Grid, Container } from "@mui/material";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import MDButton from "components/MDButton";
import Popup from "one-infotech/form/Popup";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { toast } from "react-toastify";

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

function ProfileInfoCard({ name, jobTitle, phone, info, data, email, shadow }) {
  // const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleDownload = () => {
    // setOpen(true);

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
        // console.log(x.data.public_file_link);
        window.open(x.data.public_file_link);
      })
      .catch(() => toast.error("Resume Not available"));
  };
  const handleClose = () => setOpen(false);
  if (!phone) {
    return null; // You can also render a message or handle this case differently
  }

  // Check if the jobTitle prop is provided and not null/undefined
  if (!jobTitle) {
    return null; // You can also render a message or handle this case differently
  }

  // Split the phone prop using a regular expression to match "," or "/"
  const phoneNumbers = phone.split(/[,/]/);

  // Trim any leading or trailing whitespace from each phone number
  const trimmedPhoneNumbers = phoneNumbers.map((number) => number.trim());

  // Split the jobTitle prop using a regular expression to match "," or "/"
  const jobTitles = jobTitle.split(/[,/]/);

  // Trim any leading or trailing whitespace from each job title
  const trimmedJobTitles = jobTitles.map((title) => title.trim());

  // Extract the first phone number (index 0)
  const firstPhoneNumber = trimmedPhoneNumbers[0];

  // Extract the first job title (index 0)
  const firstJobTitle = trimmedJobTitles[0];

  const onOpen = (data) => {
    setSelectedData(data);
    setIsOpen(true);
    console.log(data.company_names);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const labels = [];
  const values = [];
  const { socialMediaColors } = colors;
  const { size } = typography;

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" py={1} pr={2}>
      <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </MDTypography>
    </MDBox>
  ));

  // Render the card social media icons
  // const renderSocial = social.map(({ link, icon, color }) => (
  //   <MDBox
  //     key={color}
  //     component="a"
  //     href={link}
  //     target="_blank"
  //     rel="noreferrer"
  //     fontSize={size.lg}
  //     color={socialMediaColors[color].main}
  //     pr={1}
  //     pl={0.5}
  //     lineHeight={1}
  //   >
  //     {icon}
  //   </MDBox>
  // ));

  return (
    <MDBox>
      {/* <Grid component> */}
      {/* <Grid item> */}
      <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
          <MDTypography variant="h5" fontWeight="medium" textTransform="capitalize">
            <Icon>
              <PersonIcon />
            </Icon>
            &nbsp; &nbsp;
            {name}
          </MDTypography>
          {/* <MDTypography component={Link} to={action.route} variant="body2" color="secondary">
          <Tooltip name={action.tooltip} placement="top">
          <Icon>edit</Icon>
          </Tooltip>
        </MDTypography> */}
        </MDBox>
        <MDBox p={2}>
          <MDBox mb={2} lineHeight={2}>
            <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
              <Icon>
                <WorkOutlineIcon sx={{ marginTop: "-5px" }} />
              </Icon>
              &nbsp;
              {firstJobTitle}
            </MDTypography>
          </MDBox>
          <MDBox mb={2} lineHeight={2}>
            <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
              <Icon>
                <PhoneIcon sx={{ marginTop: "-5px" }} />
              </Icon>
              &nbsp;
              {firstPhoneNumber}
            </MDTypography>
          </MDBox>
          <MDBox mb={2} lineHeight={2}>
            <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
              <Icon>
                <MailIcon sx={{ marginTop: "-5px" }} />
              </Icon>
              &nbsp;
              {email}
            </MDTypography>
          </MDBox>
          <MDBox opacity={0.3}>
            <Divider />
          </MDBox>
          <MDButton color="dark" onClick={handleDownload}>
            Download Resume
          </MDButton>
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
  phone: PropTypes.number.isRequired,
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

export default ProfileInfoCard;
