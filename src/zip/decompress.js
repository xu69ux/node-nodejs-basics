import fs, { access } from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';  
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

const decompress = async (pathToSource, pathToDestination) => {
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
    const gunzip = zlib.createGunzip();
    const source = fs.createReadStream(pathToSource);
    const destination = fs.createWriteStream(pathToDestination);

    await pipelineAsync(source, gunzip, destination);
};

await decompress('src/zip/files/compressed.gz', 'src/zip/files/fileAfterDecompress.txt');