import * as readline from 'readline';
import path from "path";
import { stdin as input, stdout as output } from 'node:process';
import {greetings} from "./greetings.js";
import {getOSInfo} from "./os/os.js";
import {getHomeDir} from "./utils/utils.js";
import {getFilesList, navigation} from "./navigation/navigation.js";
import {readFile, create,rename, copy, remove} from './files/index.js'
import {calculateHash} from "./hash/calcHash.js";
import {decompress, compress} from "./zip/index.js";
import {move} from "./files/move.js";

const startup = async () => {
    let currentDir = getHomeDir()
    const rl = readline.createInterface({ input, output });
    const userName = greetings()
    output.write(`\nYou are currently in ${currentDir} `)
    rl.on('line', async (input) => {
        if(input.startsWith('cat')){
            const [, fileName] = input.split(' ')
            if(!fileName){
                output.write(`\nInvalid input`)
                return
            }
            const pathToFile = path.join(currentDir, fileName)
            try{
                await readFile(pathToFile, currentDir)
            }catch (err){
                output.write(`\nOperation failed`)
            }
        }else if(input.startsWith('add')){
            const [, fileName] = input.split(' ')
            if(!fileName){
                output.write(`\nInvalid input`)
                return
            }
            const pathToFile = path.join(currentDir, fileName)
            try{
                await create(pathToFile)
            }catch (err){
                console.log(err)
            }
            output.write(`\nYou are currently in ${currentDir} `)
        }else if(input.startsWith('rn')){
            const [, originFile, resultFile] = input.split(' ')
            if(!originFile || !resultFile){
                output.write(`\nInvalid input`)
                return
            }
            const pathToOriginFile = path.join(currentDir, originFile)
            const pathToResultFile = path.join(currentDir, resultFile)
            try{
                await rename(pathToOriginFile, pathToResultFile)
            }catch (err){
                console.log(err)
            }
            output.write(`\nYou are currently in ${currentDir} `)
        }else if(input.startsWith('cp')){
            const [, originFileName, resultFolder] = input.split(' ')
            if(!originFileName || !resultFolder){
                output.write(`\nInvalid input`)
                return
            }
            const pathToOriginFile = path.join(currentDir, originFileName)
            const pathToResultFolder = path.join(currentDir, resultFolder)
            const pathToResultFile = path.join(pathToResultFolder, originFileName)
            try{
                await copy(pathToOriginFile, pathToResultFolder, pathToResultFile)
            }catch (err){
                console.log(err)
            }
            output.write(`\nYou are currently in ${currentDir} `)
        }else if(input.startsWith('mv')){
            const [, originFileName, resultFolder] = input.split(' ')
            if(!originFileName || !resultFolder){
                output.write(`\nInvalid input`)
                return
            }
            const pathToOriginFile = path.join(currentDir, originFileName)
            const pathToResultFolder = path.join(currentDir, resultFolder)
            const pathToResultFile = path.join(pathToResultFolder, originFileName)
            try{
                await move(pathToOriginFile, pathToResultFolder, pathToResultFile)
            }catch (err){
                console.log(err)
            }
            output.write(`\nYou are currently in ${currentDir} `)
        }
        else if(input.startsWith('rm')){
            const [, originFileName] = input.split(' ')
            if(!originFileName){
                output.write(`\nInvalid input`)
                return
            }
            const pathToOriginFile = path.join(currentDir, originFileName)
            try{
                await remove(pathToOriginFile)
            }catch (err){
                console.log(err)
            }
            output.write(`\nYou are currently in ${currentDir} `)
        }else if(input.startsWith('hash')){
            const [, originFileName] = input.split(' ')
            if(!originFileName){
                output.write(`\nInvalid input`)
                return
            }
            const pathToOriginFile = path.join(currentDir, originFileName)
            try{
                await calculateHash(pathToOriginFile)
            }catch (err){
                console.log(err)
            }
            output.write(`\nYou are currently in ${currentDir} `)
        }else if(input.startsWith('compress')){
            const [, originFileName, destination] = input.split(' ')
            if(!originFileName || !destination){
                output.write(`\nInvalid input`)
                return
            }
            const pathToOriginFile = path.join(currentDir, originFileName)
            const pathToDestination = path.join(currentDir, destination)
            try{
                await compress(pathToOriginFile, pathToDestination)
            }catch (err){
                console.log(err)
            }
            output.write(`\nYou are currently in ${currentDir} `)
        }else if(input.startsWith('decompress')){
            const [, originFileName, destination] = input.split(' ')
            if(!originFileName || !destination){
                output.write(`\nInvalid input`)
                return
            }
            const pathToOriginFile = path.join(currentDir, originFileName)
            const pathToDestination = path.join(currentDir, destination)
            try{
                await decompress(pathToOriginFile,pathToDestination)
            }catch (err){
                console.log(err)
            }
            output.write(`\nYou are currently in ${currentDir} `)
        }else if(input === 'ls'){
            await getFilesList(currentDir)
            output.write(`\nYou are currently in ${currentDir} `)
        }else if(input === 'up'){
            const newFolder = path.join(currentDir, '../')
            try{
                currentDir = await navigation(newFolder)
            }catch (err){
                output.write(`\nOperation failed`)
            }
            output.write(`\nYou are currently in ${currentDir} `)
        }else if(input.startsWith('cd')){
            const [, pathToFolder] = input.split(' ')
            if(!pathToFolder){
                output.write(`\nInvalid input`)
                return
            }
            const newFolder = path.join(currentDir, pathToFolder)
            try{
                currentDir = await navigation(newFolder)
            }catch (err){
                output.write(`\nOperation failed`)
            }
            output.write(`\nYou are currently in ${currentDir} `)
        }else if(input === '.exit'){
            rl.close();
        }else if(input.startsWith('os')){
            const [, flag] = input.split('--')
            if(!flag){
                output.write(`\nInvalid input`)
                return
            }
            getOSInfo(flag)
            output.write(`\nYou are currently in ${currentDir} `)
        }else{
            if(input.length > 0){
                output.write(`\nInvalid input`)
            }else {
                output.write(`\nYou are currently in ${currentDir} `)
            }
        }
    })
    rl.on('close', () => {
        output.write(`\nThank you for using File Manager, ${userName}!`)
    })
}

startup().catch(err => console.log(err.message))