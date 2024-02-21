"use client";

import { useEffect, useRef, useState } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Home() {
  const [file, setFile] = useState<File | null>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pathToSave = "/assets/files/";
  const rows = [
    // createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    // createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    // createData("Eclair", 262, 16.0, 24, 6.0),
    // createData("Cupcake", 305, 3.7, 67, 4.3),
    // createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  const [rowss, setRows] = useState<any[]>([]);

  useEffect(() => {
    fetchingData();
  },[])

  const fetchingData = async() => {
    try{
      const res = await fetch("/api/upload3",{
        method: "GET"
      });
      const data = await res.json();
      setRows(data['data']);
    }catch(err){
      console.log(err);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    try {
      const data = new FormData();
      data.set("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      if(await res.json()){
        await fetchingData();
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    } catch (e: any) {
      console.error(e);
    }
  };


  return (
    <main>
      <div className="max-w-lg rounded overflow-hidden shadow-lg m-4 p-4 bg-[#94a3b8] mx-auto">
        <div className="mb-4 p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
          <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">!</span>
          <span className="font-semibold mr-2 text-left flex-auto">อัพโหลด</span>
          <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
        </div>
        <form onSubmit={onSubmit} className="flex justify-between items-center">
          <input type="file" name="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={(e) => setFile(e.target.files?.[0])}  ref={fileInputRef}/>
          <input className="ring-2 px-3 py-2 bg-blue-800 text-white rounded-md cursor-pointer text-end" type="submit" value="Upload" />
        </form>
      </div>
      <div className="max-w-lg">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow className="bg-[#94a3b8]">
                <TableCell align="center">File Name</TableCell>
                <TableCell align="center">File sizes (byte)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowss.map((row) => (
                <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.size}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </main>
  );
}
