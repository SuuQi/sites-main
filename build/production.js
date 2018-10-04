const path = require('path');
const shell = require('shelljs');

shell.cd(path.join(__dirname, '../'));
shell.rm('-rf', 'dist/client');
shell.mkdir('-p', 'dist/client/public/assets');
shell.cp('-R', 'client/assets', 'dist/client/public');
