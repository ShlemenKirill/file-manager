import {readFile, rename as renameFunction} from "fs";

export const rename = async (pathToOriginFile, pathToResultFile) => {
    await readFile(pathToOriginFile, (err,result) => {
        if(err){
            throw new Error('Operation failed')
        }
    })
    await readFile(pathToResultFile, (err,result) => {
        if(result){
            throw new Error('Operation failed')
        }
    })
    await renameFunction(pathToOriginFile,pathToResultFile, (err,result) => {
        if(err){
            throw new Error('FS operation failed')
        }
    })
};