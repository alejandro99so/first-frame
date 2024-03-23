"use client";
import { fetchMetadata } from "frames.js/next";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
    getFrameHtml,
    Frame,
    FrameFlattened,
    GetFrameHtmlOptions,
} from "frames.js";

const generateMetadata = async () => {
    console.log("here");
    return {
        title: "My Page",
        // provide a full URL to your /frames endpoint
        ...(await fetchMetadata("https://119f7fa195a9.ngrok.app" + "/frames")),
    };
};

export default function Page() {
    const [metadata, setMetadata] = useState({ title: "My Page" });

    useEffect(() => {
        async function fetchAndSetMetadata() {
            const metadata = await generateMetadata();
            console.log("acá");
            console.log({ metadata });
            setMetadata(metadata);
        }

        fetchAndSetMetadata();
    }, []);
    return (
        <div>
            <h1>My existing page</h1>
            {metadata && (
                <div>
                    {/* <Image
                        src={String(metadata["fc:frame:image"])}
                        width={500}
                        height={500}
                        alt="Picture of the author"
                    /> */}
                </div>
            )}
        </div>
    );
}
