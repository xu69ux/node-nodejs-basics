import crypto from 'crypto';
import fs from 'fs/promises';

const calculateHash = async (pathToFile, hashType = 'sha256') => {
    const hash = crypto.createHash(hashType);
    const data = await fs.readFile(pathToFile);
    
    hash.update(data);
    const result = hash.digest('hex');
    console.log(result);
};

await calculateHash('src/hash/files/fileToCalculateHashFor.txt');