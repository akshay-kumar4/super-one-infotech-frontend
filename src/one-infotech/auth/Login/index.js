import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "../CoverLayout/index";

// Images
import bgImage from "assets/images/bg-sign-in-cover.jpeg";

import { login } from "one-infotech/redux/features/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [rememberMe, setRememberMe] = useState(true);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const onSubmit = () => {
    const response = axios
      .post("https://resume-api-6u3t4.ondigitalocean.app/login/", { username, password })
      .then((response) => {
        dispatch(login(response.data));
        console.log(response.data);
        let token = response.data.token;
        // console.log(token)

        let Admintoken = localStorage.setItem("token", token);
        navigate("/dashboards/search");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Incorrect Credentials", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
        });
      });
  };

  return (
    <CoverLayout image={bgImage}>
      <Card sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={4}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign In
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your Username and Password to Sign In
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Username"
                variant="standard"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                fullWidth
                placeholder="john"
                InputLabelProps={{ shrink: true }}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                placeholder="****"
                InputLabelProps={{ shrink: true }}
              />
            </MDBox>
            <ToastContainer />
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={onSubmit}>
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              Don&apos;t have an account?{" "}
              <MDTypography
                component={Link}
                to="/auth/sign-up"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Sign Up
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
};

export default Login;
