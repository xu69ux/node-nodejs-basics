import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

const compress = async (pathToSource, pathToDestination) => {
    try {
        await fs.promises.access(pathToSource);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error(`FS operation failed: source file ${pathToSource} does not exist`);
        }
        throw err;
    }

    try {
        await fs.promises.access(pathToDestination);
        throw new Error(`FS operation failed: target file ${pathToDestination} already exists`);
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }

    const gzip = zlib.createGzip();
    const source = fs.createReadStream(pathToSource);
    const destination = fs.createWriteStream(pathToDestination);

    await pipelineAsync(source, gzip, destination);
    console.log(`FS operation success: file ${pathToSource} compressed to ${pathToDestination}`);
};

await compress('src/zip/files/fileToCompress.txt', 'src/zip/files/compressed.gz');