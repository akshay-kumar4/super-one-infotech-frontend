import axios from "axios";
import MDBox from "components/MDBox";
import { Accordion } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { KeyboardOptionKey } from "@mui/icons-material";

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
    // console.log(data);
    let tempFilteredData = data;
    console.log("Total docs : " + tempFilteredData.length);
    // console.log(searchParams.getAll("keyword"));
    // Now filtering from the received array.
    if (searchParams.has("keyword")) {
      tempFilteredData = tempFilteredData.filter((x) => {
        let test = true;
        searchParams.getAll("keyword").forEach((k) => {
          test = test && JSON.stringify(x).toLowerCase().includes(k.toLowerCase());
        });
        return test;
      });
      console.log("reduced to " + tempFilteredData.length + " by keyword");
    }
    if (searchParams.has("location")) {
      tempFilteredData = tempFilteredData.filter((x) =>
        x.location.toLowerCase().includes(searchParams.get("location").toLowerCase())
      );
      console.log("reduced to " + tempFilteredData.length + " by location");
    }
    if (searchParams.has("jobHopping")) {
      tempFilteredData = tempFilteredData.filter((x) => {
        return x["job_hopping"] == (searchParams.get("jobHopping") === "yes");
      });
      console.log("reduced to " + tempFilteredData.length + " by jobHopping");
    }
    if (searchParams.has("employers")) {
      tempFilteredData = tempFilteredData.filter((x) =>
        x.company_names.toLowerCase().includes(searchParams.get("employers").toLowerCase())
      );
      console.log("reduced to " + tempFilteredData.length + " by employers");
    }
    if (searchParams.has("exclude_employers")) {
      // tempFilteredData.forEach((x) => console.log(x.company_names));
      tempFilteredData = tempFilteredData.filter(
        (x) =>
          !x.company_names
            .toLowerCase()
            .includes(searchParams.get("exclude_employers").toLowerCase())
      );
      console.log("reduced to " + tempFilteredData.length + " by employers");
    }
    if (searchParams.has("designation")) {
      tempFilteredData = tempFilteredData.filter((x) =>
        x["job_titles"].toLowerCase().includes(searchParams.get("designation").toLowerCase())
      );
    }
    if (searchParams.has("experience_level")) {
      tempFilteredData = tempFilteredData.filter((x) => {
        x["experience_level"] == searchParams.get("experience_level");
      });
    }

    setFilteredData(tempFilteredData);
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
