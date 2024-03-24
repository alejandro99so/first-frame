/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import data from "../../data.json";

// import { callContract } from "../../../utils/web3";
const frames = createFrames();
const handleRequest = frames(async (ctx) => {
    console.log({ ctx });
    const baseUrl = `${
        process.env.NEXT_PUBLIC_BASE_URL || "localhost:3000"
    }/frames?value=`;
    // await callContract("AVALANCHE", "safeMint", [
    //     "0x9B1B2994A03877F5C52b10cb2276b82A19ceb2F2",
    //     "https://ipfs.io/ipfs/QmWhnc9HoPdeqFerec8jv5NauQLu8K6EwQKwKHkpvw7s5k",
    // ]);
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
                  <Button
                      action="link"
                      target={`https://32bcc8098140.ngrok.app/transfer`}
                  >
                      {data[Number(ctx?.searchParams?.state ?? 0)].button2 ??
                          data[Number(ctx?.searchParams?.state ?? 0)].button1}
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

{
    /* <Button
                      action="link"
                      target={`https://73b39f3b2003.ngrok.app/transfer`}
                  >
                      {data[Number(ctx?.searchParams?.state ?? 0)].button2}
                  </Button>, */
}
export const GET = handleRequest;
export const POST = handleRequest;
