import {unlink} from "fs";

export const remove = async (pathToOriginFile) => {
    await unlink(pathToOriginFile, (err,result) => {
        if(err){
            throw new Error("Operation failed")
        }
    })
}