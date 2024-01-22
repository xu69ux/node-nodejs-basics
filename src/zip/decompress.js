import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';  
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

const decompress = async () => {
    const gunzip = zlib.createGunzip(); 
    const source = fs.createReadStream('src/zip/compress.gz');
    const destination = fs.createWriteStream('src/zip/files/fileAfterDecompress.txt');

    await pipelineAsync(source, gunzip, destination);
};

await decompress();