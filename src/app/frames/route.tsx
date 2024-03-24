import { createFrames, Button } from "frames.js/next";
import data from "../../data.json";

// import { callContract } from "../../../utils/web3";
const frames = createFrames();

const stateMap = {
    0: "options",
    1: "create1",
    2: "create2",
    3: "create3",
    4: "create4",
    5: "create5",
};

let inputsValues = {
    name: "",
    description: "",
    image: "",
    attributes: {
        value: "",
        trait_type: ""
    }
};

const handleRequest = frames(async (ctx) => {

    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "localhost:3000"}/frames?value=`;

    let nextStates = {};
    const totalStates = Object.keys(stateMap).length;
    const currentStateIndex = Number(ctx?.searchParams?.state ?? 0);

    const stateKey = stateMap[Number(ctx?.searchParams?.state ?? 0)];
    const currentStateData = data[stateKey];

    let buttonText = currentStateData.button1;
    let textInputValue = ctx?.message?.inputText;

    switch (stateKey) {
        case 'create1':
            inputsValues.name = textInputValue;
            break;
        case 'create2':
            inputsValues.description = textInputValue;
            break;
        case 'create3':
            inputsValues.image = textInputValue;
            break;
        case 'create4':
            inputsValues.attributes.value = textInputValue;
        case 'create5':
            inputsValues.attributes.trait_type = textInputValue;
            break;
    }

    console.log("Valores de los inputs:", inputsValues);

    if (stateKey === 'options') {
        nextStates = {
            create: "1"
        };
    } else if (currentStateIndex < totalStates - 1) {
        const nextState = currentStateIndex + 1;
        nextStates = {
            next: nextState.toString(),
        };
    } else {
        buttonText = "Finish";
        nextStates = {
            create: "0"
        };
    }
    const response = {
        image: (
            <span>
                {currentStateData.title}
            </span>
        ),
        buttons: [
            currentStateData.button1 && (
                <Button
                    action="post"
                    target={`${baseUrl}create&state=${nextStates.create || nextStates.next}`}
                >
                    {buttonText}
                </Button>
            ),
            currentStateData.button2 && (
                <Button
                    action="link"
                    target={`https://73b39f3b2003.ngrok.app/transfer`}
                >
                    {currentStateData.button2}
                </Button>
            )
        ].filter(Boolean)
    };

    if (stateKey.startsWith('create')) {
        response.textInput = currentStateData.title;
    }

    return response;
});

{
}
export const GET = handleRequest;
export const POST = handleRequest;
