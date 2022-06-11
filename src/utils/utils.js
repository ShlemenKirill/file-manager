import * as os from 'os'

export const getHomeDir = () => {
    return os.homedir()
}