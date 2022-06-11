import {createReadStream} from "node:fs";
import {stdout as output} from "node:process";

export const readFile = async (pathToFile, currentDir) => {
    let data = ''
    const readableStream = await createReadStream(pathToFile)
    readableStream.on('error', (err) => {
        output.write(`\nOperation failed\n`)
    })
    readableStream.on('data', (chunk) => {
        data += chunk
    })
    readableStream.on('end', (chunk) => {
        console.log(data)
        output.write(`\nYou are currently in ${currentDir} `)
    })
}