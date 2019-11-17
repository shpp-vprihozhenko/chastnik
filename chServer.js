
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbMaster:Qwe123@cluster0-qwqcu.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true}); 

let usersCol;

client.connect(err => {
	console.log('cb of connect');
	if (err) {
		console.error('some err on connect to db', err);
		return;
	}
  usersCol = client.db("chastnik").collection("users");
  usersCol.find({}).toArray((err,arUsers)=>{
	  console.table(arUsers);	  
  });
});

const express = require('express');

const app = express();
app.use(express.static('public'));
app.listen(6211, function () {
  console.log('Public listening on port 6211');
});

app2 = express();
app2.use(express.urlencoded());
app2.use(express.json());
app2.listen(6212, function () {
  console.log('data listening on port 6212');
});

app2.use(function(req, res, next) {
  console.log('Time: ', Date.now(), 'p', req.url, req.method);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app2.get('/user/identify/:email/:pwd', function (req, res) {
	console.log('looking user',req.params);
	usersCol.findOne({"email": req.params.email}, (error, user)=>{
		let err = '', uId = '', name = '';
		if(!user){
			console.log('no such user in db');
			err = 'Пользователь с таким паролем в базе не найден.';
		} else {
			if (user.pwd != req.params.pwd) {
				console.log('wrong pwd');
				err = 'Пользователь с таким паролем в базе не найден.';
			} else {
				console.log('pwd ok');
				uId = user._id; name = user.name;
			}
		}
		console.log('userId',uId,'name',name);
		res.send(JSON.stringify({err, user: {uId, name}}));
	});
});

app2.post('/user/add', function (req, res) {
	console.log('post user/add body',req.body);
	let err = undefined;
	usersCol.findOne({"email": req.body.email}, (err, user)=>{
		if(user){
			console.log('Error. Such email already present in db.');
			err = 'Ошибка при создании пользователя(';
			res.send(JSON.stringify({err: err, newId: undefined}));
		} else {
			usersCol.insertOne({email: req.body.email, pwd: req.body.pwd, name: req.body.name}, (err, newUser)=>{
				if(!res){
					err = 'Ошибка при создании пользователя(';
					res.send(JSON.stringify({err: err, newId: undefined}));
				} else {
					console.log('newUser ID',newUser.insertedId);
					res.send(JSON.stringify({err: err, newId: newUser.insertedId}));
				}
			});
		}
	});
});

app2.post('/user/del', function (req, res) {
	console.log('del user/add body', req.body);
	if (req.body.pwd != 'masterDelete12345') {
		res.send(JSON.stringify({err: undefined}));
		return;
	}
	let err = undefined;
	usersCol.deleteMany({"email": req.body.email}, (err, result)=>{
		if(err){
			console.log('Error on del.', err);
			err = 'Ошибка при удалении пользователя(';
			res.send(JSON.stringify({err: err, newId: undefined}));
		} else {
			console.log('ok');
			res.send(JSON.stringify({err: undefined, result: 'ok'}));
		}
	});
});
