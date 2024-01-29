import path from 'path';
import fs from 'fs/promises';

const remove = async (pathToFile) => {
    try {
        await fs.unlink(pathToFile);
        console.log(`FS operation success: file ${pathToFile} removed`);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw err;
        }
    }
};

await remove(path.join('src/fs/files', 'fileToRemove.txt'));