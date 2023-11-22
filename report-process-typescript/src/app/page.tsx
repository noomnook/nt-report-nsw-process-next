import React from "react"

type Props = {}

export default function Index({ }: Props) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-7"> Files</h1>
      <button className="bg-blue-500 rounded px-4 py-2 text-white font-semibold">
        Refresh ..
      </button>
    </>
  )
}