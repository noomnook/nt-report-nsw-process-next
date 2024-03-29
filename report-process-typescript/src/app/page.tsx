"use client";

import { useEffect, useRef, useState } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';

import TableModal from "./components/table-modal";
import LayoutComponent from "./components/layout-component";

export default function Home() {
  const [file, setFile] = useState<File | null>();
  const [fileExcelData,setFileExcelData] = useState<Array<any> | null>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tableModalRef = useRef(null);
  const [rowss, setRows] = useState<any[]>([]);
  const acceptFileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
/*   useEffect(() => {
    fetchingData();
  },[]) */


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

  const onSelectedDelete = async(filePath:any) => {
    try{
      console.log(filePath);
      const body = {
        path: filePath
      };
      const res = await fetch("/api/upload3", {
        method: "DELETE",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if(await res.json()){
        await fetchingData();
      }
    }catch(e:any){
      console.error(e);
    }
  }

  return (
    <main >
      <LayoutComponent>
        
      </LayoutComponent>
    </main>
  );
}
