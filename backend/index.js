const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./services/db')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const db = require('./services/db')

const Users = require('./services/db')





app.use(express.json())

app.use(cors())

mongoose.connect('mongodb://localhost:27017/datas')

//     const user = await User.findOne({
// 		email: req.body.email,
// 	})

// 	if (!user) {
// 		return { status: 'error', error: 'Invalid login' }
// 	}

// 	const isPasswordValid = await bcrypt.compare(
// 		req.body.password,
// 		user.password
// 	)

// 	if (isPasswordValid) {
// 		const token = jwt.sign(
// 			{
// 				name: user.name,
// 				email: user.email,
// 			},
// 			'secret123'
// 		)

// 		return res.json({ status: 'ok', user: token })
// 	} else {
// 		return res.json({ status: 'error', user: false })
// 	}
// })
app.post("/login", async (req,res)=>{
const {email,password} = req.body;
User.findOne({email:email})
.then(user=> {
	if(user){
	if(user.password === password){
		res.json("sucess")
	}else{
		res.json("password incorrect")
	}
	}else{
		res.json("not existed")
	}
})
})


app.post('/register',async (req,res)=>{
      console.log(req.body);
      try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

// app.get('/quote', async (req, res) => {
// 	const token = req.headers['x-access-token']

// 	try {
// 		const decoded = jwt.verify(token, 'secret123')
// 		const email = decoded.email
// 		const user = await User.findOne({ email: email })

// 		return res.json({ status: 'ok', quote: user.quote })
// 	} catch (error) {
// 		console.log(error)
// 		res.json({ status: 'error', error: 'invalid token' })
// 	}
// })

// app.post('/quote', async (req, res) => {
// 	const token = req.headers['x-access-token']

// 	try {
// 		const decoded = jwt.verify(token, 'secret123')
// 		const email = decoded.email
// 		await User.updateOne(
// 			{ email: email },
// 			{ $set: { quote: req.body.quote } }
// 		)

// 		return res.json({ status: 'ok' })
// 	} catch (error) {
// 		console.log(error)
// 		res.json({ status: 'error', error: 'invalid token' })
// 	}
// })



app.listen(7000,()=>{

console.log('server listening on port:7000');

})