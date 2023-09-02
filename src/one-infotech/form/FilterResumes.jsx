import axios from "axios";
import MDBox from "components/MDBox";
import { Accordion } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

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
    console.log(data);
    console.log(searchParams.get("keyword"));
    // Now filtering from the received array.
    if (searchParams.has("keyword")) {
      console.log("keyword given");
      console.log(
        data.filter((x) =>
          JSON.stringify(x).toLowerCase().includes(searchParams.get("keyword").toLowerCase())
        )
      );
      setFilteredData(
        data.filter((x) =>
          JSON.stringify(x).toLowerCase().includes(searchParams.get("keyword").toLowerCase())
        )
      );
    } else {
      console.log("keyword not given");
      setFilteredData(data);
    }

    if (searchParams.has("location")) {
      console.log("Location passed = " + searchParams.get("location"));
      setFilteredData(
        data.filter((x) =>
          x.location.toLowerCase().includes(searchParams.get("location").toLowerCase())
        )
      );
    }
  }, [data]);

  return (
    <div>
      <Accordion
        sx={{ borderRadius: "10px", marginTop: "20px", marginLeft: "250px", padding: "20px" }}
      >
        <MDBox>
          <h1>API Response:</h1>
          <span>{filteredData.length}</span>
          <pre>{JSON.stringify(filteredData, null, 2)}</pre>
        </MDBox>
      </Accordion>
    </div>
  );
};
export default FilterResume;
