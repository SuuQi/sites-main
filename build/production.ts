const path = require('path');
const shell = require('shelljs');

shell.cd(path.join(__dirname, '../'));
shell.rm('-rf', 'dist');
shell.mkdir('-p', 'dist/client/assets');
shell.cp('-R', 'client/assets', 'dist/client');
