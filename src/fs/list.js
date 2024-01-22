import fs from 'fs/promises';

const list = async () => {
    try {
        const files = await fs.readdir('src/fs/files');
        console.log(files);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }
};

await list();