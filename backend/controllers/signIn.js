const signIn = (req, res, db, bcrypt) => {
	const errorMessage = 'Wrong credentials.';
	const {email, password} = req.body;
	if (!email || !password)
		res.status(400).json('Every field must be filled in.');
	else
		db.select('email', 'hash').from('login').where('email', email)
			.then(data => {
				 bcrypt.compare(password, data[0].hash, (err, isPasswordValid) => {
					 if (isPasswordValid) {
						 db.select().from('users').where('email', email)
							  .then(user => res.json(user[0]))
							  .catch(err => {
								  console.log(err);
								  res.status(400).json('Unable to get user.');
							  });
					 }
					 else
						 res.status(400).json(errorMessage);
				 })
			})
			.catch(err => {
				 console.log(err);
				 res.status(400).json(errorMessage);
			});
}

module.exports = {signIn};