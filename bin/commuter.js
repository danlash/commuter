#!/usr/bin/env node

var commuterComputer = require('../lib/commuter/computer')
    , argv = require('optimist')
      .usage('Usage: $0 --start <address> --end <address>')
      .demand('s')
      .alias('s', 'start')
      .describe('s', 'Where to start - home or work address')
      .demand('e')
      .alias('e', 'end')
      .alias('e', 'dest')
      .describe('e', 'Where to end - home or work address')
      .boolean('v')
      .alias('v', 'verbose')
      .describe('v', 'Verbose flag turns on the noise')
      .argv;

var times = commuterComputer(argv, console.log);
times.forEach(function(time) {
  console.log("It will take " + time + " to commute right now.");
});