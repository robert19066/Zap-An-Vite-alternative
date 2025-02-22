import express from 'express';
import { build } from 'esbuild';
import chalk from 'chalk';
import { watch } from 'chokidar';
const print = console.log;

const app = express();

app.use(express.static('public'));

console.log(chalk.yellow("Zap! The tool for real-time coding"));

app.listen(3000, () => {
    print(chalk.green('Server is running on http://localhost:3000'));
});

// Build the project with esbuild
const buildOptions = {
    entryPoints: ['src/index.js'],
    outdir: 'public',
    bundle: true,
    sourcemap: true,
};

build(buildOptions).then(() => {
    print(chalk.gray('Initial build completed'));
}).catch(() => process.exit(1));

// Watch for changes in multiple directories
const watcher = watch(['src/**/*.js', 'public/**/*.html', 'src/**/*.css']);

watcher.on('change', (path) => {
    print(`${chalk.blueBright("[Zap Watcher]")} ${chalk.gray("Modifications observed in")} ${path}`);
    build(buildOptions).then(() => {
        print(chalk.greenBright("Code rebuild successfully!"));
    }).catch(() => {
        print(chalk.redBright("Uh oh, something went wrong!"));
        process.exit(1);
    });
});
