import {parseArgs} from "./utils/parceArgs.js";
import { stdout as output } from 'node:process';

export const greetings = () => {
    const envVariables = parseArgs()
    const splitedUsername = envVariables[0].split('=')
    output.write(`Welcome to the File Manager, ${splitedUsername[1]}! \n`)
    return splitedUsername[1]
}
