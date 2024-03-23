/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import data from "../../data.json";
const frames = createFrames();
const handleRequest = frames(async (ctx) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "localhost:3000"
        }/frames?value=`;
    return {
        image: (<span>{data.options.title}</span>),
        buttons: [
            <Button action="post" target="https://google.com">
                {data.options.button1}
            </Button>,
            <Button action="post" target={`${baseUrl}sell`}>
                {data.options.button2}
            </Button>,
        ],
    };
});

export const GET = handleRequest;
export const POST = handleRequest;
