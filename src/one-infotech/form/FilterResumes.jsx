import axios from "axios";
import MDBox from "components/MDBox";
import { Accordion } from "@mui/material";
import { Grid, Container } from "@mui/material";
import { Modal, Box, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { KeyboardOptionKey } from "@mui/icons-material";
import MDTypography from "components/MDTypography";
import MailIcon from "@mui/icons-material/Mail";
import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EngineeringIcon from "@mui/icons-material/Engineering";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import Popup from "./Popup";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ProfileInfoCard from "one-infotech/components/ProfileInfoCard";
import Backdrop from "@mui/material/Backdrop"; // Import Backdrop from Material-UI
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress from Material-UI
import Button from "@mui/material/Button";
import { Dialog, DialogTitle, DialogContent, DialogContentText, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { Grow } from "@mui/material";
// import axios from 'axios'

const FilterResume = () => {
  const [data, setData] = useState(undefined);
  let [filteredData, setFilteredData] = useState(undefined);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedData, setSelectedData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [displayNoDataFound, setDisplayNoDataFound] = useState(true); // Set to true by default
  const [noDataFound, setNoDataFound] = useState(false);

  const onOpen = (Data) => {
    setSelectedData(Data);
    setIsOpen(true);
    console.log(Data.company_names);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    axios
      .get("https://resume-api-6u3t4.ondigitalocean.app/resume-data/", {
        headers: {
          Authorization: "Token e06ac2eca287fc7136dceb7780bdee299a23a6d6",
        },
      })
      .then((response) => {
        setData([...response.data]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (data) {
      let tempFilteredData = data;
      if (searchParams.has("any_keywords")) {
        // console.log(searchParams.getAll("any_keywords"));
        tempFilteredData = tempFilteredData.filter((x) => {
          if (x.keywords) {
            let test = false;
            searchParams.getAll("any_keywords").forEach((k) => {
              if (x.keywords.toLowerCase().includes(k.toLowerCase())) {
                test = true;
              }
            });
            return test;
          }
          return false;
        });
      }
      if (searchParams.has("all_keywords")) {
        tempFilteredData = tempFilteredData.filter((x) => {
          if (x.keywords) {
            let test = true;
            searchParams.getAll("all_keywords").forEach((k) => {
              if (!x.keywords.toLowerCase().includes(k.toLowerCase())) {
                test = false;
              }
            });
            return test;
          }
          return false;
        });
        // console.log("reduced to " + tempFilteredData.length + " by all keyword");
      }
      if (searchParams.has("exclude_keywords")) {
        tempFilteredData = tempFilteredData.filter((x) => {
          if (x.keywords) {
            return !searchParams
              .getAll("exclude_keywords")
              .some((k) => x.keywords.toLowerCase().includes(k.toLowerCase()));
          }
          return true; // If a resume doesn't have keywords, include it by default
        });
        // console.log("reduced to " + tempFilteredData.length + " by exclude keyword");
      }
      if (searchParams.has("location")) {
        tempFilteredData = tempFilteredData.filter((x) =>
          x.location
            ? x.location.toLowerCase().includes(searchParams.get("location").toLowerCase())
            : false
        );
        // console.log("reduced to " + tempFilteredData.length + " by location");
      }
      if (searchParams.has("jobHopping")) {
        tempFilteredData = tempFilteredData.filter((x) => {
          if (x.job_hopping) {
            return x["job_hopping"] == (searchParams.get("jobHopping") === "yes");
          }
          return false;
        });
        // console.log("reduced to " + tempFilteredData.length + " by jobHopping");
      }
      if (searchParams.has("employers")) {
        tempFilteredData = tempFilteredData.filter((x) => {
          if (x.company_names) {
            let test = false;
            searchParams.getAll("employers").forEach((k) => {
              if (x.company_names.toLowerCase().includes(k.toLowerCase())) {
                test = true;
              }
            });
            return test;
          }
          return false;
        });
        // console.log("reduced to " + tempFilteredData.length + " by employers");
      }
      if (searchParams.has("exclude_employers")) {
        tempFilteredData = tempFilteredData.filter((x) => {
          if (x.company_names) {
            let test = true;
            searchParams.getAll("exclude_employers").forEach((k) => {
              if (x.company_names.toLowerCase().includes(k.toLowerCase())) {
                test = false;
              }
            });
            return test;
          }
          return false;
        });
        // console.log("reduced to " + tempFilteredData.length + " by employers");
      }
      if (searchParams.has("designation")) {
        // tempFilteredData = tempFilteredData.filter((x) =>
        //   x["job_titles"].toLowerCase().includes(searchParams.get("designation").toLowerCase())
        // );
        tempFilteredData = tempFilteredData.filter((x) => {
          if (x.job_titles) {
            let test = true;
            searchParams.getAll("designation").forEach((k) => {
              if (!x.job_titles.toLowerCase().includes(k.toLowerCase())) {
                test = false;
              }
            });
            return test;
          }
          return false;
        });
      }
      if (searchParams.has("expMin")) {
        tempFilteredData = tempFilteredData.filter((x) =>
          x.experience_level
            ? Number(x.experience_level) >= Number(searchParams.get("expMin"))
            : false
        );
      }
      if (searchParams.has("expMax")) {
        tempFilteredData = tempFilteredData.filter((x) =>
          x.experience_level
            ? Number(x.experience_level) <= Number(searchParams.get("expMax"))
            : false
        );
      }
      if (searchParams.has("salMinLac")) {
        tempFilteredData = tempFilteredData.filter((x) =>
          x.salary_level
            ? Number(x.salary_level.split("-").at(0)) >= Number(searchParams.get("salMinLac"))
            : false
        );
      }
      if (searchParams.has("salMaxLac")) {
        tempFilteredData = tempFilteredData.filter((x) =>
          x.salary_level
            ? Number(x.salary_level.split("-").at(-1)) <= Number(searchParams.get("salMaxLac"))
            : false
        );
      }
      if (searchParams.has("education")) {
        console.log("searching for " + searchParams.get("education"));
        let education = searchParams.get("education").split(" (");
        education[1] = education[1].slice(0, -1);
        console.log(education);
        tempFilteredData = tempFilteredData.filter((x) => {
          if (!x.education) {
            return false;
          }
          // console.log(x.education);
          let status = false;
          education.forEach((e) => {
            if (x.education.toLowerCase().includes(e.toLowerCase())) {
              status = true;
            }
          });
          return status;
        });
      }
      if (searchParams.has("skills")) {
        tempFilteredData = tempFilteredData.filter((x) => {
          if (x.skills) {
            let test = false;
            searchParams.getAll("skills").forEach((k) => {
              if (x.skills.toLowerCase().includes(k.toLowerCase())) {
                test = true;
              }
            });
            return test;
          }
        });
      }
      setFilteredData(tempFilteredData);
      setOpenDialog(true);
    }
  }, [data]);
  // data = JSON.stringify(data, null, 2);
  const [openDialog, setOpenDialog] = useState(false);

  // rz
  return (
    <DashboardLayout>
      <Container>
        {!filteredData ? (
          <Backdrop
            sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <React.Fragment>
            {filteredData.length === 0 ? (
              <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                TransitionComponent={Grow}
              >
                <DialogTitle>
                  <Link to="/dashboards/search">
                    <IconButton
                      edge="end"
                      color="inherit"
                      onClick={() => setOpenDialog(false)}
                      aria-label="close"
                      sx={{ mr: 1 }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Link>
                  No Data Found
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Sorry, we couldn&apos;t find any data matching your criteria.
                  </DialogContentText>
                </DialogContent>
              </Dialog>
            ) : (
              <Grid
                container
                spacing={1}
                gap={3}
                sx={{
                  justifyContent: "space-evenly",
                }}
              >
                {filteredData.map((Data) => (
                  <Grid item xs={5.8} key={Data.id}>
                    <ProfileInfoCard
                      name={Data.name ? Data.name : "No name"}
                      jobTitle={Data.job_titles ? Data.job_titles : "N/A"}
                      phone={Data.phone ? Data.phone : "N/A"}
                      email={Data.email ? Data.email : "N/A"}
                      skills={Data.skills ? Data.skills : "N/A"}
                      location={Data.location ? Data.location : "N/A"}
                      education={Data.education ? Data.education : "N/A"}
                      info=""
                      data={Data}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </React.Fragment>
        )}
      </Container>
    </DashboardLayout>
  );
};

const educationList = [
  ["b.com", "bachelor of commerce"],
  ["b.sc", "bachelor of science"],
  ["b.a", "bachelor of arts"],
  ["mfa", "master of fine arts"],
  ["mvsc", "masters of veterinary science"],
  ["b.tech", "bachelor of technology"],
  ["m.arc", "master of architecture"],
  ["m.ch", "master of chirurgiae"],
  ["m.des", "master of design"],
  ["m.ed", "master of education"],
  ["m.pharma", "masters of pharmacy"],
  ["mcm", "masters of computer management"],
  ["mds", "master of dental surgery"],
  ["mphil", "master of philosophy"],
  ["mba/pgdm", "masters of business administration/post graduate diploma in management"],
  ["m.tech", "master of technology"],
  ["ms/m.sc", "master of science"],
  ["mca", "master of computer application"],
  ["m.com", "master of commerce"],
  ["pg", "diploma postgraduate"],
  ["m.a", "master of arts"],
  ["ca", "chartered accountant"],
  ["icma cwa", "institute of cost and works accountants of india"],
];

export default FilterResume;
