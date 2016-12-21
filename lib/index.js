var fs = require('fs');
var mime = require('mime-types');

var mod;

mod = function(input) {
	var rs;
	var type = mime.lookup(input);

	if(type) {
		rs = fs.createReadStream(input);
		function out(err, req, res, lug) {
			res.writeHead(200, {'Content-Type': type});
			rs.pipe(res);
		};

		return out;
	} else {
		function fail(err, req, res, lug) {
			res.writeHead(404, {"Content-Type": "application/json"});
			res.write('{"code": 404, "status": "error"}');
			res.end();
		};

		return fail;
	}

}

module.exports = mod;
