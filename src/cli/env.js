const parseEnv = () => {
    const results = [];
    for (const [key, value] of Object.entries(process.env)) {
        if (key.startsWith('RSS_')) {
            results.push(`${key}=${value}`);
        }
    }
    return console.log(results.join('\n'));
};

parseEnv();