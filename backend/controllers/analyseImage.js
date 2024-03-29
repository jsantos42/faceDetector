//==============================================================================
// API INITIALIZATION
//==============================================================================
const Clarifai = require('clarifai');
const app = new Clarifai.App({
	apiKey: process.env.API_KEY,
})

const analyseImage = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => res.json(data))
		.catch(err => res.status(400).json('Failed to call API.'));
}

module.exports = {analyseImage};