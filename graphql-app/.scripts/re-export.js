#!/usr/bin/env node
const fs = require('fs'),
  glob = require('glob-promise'),
  path = require('path');

async function generateOutput(dir) {
  const files = await glob(path.join(dir, '**/*{.ts,.tsx}'));
  const content = files
    .filter((f) => !/index/.test(f))
    .map((f) => '.' + f.replace(dir, '').replace(/\.tsx?/, ''))
    .reduce((acc, val) => acc + `export * from "${val}"\n`, '');
  fs.writeFileSync(path.join(dir, 'index.ts'), content, { encoding: 'utf8' });
}

generateOutput(process.argv[2]).then(() => process.exit(0));
