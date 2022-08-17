import {createWriteStream} from "fs";
import {stdout as output} from "node:process";

export const create = async (pathToFile) => {
    const writableStream = await createWriteStream(pathToFile)
    writableStream.on('error', (err) => {
        output.write(`\nOperation failed`)
    })
};