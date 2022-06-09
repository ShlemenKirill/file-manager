import {createReadStream} from "fs";


export const readFile = async (pathToFile) => {
    let data = ''
    const readableStream = await createReadStream(
        pathToFile, {encoding: 'utf-8'}
    )
    readableStream.on('data', (chunk) => {
        data += chunk
    })
    readableStream.on('error', (err) => {
        throw new Error('Operation failed')
    })
    readableStream.on('end', (chunk) => {
        process.stdout.write(data)
    })
}