import fs from 'fs/promises';

const list = async (pathToDir) => {
    try {
        const files = await fs.readdir(pathToDir);
        console.log(files);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }
};

await list('src/fs/files');