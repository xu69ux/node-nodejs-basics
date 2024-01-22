import fs from 'fs/promises';

const remove = async () => {
    try {
        await fs.unlink('src/fs/files/fileToRemove.txt');
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }
};

await remove();