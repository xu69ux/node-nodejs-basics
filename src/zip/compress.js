import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

const compress = async (pathToSource, pathToDestination) => {
    const gzip = zlib.createGzip();
    const source = fs.createReadStream(pathToSource);
    const destination = fs.createWriteStream(pathToDestination);
    
    await pipelineAsync(source, gzip, destination);
};

await compress('src/zip/files/fileToCompress.txt', 'src/zip/compress.gz');