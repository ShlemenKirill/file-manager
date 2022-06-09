import {readFile, writeFile} from "fs";

export const create = async (pathToFile) => {
    await readFile(pathToFile, (err,result) => {
        if(result){
            throw new Error('Operation failed')
        }
    })
    await writeFile(pathToFile, '', (err,result) => {
        if(err){
            throw new Error(err.message)
        }
    })
};