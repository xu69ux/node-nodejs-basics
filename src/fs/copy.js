import path from 'path';
import fs from 'fs/promises';

const copy = async (sourceDir, targetDir) => {
    try {
        await fs.access(sourceDir);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error(`FS operation failed: source directory ${sourceDir} does not exist`);
        }
        throw err;
    }

    try {
        await fs.access(targetDir);
        throw new Error(`FS operation failed: target directory ${targetDir} already exists`);
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }

    await fs.mkdir(targetDir);
    const files = await fs.readdir(sourceDir);
    await Promise.all(files.map(file => {
        const pathToSourceFile = path.join(sourceDir, file);
        const pathToTargetFile = path.join(targetDir, file);
        return fs.copyFile(pathToSourceFile, pathToTargetFile);
    }));
    console.log(`FS operation success: ${files.length} files copied from ${sourceDir} to ${targetDir}`);
};

await copy('src/fs/files', 'src/fs/files_copy');