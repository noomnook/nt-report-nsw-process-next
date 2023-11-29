import React from "react";

export default function Page() {


  return (
    <div className="md:container md:mx-auto">
      <h1 className="text-2xl font-bold text-black mb-7"> Files</h1>
      <div className="space-x-3">
        <div className="inline-block">
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Refresh
          </button>
        </div>
        <div className="inline-block">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            htmlFor="file_input">
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
          />
        </div>
        <div className="inline-block">
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Upload
          </button>
        </div>
      </div>
    </div>
  )
}
