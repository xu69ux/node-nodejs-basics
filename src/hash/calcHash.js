import crypto from 'crypto';
import fs from 'fs';

const calculateHash = (pathToFile, hashType = 'sha256') => {
    const hash = crypto.createHash(hashType);
    const readStream = fs.createReadStream(pathToFile);

    readStream.on('data', (chunk) => {
        hash.update(chunk);
    });

    readStream.on('end', () => {
        const result = hash.digest('hex');
        console.log(result);
    });

    readStream.on('error', (err) => {
        console.error(`Error reading file: ${err}`);
    });
};

calculateHash('src/hash/files/fileToCalculateHashFor.txt');