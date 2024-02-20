'use client'

import { useState } from 'react';
import { submitUpload } from './actions';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ClearIcon from '@mui/icons-material/Clear';
import fs from 'fs/promises';

export default function Home() {
  const [file, setFile] = useState<File | null>();
  const handleClearFile = () => {setFile(null)};
  const pathToSave = '/assets/files/';

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return
    try {
      const data = new FormData();
      data.set('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });
      console.log(res);
    } catch (e: any) {
      console.error(e);
    }
  }

  return (
    <main>
      <div className="max-w-lg rounded overflow-hidden shadow-lg m-4 p-4 bg-[#94a3b8]">
        <div className="mb-4 p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
          <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">!</span>
          <span className="font-semibold mr-2 text-left flex-auto">อัพโหลดแบบที่ 1</span>
          <ArrowForwardIosIcon fontSize='small'></ArrowForwardIosIcon>
        </div>
        <form onSubmit={onSubmit}>
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files?.[0])}
            className='mb-4'
          />
          <input
            className='ring-2 px-3 py-2 bg-blue-800 text-white rounded-md cursor-pointer' 
            type="submit"
            value="Upload"
          />
        </form>
      </div>
      <div>
          <table>
          
          </table>
        </div>
    </main>
  )
}