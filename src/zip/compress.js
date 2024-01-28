import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

const compress = async (pathToSource, pathToDestination) => {
    try {
        await fs.promises.access(pathToSource);
        await fs.promises.access(pathToDestination);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            if (err.path === pathToSource) {
                throw new Error('FS operation failed');
            } else {
                const gzip = zlib.createGzip();
                const source = fs.createReadStream(pathToSource);
                const destination = fs.createWriteStream(pathToDestination);

                await pipelineAsync(source, gzip, destination);
            }
        } else {
            throw err;
        }
    }
};

await compress('src/zip/files/fileToCompress.txt', 'src/zip/files/compressed.gz');