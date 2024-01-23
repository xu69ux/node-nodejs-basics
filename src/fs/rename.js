import path from 'path';
import fs from 'fs/promises';

const rename = async (sourceDir, oldFileName, newFileName) => {
    const pathToWrongFile = path.join(sourceDir, oldFileName);
    const pathToProperFile = path.join(sourceDir, newFileName);

    try {
        await fs.access(pathToProperFile);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.rename(pathToWrongFile, pathToProperFile);
        } else {
            throw err;
        }
    }
};

await rename('src/fs/files', 'wrongFilename.txt', 'properFilename.md');