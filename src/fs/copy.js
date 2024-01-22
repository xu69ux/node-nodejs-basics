import fs from 'fs/promises';
import path from 'path';

const copy = async () => {
    try {
        await fs.access('src/fs/files_copy');
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.mkdir('src/fs/files_copy');
            const files = await fs.readdir('src/fs/files');
            for (const file of files) {
                await fs.copyFile(path.join('src/fs/files', file), path.join('src/fs/files_copy', file));
            }
        } else {
            throw err;
        }
    }
};

await copy();
