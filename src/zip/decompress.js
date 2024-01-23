import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';  
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

const decompress = async (pathToSource, pathToDestination) => {
    const gunzip = zlib.createGunzip(); 
    const source = fs.createReadStream(pathToSource);
    const destination = fs.createWriteStream(pathToDestination);

    await pipelineAsync(source, gunzip, destination);
};

await decompress('src/zip/compress.gz', 'src/zip/files/fileAfterDecompress.txt');