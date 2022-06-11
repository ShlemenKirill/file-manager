import {readFile, writeFile} from "fs/promises";
import {brotliCompress} from "zlib";

export const compress = async (pathToFile, pathToDestination) => {
    const dataFromOriginFile = await readFile(pathToFile, (err, data) => {
        if (err){
            throw new Error('Operation failed')
        }else{
            return data
        }
    })
    await brotliCompress(dataFromOriginFile, async (error, result) => {
        if (error){
            throw new Error(`Operation failed ${error.message}`)
        }
        await writeFile(pathToDestination, result, (err,result) => {
            if(err){
                throw new Error(`Operation failed ${err.message}`)
            }
        })
    })
};