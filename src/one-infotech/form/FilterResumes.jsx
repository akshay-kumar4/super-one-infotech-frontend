import axios from "axios";
import MDBox from "components/MDBox";
import { Accordion } from "@mui/material";
import { Grid, Container } from "@mui/material";
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

const FilterResume = () => {
  const [data, setData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

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
      });
  }, []);

  useEffect(() => {
    let tempFilteredData = data;
    // console.log(tempFilteredData);
    // console.log("Total docs : " + tempFilteredData.length);
    // console.log(searchParams.getAll("keyword"));
    // Now filtering from the received array.
    if (searchParams.has("any_keywords")) {
      tempFilteredData = tempFilteredData.filter((x) => {
        let test = false;
        searchParams.getAll("any_keywords").forEach((k) => {
          if (x.keywords.toLowerCase().includes(k.toLowerCase())) {
            test = true;
          }
        });
        return test;
      });
      // console.log("reduced to " + tempFilteredData.length + " by any keyword");
    }
    if (searchParams.has("all_keywords")) {
      tempFilteredData = tempFilteredData.filter((x) => {
        let test = true;
        searchParams.getAll("all_keywords").forEach((k) => {
          if (!x.keywords.toLowerCase().includes(k.toLowerCase())) {
            test = false;
          }
        });
        return test;
      });
      // console.log("reduced to " + tempFilteredData.length + " by all keyword");
    }
    if (searchParams.has("exclude_keywords")) {
      tempFilteredData = tempFilteredData.filter((x) => {
        let test = true;
        searchParams.getAll("exclude_keywords").forEach((k) => {
          if (x.keywords.toLowerCase().includes(k.toLowerCase())) {
            test = false;
          }
        });
        return test;
      });
      // console.log("reduced to " + tempFilteredData.length + " by exclude keyword");
    }
    if (searchParams.has("location")) {
      tempFilteredData = tempFilteredData.filter((x) =>
        x.location.toLowerCase().includes(searchParams.get("location").toLowerCase())
      );
      // console.log("reduced to " + tempFilteredData.length + " by location");
    }
    if (searchParams.has("jobHopping")) {
      tempFilteredData = tempFilteredData.filter((x) => {
        return x["job_hopping"] == (searchParams.get("jobHopping") === "yes");
      });
      // console.log("reduced to " + tempFilteredData.length + " by jobHopping");
    }
    if (searchParams.has("employers")) {
      tempFilteredData = tempFilteredData.filter((x) =>
        x.company_names.toLowerCase().includes(searchParams.get("employers").toLowerCase())
      );
      // console.log("reduced to " + tempFilteredData.length + " by employers");
    }
    if (searchParams.has("exclude_employers")) {
      // tempFilteredData.forEach((x) => console.log(x.company_names));
      tempFilteredData = tempFilteredData.filter(
        (x) =>
          !x.company_names
            .toLowerCase()
            .includes(searchParams.get("exclude_employers").toLowerCase())
      );
      // console.log("reduced to " + tempFilteredData.length + " by employers");
    }
    if (searchParams.has("designation")) {
      tempFilteredData = tempFilteredData.filter((x) =>
        x["job_titles"].toLowerCase().includes(searchParams.get("designation").toLowerCase())
      );
    }
    if (searchParams.has("expMin")) {
      tempFilteredData = tempFilteredData.filter(
        (x) => Number(x.experience_level) >= Number(searchParams.get("expMin"))
      );
    }
    if (searchParams.has("expMax")) {
      tempFilteredData = tempFilteredData.filter(
        (x) => Number(x.experience_level) <= Number(searchParams.get("expMax"))
      );
    }
    if (searchParams.has("salMinLac")) {
      tempFilteredData = tempFilteredData.filter(
        (x) => Number(x.salary_level.split("-").at(0)) >= Number(searchParams.get("salMinLac"))
      );
    }
    if (searchParams.has("salMaxLac")) {
      tempFilteredData = tempFilteredData.filter(
        (x) => Number(x.salary_level.split("-").at(-1)) <= Number(searchParams.get("salMaxLac"))
      );
    }
    if (searchParams.has("education")) {
      tempFilteredData = tempFilteredData.filter((x) =>
        x.education.toLowerCase().includes(searchParams.get("education").toLowerCase())
      );
    }
    if (searchParams.has("skills")) {
      tempFilteredData = tempFilteredData.filter((x) =>
        x.skills.toLowerCase().includes(searchParams.get("skills").toLowerCase())
      );
    }

    setFilteredData(tempFilteredData);
  }, [data]);
  // data = JSON.stringify(data, null, 2);

  return (
    <DashboardLayout>
      {/* <Accordion
        sx={{ borderRadius: "10px", marginTop: "20px", marginLeft: "250px", padding: "20px" }}
      > */}
      <Container>
        <Popup isOpen={isOpen} onClose={onClose} data={selectedData} />
        {filteredData.length === 0 ? ( // Check if filteredData is empty
          <h3 style={{ color: "red", textAlign: "center" }}>No Data Found !</h3>
        ) : (
          <Grid container spacing={1} gap={4}>
            {filteredData.map((Data) => {
              return (
                <Grid
                  item
                  onClick={() => onOpen(Data)}
                  key={Data.id}
                  xs={3.5}
                  sx={{
                    border: "1px solid white ",
                    borderRadius: "13px",
                    boxShadow: "5px 8px 5px rgba(0 0 0 0.5)",
                    margin: "5px",
                    paddingTop: "20px",
                    paddingBottom: "15px",
                    paddingLeft: "20px",
                    backgroundColor: "rgb(216 234 240 / 65%)",
                    transition: "0.4s ease",
                    alignItems: "center",
                    ":hover": {
                      background: "rgb(216 239 244)",
                      transform: "scale(1.02)",
                      cursor: "pointer",
                    },
                  }}
                >
                  <h2 style={{ display: "flex", justifyContent: "center" }}>{Data.name}</h2>
                  <MDTypography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    {" "}
                    <WorkOutlineIcon sx={{ marginLeft: "10px" }} />
                    &nbsp;
                    <p> {Data.job_titles.substring(0, 20)}...</p>
                  </MDTypography>
                  <MDTypography
                    sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
                  >
                    {" "}
                    <MailIcon sx={{ marginLeft: "10px" }} /> &nbsp;{Data.email}
                  </MDTypography>
                  <MDTypography
                    sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
                  >
                    {" "}
                    <EngineeringIcon sx={{ marginLeft: "10px" }} />
                    &nbsp;
                    {Data.skills.substring(0, 20)}...
                  </MDTypography>
                  <MDTypography
                    sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
                  >
                    {" "}
                    <MilitaryTechIcon sx={{ marginLeft: "10px" }} />
                    &nbsp; {Data.experience}
                  </MDTypography>
                  <MDTypography
                    sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
                  >
                    <SchoolIcon sx={{ marginLeft: "10px" }} /> &nbsp;
                    {Data.education.substring(0, 20)}...
                  </MDTypography>
                  <MDTypography
                    sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
                  >
                    <BusinessIcon sx={{ marginLeft: "10px" }} />
                    &nbsp; {Data.company_names.substring(0, 20)}...
                  </MDTypography>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
      {/* </Accordion> */}
    </DashboardLayout>
  );
};
export default FilterResume;
