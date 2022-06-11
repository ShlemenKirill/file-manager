import {readFile} from "fs";
import {createHash} from "crypto";

export const calculateHash = async (pathToFile) => {
    await readFile(pathToFile, (err,result) => {
        if (err){
            throw new Error(err.message)
        }
        const hash = createHash('sha256').update(result).digest('hex')
        console.log(hash)
    })
};