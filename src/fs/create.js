import path from 'path';
import fs from 'fs/promises';

const create = async (pathToFile) => {
    try {
        await fs.access(pathToFile);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.writeFile(pathToFile, 'I am fresh and young');
        } else {
            throw err;
        }
    }
};

await create(path.join('src/fs/files', 'fresh.txt'));