import axios from "axios";
import MDBox from "components/MDBox";
import { Accordion } from "@mui/material";
import { Grid, Container } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { KeyboardOptionKey } from "@mui/icons-material";
import MDTypography from "components/MDTypography";
import { Link } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import LinkIcon from "@mui/icons-material/Link";
import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EngineeringIcon from "@mui/icons-material/Engineering";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

const FilterResume = () => {
  const [data, setData] = useState([]);
  let [filteredData, setFilteredData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

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
    <div>
      <Accordion
        sx={{ borderRadius: "10px", marginTop: "20px", marginLeft: "250px", padding: "20px" }}
      >
        <MDBox>
          {filteredData.map((x) => {
            return (
              <div key={x.company_names}>
                {/* <MDBox
                  sx={{
                    borderRadius: "12px",
                    padding: "10px",
                    paddingLeft: "25px",
                    margin: "20px",
                    display: "grid",
                    alignItems: "center",
                    backgroundColor: "rgb(216 234 240 / 35%)",
                    boxShadow: "5px 6px 5px rgba(0,0,0,0.3)",
                  }}
                >
                  <MDTypography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h2>{x.name}</h2>
                  </MDTypography>
                  <MDBox
                    sx={{
                      display: "inline-flex",
                      justifyContent: "space-around",
                      width: "70%",
                      alignItems: "center",
                      marginLeft: "110px",
                      marginTop: "5px",
                    }}
                  >
                    <MDTypography
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      <MailIcon />
                      <p>&nbsp;{x.email}</p>{" "}
                    </MDTypography>
                    <MDTypography sx={{ display: "inline-flex", alignItems: " center" }}>
                      <PhoneIcon padding="20px" />
                      <p>&nbsp;{x.phone}</p>{" "}
                    </MDTypography>
                    <MDTypography sx={{ display: "inline-flex", alignItems: " center" }}>
                      <PlaceIcon />
                      <p>&nbsp;{x.location}</p>{" "}
                    </MDTypography>
                  </MDBox>
                  <MDBox sx={{ display: "grid", marginTop: "5px", marginBottom: "5px" }}>
                    <MDTypography
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "",
                        margin: "5px",
                      }}
                    >
                      <WorkOutlineIcon />
                      &nbsp;
                      <MDTypography sx={{ borderBottom: "1px solid grey" }}>
                        <p>&nbsp;{x.job_titles}</p>
                      </MDTypography>
                    </MDTypography>
                    <MDTypography
                      sx={{ display: "inline-flex", alignItems: "center", margin: "5px" }}
                    >
                      <SchoolIcon />
                      &nbsp;
                      <MDTypography sx={{ borderBottom: "1px solid grey" }}>
                        <p>&nbsp;{x.education}</p>
                      </MDTypography>
                    </MDTypography>
                    <MDTypography
                      sx={{ display: "inline-flex", alignItems: "center", margin: "5px" }}
                    >
                      <MilitaryTechIcon />
                      &nbsp;
                      <MDTypography sx={{ borderBottom: "1px solid grey" }}>
                        <p>&nbsp;{x.experience_level} year.</p>
                      </MDTypography>
                    </MDTypography>
                    <MDTypography
                      sx={{ display: "inline-flex", alignItems: "center", margin: "5px" }}
                    >
                      <BusinessIcon />
                      &nbsp;
                      <MDTypography sx={{ borderBottom: "1px solid grey" }}>
                        <p>&nbsp;{x.company_names}</p>{" "}
                      </MDTypography>
                    </MDTypography>
                    <MDTypography
                      sx={{
                        display: "inline-flex",
                        alignItems: " center",
                        margin: "5px",
                      }}
                    >
                      <EngineeringIcon />
                      &nbsp;
                      <MDTypography sx={{ borderBottom: "1px solid grey" }}>
                        <p>&nbsp;{Array.isArray(x.skills) ? x.skills.join(", ") : x.skills}</p>
                      </MDTypography>
                    </MDTypography>
                    <MDTypography
                      sx={{ display: "inline-flex", alignItems: " center", margin: "5px" }}
                    >
                      <LinkIcon />
                      &nbsp;
                      <MDTypography sx={{ borderBottom: "1px solid grey" }}>
                        <a href={x.resume_permanent_link} target="/resumes">
                          {x.resume_permanent_link}
                        </a>
                      </MDTypography>
                    </MDTypography>
                  </MDBox>
                </MDBox> */}

                <Container>
                  <Grid container spacing={3}>
                    {filteredData.map((x) => {
                      return (
                        <>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={x.company_names}
                            sx={{ border: "1px solid black" }}
                          >
                            <MDBox
                              sx={{
                                borderRadius: "12px",
                                padding: "10px",
                                paddingLeft: "25px",
                                margin: "20px",
                                display: "grid",
                                alignItems: "center",
                              
                                boxShadow: "5px 6px 5px rgba(0,0,0,0.3)",
                              }}
                            >
                              <MDTypography
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <h2>{x.name}</h2>
                              </MDTypography>
                              <MDBox
                                sx={{
                                  display: "inline-flex",
                                  justifyContent: "space-around",
                                  width: "70%",
                                  alignItems: "center",
                                  marginLeft: "110px",
                                  marginTop: "5px",
                                }}
                              >
                                <MDTypography
                                  sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <MailIcon />
                                  <p>&nbsp;{x.email}</p>{" "}
                                </MDTypography>
                                <MDTypography
                                  sx={{ display: "inline-flex", alignItems: " center" }}
                                >
                                  <PhoneIcon padding="20px" />
                                  <p>&nbsp;{x.phone}</p>{" "}
                                </MDTypography>
                                <MDTypography
                                  sx={{ display: "inline-flex", alignItems: " center" }}
                                >
                                  <PlaceIcon />
                                  <p>&nbsp;{x.location}</p>{" "}
                                </MDTypography>
                              </MDBox>
                              <MDBox
                                sx={{ display: "grid", marginTop: "5px", marginBottom: "5px" }}
                              >
                                <MDTypography
                                  sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "",
                                    margin: "5px",
                                  }}
                                >
                                  <WorkOutlineIcon />
                                  &nbsp;
                                  <MDTypography sx={{ borderBottom: "1px solid grey" }}>
                                    <p>&nbsp;{x.job_titles}</p>
                                  </MDTypography>
                                </MDTypography>
                                <MDTypography
                                  sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    margin: "5px",
                                  }}
                                >
                                  <SchoolIcon />
                                  &nbsp;
                                  <MDTypography sx={{ borderBottom: "1px solid grey" }}>
                                    <p>&nbsp;{x.education}</p>
                                  </MDTypography>
                                </MDTypography>
                                <MDTypography
                                  sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    margin: "5px",
                                  }}
                                >
                                  <MilitaryTechIcon />
                                  &nbsp;
                                  <MDTypography sx={{ borderBottom: "1px solid grey" }}>
                                    <p>&nbsp;{x.experience_level} year.</p>
                                  </MDTypography>
                                </MDTypography>
                                <MDTypography
                                  sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    margin: "5px",
                                  }}
                                >
                                  <BusinessIcon />
                                  &nbsp;
                                  <MDTypography sx={{ borderBottom: "1px solid grey" }}>
                                    <p>&nbsp;{x.company_names}</p>{" "}
                                  </MDTypography>
                                </MDTypography>
                                <MDTypography
                                  sx={{
                                    display: "inline-flex",
                                    alignItems: " center",
                                    margin: "5px",
                                  }}
                                >
                                  <EngineeringIcon />
                                  &nbsp;
                                  <MDTypography sx={{ borderBottom: "1px solid grey" }}>
                                    <p>
                                      &nbsp;
                                      {Array.isArray(x.skills) ? x.skills.join(", ") : x.skills}
                                    </p>
                                  </MDTypography>
                                </MDTypography>
                                <MDTypography
                                  sx={{
                                    display: "inline-flex",
                                    alignItems: " center",
                                    margin: "5px",
                                  }}
                                >
                                  <LinkIcon />
                                  &nbsp;
                                  <MDTypography sx={{ borderBottom: "1px solid grey" }}>
                                    <a href={x.resume_permanent_link} target="/resumes">
                                      {x.resume_permanent_link}
                                    </a>
                                  </MDTypography>
                                </MDTypography>
                              </MDBox>
                            </MDBox>
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
                </Container>
              </div>
            );
          })}
        </MDBox>
      </Accordion>
    </div>
  );
};
export default FilterResume;
