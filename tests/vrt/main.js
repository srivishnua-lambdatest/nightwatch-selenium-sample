const compareImages = require("resemblejs/compareImages");
const fs = require("mz/fs");

image1 = "/workspace/nightwatch-selenium-sample/27-12-35-0/output.png";
image2 = "/workspace/nightwatch-selenium-sample/27-12-43-39/test-output.png";

async function getDiff() {
    const options = {
        output: {
            errorColor: {
                red: 255,
                green: 0,
                blue: 255
            },
            errorType: "movement",
            transparency: 0.3,
            largeImageThreshold: 100,
            useCrossOrigin: false,
            outputDiff: true
        },
        scaleToSameSize: true,
        ignore: "antialiasing"
    };
    
    var today = new Date();
    var time = today.getDate() + '-' + today.getHours() + '-' + today.getMinutes() + '-' + today.getUTCSeconds();
    // The parameters can be Node Buffers
    // data is the same as usual with an additional getBuffer() function
    const data = await compareImages(
        await fs.readFile(image1),
        await fs.readFile(image2),
        options
    );
 
    await fs.writeFile(`./VRT_Output/${time}-output.png`, data.getBuffer());
}
 
getDiff();