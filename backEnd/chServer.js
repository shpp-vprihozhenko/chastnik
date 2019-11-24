const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017";
//const uri = "mongodb+srv://dbMaster:Qwe123@cluster0-qwqcu.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true}); 

let arAdminsEmail  = [];
try { arAdminsEmail = JSON.parse(fs.readFileSync('admins.json')) }
catch(e) { console.log('err on read adm list', e) }

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
		let err = '', uId = '', name = '', perm = 0;
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
				if (arAdminsEmail.indexOf(req.params.email) > -1) {
					perm = 1;
				}
			}
		}
		console.log('userId',uId,'name',name);
		res.send(JSON.stringify({err, user: {uId, name, perm}}));
	});
});

app2.post('/user/add', function (req, res) {
	console.log('post user/add body',req.body);
	let err = undefined;
	usersCol.findOne({"email": req.body.email}, (e, user)=>{
		if(user){
			console.log('Error. Such email already present in db.');
			err = 'Ошибка при создании пользователя(';
			res.send(JSON.stringify({err: err, newId: undefined}));
		} else {
			usersCol.insertOne({email: req.body.email, pwd: req.body.pwd, name: req.body.name, phone: req.body.phone}, (e, newUser)=>{
				if(e){
					err = 'Ошибка при создании пользователя( '+e;
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

/*
0) users: name, email, phoneNumber, pwd

1) rss - tbl
	id,
	user,
	req/offer,
	reqServ: { [cats] , 
		cat[1], cat[2], cat[3], descr, fullDescr, price/час.../ фикс.},
			обслуживание/ авто / volvo / sens / mercedes / ...
						/ кондиционеров / марки...
			обучение 	/ программированию / 1с / js 
						/ вождению ...
			ремонт 	/ квартир 	/ внутренний
					/ легкАвто 	/ ...
					/ грузАвто 	/
					/ домов		/ штукатурка, полы, окна 
			разработка 	/ сайтов / wordPress / jumla
						/ схем
			+ запрос на добавление категории от юзера - письмо админу - ссылка для подтверждения
	finTermOfReq
	
2) cat1, cat2, cat3

3) объявление - ищу ремонт.легкАвто.volvo.v40 замена масла.до... -> 
	микротендер ->
		рассылка заинтересованным, ожид. ответов ->
			сообщение об ответах заказчику... + Микрочат?
	
1C- +уч нов. рег при арх.

*/

1C- +уч нов. рег при арх.
