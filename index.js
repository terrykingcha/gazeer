#!/usr/bin/env node


'use strict';

var path = require('path');
var gaze = require('gaze');
var npmlog = require('npmlog');
var exec = require('exec-sh');

var argv = require('yargs').usage('Usage: gaze -p \'<your pattern1>\' -p \'<your pattern2>\' -c \'<your command1>\' -c \'<your command2>\' \n\n You can use $filepath, $basename, $dirname in command for placeholder').example('gaze -p \'**/*.js\' -c \'babel $filepath -o $dirname/build/$basename\'').demand('p').alias('p', 'pattern').describe('p', 'Files to watch, globbing supported.').demand('c').alias('c', 'command').describe('c', 'Command to run, if multi command specified, it will run in order.').argv;

var patterns = void 0;
var commands = void 0;

if (typeof argv.pattern === 'string') {
    patterns = [argv.pattern];
} else {
    patterns = argv.pattern.slice(0);
}

if (typeof argv.command === 'string') {
    commands = [argv.command];
} else {
    commands = argv.command.slice(0);
}

function runCommands(cmds) {
    if (cmds.length === 0) {
        npmlog.info('done!');
        return;
    }

    var cmd = cmds.shift();

    npmlog.info('run', '%s', cmd);

    exec(cmd, {
        cwd: process.cwd(),
        env: process.env,
        stdio: 'inherit'
    }, function (err) {
        if (err) {
            npmlog.error('exit: ', '%s', err);
        }
        runCommands(cmds);
    });
}

gaze(patterns, function (err) {
    if (err) {
        throw new Error(err);
    }

    var fileCount = Object.keys(this.watched()).length;

    npmlog.info('gaze', 'Watching %d file[s] (%s)', fileCount, patterns.join(', '));

    this.on('all', function (event, filepath) {
        npmlog.info('gazeer', '`%s` %s', filepath, event);

        var basename = path.basename(filepath);
        var dirname = path.dirname(filepath);
        var cmds = commands.map(function (cmd) {
            return cmd.replace(/\$filepath/g, filepath).replace(/\$basename/g, basename).replace(/\$dirname/g, dirname);
        });

        runCommands(cmds);
    });
});
