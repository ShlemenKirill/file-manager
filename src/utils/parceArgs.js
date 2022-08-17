export const parseArgs = () => {
    const [executer, file, ...rest] = process.argv
    const resArray = [];
    rest.forEach((value) => {
        if (value.startsWith('--')) {
            resArray.push(value)
        }
    })
    return resArray
};