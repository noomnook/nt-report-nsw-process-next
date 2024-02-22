import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const style = {
  position: "absolute" as "absolute",
  width: "100vw",
  height: "100vh",
  bgcolor: "#e5e7eb",
  boxShadow: 24,
  p: 4,
};

export default function TableModal({ path, fileName }: any) {
  const [open, setOpen] = React.useState(false);
  const [fileExcelData,setFileExcelData] = React.useState();
  
  const handleOpen = async() => {
    setOpen(true);
    await onSelectedFilename(path);
  };

  const handleClose = () => setOpen(false);

  const onSelectedFilename = async(filePath:any) => {
    try{
      const body = {
        path: filePath
      };
      const res = await fetch("/api/upload3", {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data:any = await res.json();
      if(data){
        setFileExcelData(data['data']);
        console.log(fileExcelData);
      }
    }catch(e:any){
      console.error(e);
    }
  }


  return (
    <div>
      <Button className="px-0" onClick={handleOpen}>
        <SearchIcon fontSize="small"></SearchIcon>
      </Button>
      <Modal keepMounted open={open} onClose={handleClose} aria-labelledby="keep-mounted-modal-title" aria-describedby="keep-mounted-modal-description">
        <Box sx={style}>
          <div className="flex justify-between">
            <span className="text-lg font-bold p-2 rounded-2xl text-white bg-[#3730a3]">{fileName}</span>
            <div onClick={() => handleClose()}>
              <ClearIcon fontSize="small" className="cursor-pointer hover:text-red-500"></ClearIcon>
            </div>
          </div>
          <div className="my-3"></div>
          <div className="mx-auto">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="simple table">
              <TableHead>
                {/* {rowsHeader.map((rows:any) => {
                    <TableRow className="bg-[#94a3b8]">
                        <TableCell align="center">{rows}</TableCell>
                    </TableRow>
                })} */}
              </TableHead>
              <TableBody>
                {/* {rows.map((row) => (
                  <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </TableContainer>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
