import { spawn } from 'child_process';

const spawnChildProcess = async (args) => {
    const cp = spawn( 'node', ['./src/cp/files/script.js', ...args] );
    process.stdin.pipe( cp.stdin );
    cp.stdout.pipe( process.stdout );
};

spawnChildProcess( ['a' , 'b', 'c', 'd'] );
