"use client"
import React, { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";

export default function Page() {

    const [file, setFile] = useState();
    const [urls, setUrls] = useState<{
        url: stringifyCookie;
        thumbnailUrl: string | null;
    }>();
    const { edgestore } = useEdgeStore();
    return (
        <div className="flex flex-col items-center m-6 gap-2">
            <input
                type="file"
                onChange={(e) => {
                    setFile(e.target.files?.[0]);
                }}
            />
            <button
                className="bg-white text-block rounded px-2 hover:opacity-80"
                onClick={async () => {
                    if(file) {
                        const res = await edgestore.myPublicImages.upload({file});
                        // save your data here
                    }
                }}
            >
                Upload
            </button>
        </div>
    )
}
