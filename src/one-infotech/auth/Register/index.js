import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "../CoverLayout/index";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    fname: "",
    lname: "",
    uname: "",
    pwd1: "",
    pwd2: "",
    email: "",
    termsAccepted: false,
  });

  function submitRegistration() {
    try {
      validate();
      console.log("details are validated.");
      let formData = new FormData();
      formData.append("first_name", newUser.fname);
      formData.append("last_name", newUser.lname);
      formData.append("username", newUser.uname);
      formData.append("password", newUser.pwd1);
      formData.append("password2", newUser.pwd2);
      formData.append("email", newUser.email);
      axios
        .post("https://resume-api-6u3t4.ondigitalocean.app/register/", formData)
        .then((x) => {
          console.log(x);
          toast.success("Registered Successfully. Redirecting to login page..");
          setNewUser({
            fname: "",
            lname: "",
            uname: "",
            pwd1: "",
            pwd2: "",
            email: "",
            termsAccepted: false,
          });
          setTimeout(() => {
            navigate("/auth/sign-in");
          }, 5000);
        })
        .catch((e) => {
          console.error(Object.values(e.response.data)[0][0]);
          toast.error(Object.values(e.response.data)[0][0]);
        });
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
  }

  function validate() {
    if (newUser.fname.length == 0) {
      throw new Error("First name must not be empty");
    }
    if (newUser.lname.length == 0) {
      throw new Error("Last name must not be empty");
    }
    if (newUser.email.length == 0) {
      throw new Error("Email must not be empty");
    }
    if (newUser.uname.length == 0) {
      throw new Error("Username must not be empty");
    }
    if (newUser.pwd1.length == 0 || newUser.pwd2.length == 0) {
      throw new Error("Password must not be empty");
    }
    if (newUser.pwd1 !== newUser.pwd2) {
      throw new Error("Passwords should be same.");
    }
    if (!newUser.termsAccepted) {
      throw new Error("Please Accept the Terms and Conditions to register.");
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newUser.email)) {
      throw new Error("Email is invalid.");
    }
  }

  return (
    <CoverLayout>
      <ToastContainer />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign Up
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your Email and Password to Register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="First Name"
                variant="standard"
                fullWidth
                value={newUser.fname}
                onChange={(e) =>
                  setNewUser((prev) => {
                    return { ...prev, fname: e.target.value.trim() };
                  })
                }
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Last Name"
                variant="standard"
                fullWidth
                value={newUser.lname}
                onChange={(e) =>
                  setNewUser((prev) => {
                    return { ...prev, lname: e.target.value.trim() };
                  })
                }
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                value={newUser.email}
                onChange={(e) =>
                  setNewUser((prev) => {
                    return { ...prev, email: e.target.value.trim() };
                  })
                }
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Username"
                variant="standard"
                fullWidth
                value={newUser.uname}
                onChange={(e) =>
                  setNewUser((prev) => {
                    return { ...prev, uname: e.target.value.trim() };
                  })
                }
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                value={newUser.pwd1}
                onChange={(e) =>
                  setNewUser((prev) => {
                    return { ...prev, pwd1: e.target.value.trim() };
                  })
                }
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Confirm Password"
                variant="standard"
                fullWidth
                value={newUser.pwd2}
                onChange={(e) =>
                  setNewUser((prev) => {
                    return { ...prev, pwd2: e.target.value.trim() };
                  })
                }
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox
                onChange={(e) =>
                  setNewUser((prev) => {
                    return { ...prev, termsAccepted: e.target.checked };
                  })
                }
              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={submitRegistration}>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/auth/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
};

export default Register;
