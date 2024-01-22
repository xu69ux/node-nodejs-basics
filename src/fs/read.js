import fs from 'fs/promises';

const read = async () => {
    try {
        const data = await fs.readFile('src/fs/files/fileToRead.txt', 'utf-8');
        console.log(data);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }
};

await read();