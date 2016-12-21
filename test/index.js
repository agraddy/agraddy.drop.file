var ch = require('assert');

var tap = require('agraddy.test.tap')(__filename);
var response = require('agraddy.test.res');

var drop = require('../');

// Create a fake response stream
var res = response();
var res2 = response();

process.chdir('test');

res.on('finish', function() {
	console.log('finish');
	tap.assert.deepEqual(res._headers[0], {"Content-Type": "text/plain"}, 'Content-Type header should be set.');
	tap.assert.equal(res._body, 'test\n', 'Body should match contents.');
});

drop('views/test.txt')(null, {}, res);


res2.on('finish', function() {
	console.log('finish2');
	tap.assert.deepEqual(res2._headers, [{"Content-Type": "application/json"}], 'Content-Type should be json');
	tap.assert.equal(res2._body, '{"code": 404, "status": "error"}', 'Should show a 404 error.');
});

drop('views/.htacess')(null, {}, res2);

