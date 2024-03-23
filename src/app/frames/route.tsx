/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";

const frames = createFrames();
const handleRequest = frames(async (ctx) => {
    const baseUrl = `${
        process.env.NEXT_PUBLIC_BASE_URL || "localhost:3000"
    }/frames?value=`;
    return {
        image: (
            <span>
                {ctx.pressedButton
                    ? `I clicked ${ctx.searchParams.value}`
                    : `Click some button`}
            </span>
        ),
        buttons: [
            <Button action="post" target={`${baseUrl}Yes`}>
                Say Yes
            </Button>,
            <Button action="post" target={`${baseUrl}No`}>
                Say No
            </Button>,
        ],
    };
});

export const GET = handleRequest;
export const POST = handleRequest;
