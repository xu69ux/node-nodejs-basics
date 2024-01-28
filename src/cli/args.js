const parseArgs = () => {
    const args = process.argv.slice(2);
    let results = [];
    for (let i = 0; i < args.length; i += 2) {
        let result = `${args[i].slice(2)} is ${args[i + 1]}`;
        results.push(result);
    }
    console.log(results.join('\n'));
};

parseArgs();