import fs from 'fs/promises';

const read = async (pathToFile) => {
    try {
        const data = await fs.readFile(pathToFile, 'utf-8');
        console.log(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }
};

await read('src/fs/files/fileToRead.txt');