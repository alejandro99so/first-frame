/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import data from "../../data.json";
const frames = createFrames();
const handleRequest = frames(async (ctx) => {
    console.log({ ctx });
    const baseUrl = `${
        process.env.NEXT_PUBLIC_BASE_URL || "localhost:3000"
    }/frames?value=`;
    return {
        image: (
            <span>
                {data[Number(ctx?.searchParams?.state ?? 0)].title} STATE=
                {ctx?.searchParams?.state ?? 0}
            </span>
        ),
        buttons: data[Number(ctx?.searchParams?.state ?? 0)].button2
            ? [
                  <Button action="post" target={`${baseUrl}create&state=${1}`}>
                      {data[Number(ctx?.searchParams?.state ?? 0)].button1}
                  </Button>,
                  <Button action="post" target={`${baseUrl}sell&state=${2}`}>
                      {data[Number(ctx?.searchParams?.state ?? 0)].button2}
                  </Button>,
              ]
            : [
                  <Button
                      action="post"
                      target={`${baseUrl}create&state=${
                          Number(ctx?.searchParams?.state ?? 0) + 1
                      }`}
                  >
                      {data[Number(ctx?.searchParams?.state ?? 0)].button1}
                  </Button>,
              ],
    };
});

export const GET = handleRequest;
export const POST = handleRequest;
