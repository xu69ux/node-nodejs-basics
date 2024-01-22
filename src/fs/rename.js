import fs from 'fs/promises';

const rename = async () => {
    try {
        await fs.access('src/fs/files/properFilename.md');
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.rename('src/fs/files/wrongFilename.txt', 'src/fs/files/properFilename.md');
        } else {
            throw err;
        }
    }
};

await rename();