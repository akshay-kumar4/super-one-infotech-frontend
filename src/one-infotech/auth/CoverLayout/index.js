import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication layout components
import Footer from "layouts/authentication/components/Footer";

// Material Dashboard 2 PRO React page layout routes
import pageRoutes from "page.routes";

const CoverLayout = ({ coverHeight, children }) => {
  return (
    <PageLayout>
      <MDBox
        width="calc(100% - 2rem)"
        minHeight={coverHeight}
        borderRadius="xl"
        mx={2}
        // my={2}
        pt={6}
        pb={28}
      />
      <MDBox mt={{ xs: -20, lg: -25 }} px={1} width="calc(100% - 2rem)" mx="auto">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={6} lg={5} xl={4}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
};

// Setting default props for the CoverLayout
CoverLayout.defaultProps = {
  coverHeight: "35vh",
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  coverHeight: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
