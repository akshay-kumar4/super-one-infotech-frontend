import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import PropTypes from "prop-types";

function ExportExcel({ excelData, fileName }) {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      <MDBox style={{ margin: "1em" }}>
        <MDButton onClick={exportToExcel}>Export as Excel Sheet</MDButton>
      </MDBox>
    </>
  );
}

ExportExcel.propTypes = {
  excelData: PropTypes.array,
  fileName: PropTypes.string,
};

export default ExportExcel;
