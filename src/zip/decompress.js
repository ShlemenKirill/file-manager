import {brotliDecompress} from "zlib";
import {createReadStream} from "node:fs";
import {stdout as output} from "node:process";
import {createWriteStream} from "fs";

export const decompress = async (pathToFile, pathToDestination) => {
    let dataFromOriginFile = ''
    const readableStream = createReadStream(pathToFile)
    const writableStream = createWriteStream(pathToDestination)
    readableStream.on('error', (err) => {
        output.write(`\nOperation failed\n`)
    })
    readableStream.on('data', (chunk) => {
        dataFromOriginFile += chunk
    })
    readableStream.on('end', async () => {
        await brotliDecompress(dataFromOriginFile, async (error, result) => {
            if (error){
                console.log(error)
                //throw new Error(`Operation failed ${error.message}`)
            }
            writableStream.write(result)
            writableStream.on('error', (err) => {
                output.write(`\nOperation failed\n`)
            })
        })
    })
};
