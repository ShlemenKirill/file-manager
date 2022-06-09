import {copyFile, mkdir, readdir} from "fs";

export const copy = async (originFile, folderToCopy, pathToResultFile) => {
    await readdir(folderToCopy, async (err,files) => {
        if(err){
            await mkdir(folderToCopy,async (err,res) => {
                if (err){
                    throw new Error('mkdir error')
                }
                await copyFile(originFile, pathToResultFile,(err,res)=> {
                    if(err){
                        throw new Error('copy error')
                    }
                })
            })
        }
        if(files){
            await copyFile(originFile, pathToResultFile,(err,res)=> {
                if(err){
                    throw new Error('copy error')
                }
            })
        }
    })
};