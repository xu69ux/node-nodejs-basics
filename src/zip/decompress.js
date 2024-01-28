import fs, { access } from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';  
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

const decompress = async (pathToSource, pathToDestination) => {
    try {
        await fs.promises.access(pathToSource);
        await fs.promises.access(pathToDestination);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            if (err.path === pathToSource) {
                throw new Error('FS operation failed');
            } else {
                const gunzip = zlib.createGunzip();
                const source = fs.createReadStream(pathToSource);
                const destination = fs.createWriteStream(pathToDestination);

                await pipelineAsync(source, gunzip, destination);
            }
        } else {
            throw err;
        }
    }
};

await decompress('src/zip/files/compressed.gz', 'src/zip/files/fileAfterDecompress.txt');