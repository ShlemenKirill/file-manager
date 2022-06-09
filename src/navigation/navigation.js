import {readdir, access} from 'fs'
export const navigation = async (directoryName) => {
    await access(directoryName, err => {
        if(err){
            throw new Error('Operation failed')
        }
    })
    return directoryName
}

export const getFilesList = async (directoryName) => {
    await readdir(directoryName, async (err,files) => {
        if(err){
            throw new Error('Operation failed')
        }
        console.log(files)
    })
}
