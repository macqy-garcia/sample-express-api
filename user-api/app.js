const express = require('express');

const app = express();

app.use(express.json());

let products = [];

app.get('/', (req, res) => {
	res.send('HELLO WORD MICHAEL JHUN');
});

app.post('/', (req, res) => {
	console.log(req.body.username);

	if (req.body.username === 'macqy') {
		res.send('IKAW NGA C MACQY');
	}

	res.send('Ikaw ay isang imposter');
});

app.post('/product', (req, res) => {
	// SAVE SA DATABASE
	products.push({
		name: req.body.name,
		price: req.body.price,
		expiry: req.body.expiry,
	});

	res.json({
		message: 'Yehey naSave na ang product',
		products: products,
	});
});

app.listen(3000);
