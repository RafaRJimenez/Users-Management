const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Posts

router.get('/', async (req, res) => {
	const posts = await loadPostsCollection();
	res.send(await posts.find({}).toArray());
});

//Add Post

router.post('/', async (req, res) => {
	const posts = await loadPostsCollection();
	await posts.insertOne({
		name: req.body.text,
		surname: req.body.surname,
		email: req.body.email,
		country: req.body.country,
		createdAt: new Date()
	});
	res.status(201).send();
});

// Delete Post

router.delete('/:id', async (req, res) => {
	const posts = await loadPostsCollection();
	await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id)});
	res.status(200).send();
});



// Update post 

router.put('/:id', async (req, res) => {
	const posts = await loadPostsCollection();
	
	await posts.findOneAndUpdate(
    {_id: new mongodb.ObjectID(req.params.id)},
    { $set: { name: req.body.name,
    			surname: req.body.surname,
    			email: req.body.email,
    			country: req.body.country
     } },
    {new: true, passRawResult: true},
    (err, doc, raw) => { })
	res.status(200).send();

});





async function loadPostsCollection() {
	const client = await mongodb.MongoClient.connect 
	('mongodb://abc123:abc123@ds123346.mlab.com:23346/vue_express', {
		useNewUrlParser: true
	});

	return client.db('vue_express').collection('posts');

}


module.exports = router;