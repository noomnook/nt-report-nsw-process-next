'use client'

import { useState } from 'react';
import { submitUpload } from './actions';

export default function Home() {
  const [file, setFile] = useState<File>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      data.set('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })
      // handle the error
      if (!res.ok) throw new Error(await res.text())
    } catch (e: any) {
      // Handle errors here
      console.error(e)
    }
  }

  // async function submitUpload(formData: FormData) {
  //   'use server'
  //   console.log(formData);
  // }

  return (
    <main>
      <div className="max-w-lg rounded overflow-hidden shadow-lg m-4 p-4 bg-[#94a3b8]">
        <div className="mb-4 p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
          <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">!</span>
          <span className="font-semibold mr-2 text-left flex-auto">อัพโหลดแบบที่ 1</span>
          <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg>
        </div>
        <form onSubmit={onSubmit}>
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files?.[0])}
            className='mb-4'
          />
          <input
            className='ring-2 px-3 py-2 bg-blue-800 text-white rounded-md'
            type="submit"
            value="Upload"
          />
        </form>
      </div>

      <div className="max-w-lg rounded overflow-hidden shadow-lg m-4 p-4 bg-[#94a3b8]">
        <div className="mb-4 p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
          <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">!</span>
          <span className="font-semibold mr-2 text-left flex-auto">อัพโหลดแบบที่ 2</span>
          <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg>
        </div>
        <form action={submitUpload} method="POST" encType="multipart/form-data">
          <input type="file" name="file" required />
          <button className="ring-2 px-3 py-2 bg-blue-800 text-white rounded-md">
            Upload
          </button>
        </form>
      </div>
    </main>
  )
}