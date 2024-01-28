import path from 'path';
import fs from 'fs/promises';

const copy = async (sourceDir, targetDir) => {
    try {
        await fs.access(sourceDir);
        await fs.access(targetDir);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            if (err.path === sourceDir) {
                throw new Error('FS operation failed');
            } else {
                await fs.mkdir(targetDir);
                const files = await fs.readdir(sourceDir);
                await Promise.all(files.map(file => {
                    const pathToSourceDir = path.join(sourceDir, file);
                    const pathToTargetDir = path.join(targetDir, file);
                    return fs.copyFile(pathToSourceDir, pathToTargetDir);
                }));
            }
        } else {
            throw err;
        }
    }
};

await copy('src/fs/files', 'src/fs/files_copy');