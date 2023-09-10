import axios from "axios";
import MDBox from "components/MDBox";
import { Accordion } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";

const ResumeDetails = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make a GET request when the component mounts
    axios
      .get("https://resume-api-6u3t4.ondigitalocean.app/resume-data/", {
        headers: {
          Authorization: "Token e06ac2eca287fc7136dceb7780bdee299a23a6d6",
        },
      })
      .then((response) => {
        setData(response.data);
        console.log("data = " + data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  let Data = JSON.stringify(data, null, 2);

  console.log(data);
  return (
    <div>
      <Accordion
        sx={{ borderRadius: "10px", marginTop: "20px", marginLeft: "250px", padding: "20px" }}
      >
        <MDBox>
          <h1>API Response:</h1>
          <pre>{Data}</pre>
        </MDBox>
      </Accordion>
    </div>
  );
};
export default ResumeDetails;
