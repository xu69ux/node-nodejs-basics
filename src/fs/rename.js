import path from 'path';
import fs from 'fs/promises';

const rename = async (sourceDir, oldFileName, newFileName) => {
    const pathToWrongFile = path.join(sourceDir, oldFileName);
    const pathToProperFile = path.join(sourceDir, newFileName);

    try {
        await fs.access(pathToWrongFile);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error(`FS operation failed: source file ${pathToWrongFile} does not exist`);
        }
        throw err;
    }

    try {
        await fs.access(pathToProperFile);
        throw new Error(`FS operation failed: target file ${pathToProperFile} already exists`);
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }
    
    await fs.rename(pathToWrongFile, pathToProperFile);
    console.log(`FS operation success: file ${pathToWrongFile} renamed to ${pathToProperFile}`);
};

await rename('src/fs/files', 'wrongFilename.txt', 'properFilename.md');