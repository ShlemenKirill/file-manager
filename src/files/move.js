import {copyFile, mkdir, readdir} from "fs";
import {stdout as output} from "node:process";
import {remove} from "./delete.js";

export const move = async (originFile, folderToCopy, pathToResultFile) => {
    await readdir(folderToCopy, async (err,files) => {
        if(err){
            await mkdir(folderToCopy,async (err,res) => {
                if (err){
                    output.write(`\nOperation failed`)
                }
                await copyFile(originFile, pathToResultFile,(err,res)=> {
                    if(err){
                        output.write(`\nOperation failed`)
                    }
                })
            })
        }
        if(files){
            await copyFile(originFile, pathToResultFile,(err,res)=> {
                if(err){
                    output.write(`\nOperation failed`)
                }
                remove(originFile)
            })
        }
    })
};