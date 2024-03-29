import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Date from "../utility/date";

export default function TableComponent({ jsonData }: any) {
  const exceldata = jsonData["data"] || [];
  const fileName = jsonData["fileName"] || "";
  console.log("data:", exceldata);
  return (
    <div>
      <div className="text-2xl font-bold mb-5">{fileName ? `File name: ${fileName}` : ""}</div>
      {exceldata.length > 0 ? (
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="bg-[#1976d2]">
                  {exceldata[0][0].map((data: any, index: number) => (
                    <TableCell key={index} style={{ minWidth: 170 }} align="center">
                      <span className="text-white">{data}</span>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {exceldata.length > 0 ? (
                  <>
                    {exceldata.map((row: any, index: number) =>
                      <>
                      {
                      row.slice(1).map((data: any, indexData: number) => (
                        <TableRow key={`dataExcel` + index + `_` + indexData} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                          {data.map((dataInside: any, indexInside: number) => (
                            <TableCell key={`dataExcel` + index + `_` + indexData + "_" + indexInside} align="center">
                              <span>{dataInside}</span>
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                      }
                    <TableRow>
                      <TableCell sx={{backgroundColor:'lightgray'}}  colSpan={exceldata[0][0].length} align="center">
                        
                      </TableCell>
                    </TableRow>                      
                      </>
                    )}
                    {/* <TableRow>
                      <TableCell sx={{backgroundColor:'lightgray'}}  colSpan={exceldata[0][0].length} align="center">
                        
                      </TableCell>
                    </TableRow> */}
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <span className="font-bold">No data</span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div className="h-[calc(100vh_-_272px)] flex">
          <div className=" justify-center self-center border-2 bg-red-300 text-white p-4">
            <span className="text-3xl mr-3">Please Select Data </span>
            <SearchIcon className=" p-1 text-blue-500 rounded-full bg-blue-200 align-top" sx={{ fontSize: 35 }} />
          </div>
        </div>
      )}
    </div>
  );
}
