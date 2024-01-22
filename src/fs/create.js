import fs from 'fs/promises';

const create = async () => {
    try {
        await fs.access('src/fs/files/fresh.txt');
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.writeFile('src/fs/files/fresh.txt', 'I am fresh and young');
        } else {
            throw err;
        }
    }
};

await create();