import {createReadStream, rename as renameFunction} from "fs";
import {stdout as output} from "node:process";

export const rename = async (pathToOriginFile, pathToResultFile) => {
    const readOriginFile = createReadStream(pathToOriginFile)
    readOriginFile.on('error', (err) => {
        output.write(`\nOperation failed`)
    })

    await renameFunction(pathToOriginFile,pathToResultFile, (err,result) => {
        if(err){
            output.write(`\nOperation failed`)
        }
    })
};