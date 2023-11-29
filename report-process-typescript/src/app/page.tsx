"use server"
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react"
import fs from "fs/promises";
import path from "path";

interface Props {
  dirs: string[];
}

// export default function Index({ }: Props) {
const Index: NextPage<Props> = ({ dirs }) => {

  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/api/image", formData);
      console.log(data);
    } catch (error: any) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-20 space-y-6">
      <label>
        <input
          type="file"
          hidden
          onChange={({ target }) => {
            if (target.files) {
              const file = target.files[0];
              setSelectedImage(URL.createObjectURL(file));
              setSelectedFile(file);
            }
          }}
        />
        <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
          {selectedImage ? (
            <img src={selectedImage} alt="" />
          ) : (
            <span>Select Image</span>
          )}
        </div>
      </label>
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{ opacity: uploading ? ".5" : "1" }}
        className="bg-red-600 p-3 w-32 text-center rounded text-white"
      >
        {uploading ? "Uploading.." : "Upload"}
      </button>
      <div className="mt-20 flex flex-col space-y-3">
        {dirs.map((item) => (
          <Link key={item} href={"/images/" + item}>
            <a className="text-blue-500 hover:underline">{item}</a>
          </Link>
        ))}
      </div>
    </div>



    // <div className="md:container md:mx-auto">
    //   <h1 className="text-2xl font-bold text-black mb-7"> Files</h1>
    //   <div className="space-x-3">
    //     <div className="inline-block">
    //       <button
    //         type="button"
    //         className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
    //         Refresh
    //       </button>
    //     </div>

    //     <div className="inline-block">
    //       <label
    //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
    //         htmlFor="file_input">
    //         Upload file
    //       </label>
    //       <input
    //         className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
    //         id="file_input"
    //         type="file"
    //       />
    //     </div>
    //     <div className="inline-block">
    //       <button
    //         type="button"
    //         className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
    //         Upload
    //       </button>
    //     </div>
    //   </div>
    // </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const props = { dirs: [] };
  try {
    const dirs = await fs.readdir(path.join(process.cwd(), "/public/images"));
    props.dirs = dirs as any;
    return { props };
  } catch (error) {
    return { props };
  }
};

export default Index;