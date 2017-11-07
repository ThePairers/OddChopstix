var shutterstock = require('shutterstock');
var shutter = shutterstock.v2({
  clientId: 'd30de-271bd-600fc-1d7e5-f941e-ee3ee',
  clientSecret: 'f9fdd-d9931-2229a-b0a27-a59c2-d0835',
});

module.exports = function(app) {

	app.get('/api/shutter/:query', function(req, res) {
		console.log('app image search func runs shutterstock');
		var query = req.params.query;
		shutter.image.search(query, function(err, data) {

			res.json(data);
		});
	});
};