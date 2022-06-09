import * as os from 'os'
export const getOSInfo = (flag) => {
    let result = ''
    switch (flag){
        case 'EOL': {
            console.log(os.EOL)
            break;
        }
        case 'cpus': {
            console.log(os.cpus())
            break;
        }
        case 'homedir': {
            console.log(os.homedir())
            break;
        }
        case 'username': {
            console.log(os.userInfo())
            break;
        }
        case 'architecture': {
            console.log(os.userInfo())
            break;
        }
        default: break;
    }
    return result
}