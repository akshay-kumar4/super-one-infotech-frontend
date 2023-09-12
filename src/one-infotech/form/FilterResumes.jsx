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
import { ToastContainer, toast } from "react-toastify";
// import axios from 'axios'

const FilterResume = () => {
  const [data, setData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedData, setSelectedData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    let tempFilteredData = data;
    if (tempFilteredData.length === 0) {
      toast.error("No data found", {
        position: "top-center",
        autoClose: 3000, // Close after 3 seconds
        hideProgressBar: true,
      });
    }

    // console.log(tempFilteredData);
    // console.log("Total docs : " + tempFilteredData.length);
    // console.log(searchParams.getAll("keyword"));
    // Now filtering from the received array.
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
        // console.log(x["keywords"]);
      });
      // console.log("reduced to " + tempFilteredData.length + " by any keyword");
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
          let test = true;
          searchParams.getAll("employers").forEach((k) => {
            if (!x.company_names.toLowerCase().includes(k.toLowerCase())) {
              test = false;
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
      tempFilteredData = tempFilteredData.filter((x) =>
        x.education
          ? x.education.toLowerCase().includes(searchParams.get("education").toLowerCase())
          : false
      );
    }
    if (searchParams.has("skills")) {
      tempFilteredData = tempFilteredData.filter((x) => {
        if (x.skills) {
          let test = true;
          searchParams.getAll("skills").forEach((k) => {
            if (!x.skills.toLowerCase().includes(k.toLowerCase())) {
              test = false;
            }
          });
          return test;
        }
      });
    }

    setFilteredData(tempFilteredData);
  }, [data]);
  // data = JSON.stringify(data, null, 2);

  return (
    <Container>
      <ToastContainer />
      {isLoading ? (
        <Backdrop
          sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={() => setIsLoading(false)}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <React.Fragment>
          {filteredData.length > 0 ? (
            <Grid
              container
              spacing={1}
              gap={4}
              sx={{
                justifyContent: "center",
              }}
            >
              {filteredData.map((Data) => (
                <Grid item xs={3.5} key={Data.id}></Grid>
              ))}
            </Grid>
          ) : null}
        </React.Fragment>
      )}
    </Container>
  );
};

export default FilterResume;
