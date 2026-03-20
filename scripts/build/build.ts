import { transformFile } from '@swc/core';
import { transform } from 'lightningcss';
import { resolve, relative, dirname, basename } from 'node:path';
import { rm, mkdir, writeFile, readFile } from 'node:fs/promises';
import FastGlob from 'fast-glob';
import { generateDefinition } from './definition';

const SRC_DIR = resolve('src');
const DIST_DIR = resolve('dist');

const processJsFiles = async (
    pattern: string,
    subDir: string,
    filter?: (file: string) => boolean,
) => {
    const files = await FastGlob(pattern, {
        cwd: SRC_DIR,
        absolute: true,
    });

    const tasks = files.map(async file => {
        if (filter && !filter(file)) {
            return;
        }

        const relPath = relative(resolve(SRC_DIR, subDir), file);
        const outFile = resolve(DIST_DIR, subDir, relPath);

        const { code } = await transformFile(file);

        await mkdir(dirname(outFile), { recursive: true });
        await writeFile(outFile, code);
    });

    await Promise.all(tasks);
};

const processCssFiles = async (
    pattern: string,
    subDir: string,
    filter?: (file: string) => boolean,
) => {
    const files = await FastGlob(pattern, {
        cwd: SRC_DIR,
        absolute: true,
    });

    const tasks = files.map(async file => {
        if (filter && !filter(file)) {
            return;
        }

        const relPath = relative(resolve(SRC_DIR, subDir), file);
        const outFile = resolve(DIST_DIR, subDir, relPath);

        const source = await readFile(file);

        const { code } = transform({
            filename: file,
            code: Buffer.from(source),
            minify: false,
            sourceMap: false,
        });

        await mkdir(dirname(outFile), { recursive: true });
        await writeFile(outFile, code);
    });

    await Promise.all(tasks);
};

const build = async () => {
    await rm(DIST_DIR, { recursive: true, force: true });

    await mkdir(resolve(DIST_DIR, 'gadgets'), { recursive: true });

    await writeFile(`${DIST_DIR}/gadgets/Gadgets-definition`, await generateDefinition());

    await processJsFiles('gadgets/*/*.js', 'gadgets', file => {
        const relPath = relative(resolve(SRC_DIR, 'gadgets'), file);
        const dir = basename(dirname(relPath));
        const filename = basename(relPath);
        return filename === `Gadget-${dir}.js`;
    });
    await processCssFiles('gadgets/*/*.css', 'gadgets', file => {
        const relPath = relative(resolve(SRC_DIR, 'gadgets'), file);
        const dir = basename(dirname(relPath));
        const filename = basename(relPath);
        return filename === `Gadget-${dir}.css`;
    });

    await processJsFiles('global/*.js', 'global');
    await processCssFiles('global/*.css', 'global');
};

export { build };
