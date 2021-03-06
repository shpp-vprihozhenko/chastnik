const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
//const uri = "mongodb+srv://dbMaster:Qwe123@cluster0-qwqcu.mongodb.net/test?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true}); 

client.connect(err => {
	console.log('cb of connect');
	if (err) {
		console.error('some err on connect to db', err);
		return;
	}
	сolCat1 = client.db("chastnik").collection("cat1");
	сolCat2 = client.db("chastnik").collection("cat2");
	сolCat3 = client.db("chastnik").collection("cat3");

	/*
	сolCat3.deleteMany({}, (err, result)=>{
		if(err){
			console.log('Error on del.', err);
		} else {
			console.log('ok del');
		}
	});
	return
	*/
	
	/*
	сolCat2.insertOne({cat1id: '5dd5a44ac9f8e60f2cc9182b', cat2: 'Легковых авто'}, (err, newCat)=>{
		if (err) {
			console.log('Ошибка при создании cat2(', err);
		} else {
			console.log('newCat',newCat); //.insertedId
		}
	});
	сolCat2.insertOne({cat1id: '5dd5a44ac9f8e60f2cc9182b', cat2: 'Грузовых авто'}, (err, newCat)=>{
		if (err) {
			console.log('Ошибка при создании cat2(', err);
		} else {
			console.log('newCat',newCat); //.insertedId
		}
	});
	сolCat2.insertOne({cat1id: '5dd5a4a8fa8a021aec559446', cat2: 'Легковых авто'}, (err, newCat)=>{
		if (err) {
			console.log('Ошибка при создании cat2(', err);
		} else {
			console.log('newCat',newCat); //.insertedId
		}
	});
	сolCat2.insertOne({cat1id: '5dd5a4a8fa8a021aec559446', cat2: 'Грузовых авто'}, (err, newCat)=>{
		if (err) {
			console.log('Ошибка при создании cat2(', err);
		} else {
			console.log('newCat',newCat); //.insertedId
		}
	});
	*/
	/*
	сolCat1.insertOne({cat: 'Обслуживание'}, (err, newCat)=>{
		if (err) {
			console.log('Ошибка при создании cat1(', err);
		} else {
			console.log('newCat',newCat); //.insertedId
		}
	});
	*/
	/*
	usersCol.insertOne({email: 'test1@gmail.com', pwd: '12345', name: 'Stasik'}, (err, newUser)=>{
		if (err) {
			err = 'Ошибка при создании пользователя(';
			res.send(JSON.stringify({err: err, newId: undefined}));
		} else {
			console.log('newUser ID',newUser.insertedId);
		}
	});
	*/
		
	сolCat1.find().toArray((err,ar)=>{
		console.log('\ncolCat1');
		console.table(ar);
		/*
		for (let el of ar) {
			let c1id = el._id;
			console.log('1',c1id, typeof c1id);
			
			сolCat2.insertOne({cat1id: c1id, cat2: 'Легковых авто'}, (err, newCat)=>{
				if (err) {
					console.log('Ошибка при создании cat2(', err);
				} else {
					console.log('newCat',newCat); //.insertedId
				}
			});
			сolCat2.insertOne({cat1id: c1id, cat2: 'Грузовых авто'}, (err, newCat)=>{
				if (err) {
					console.log('Ошибка при создании cat2(', err);
				} else {
					console.log('newCat',newCat); //.insertedId
				}
			});			
		}
		*/
	});
	
	/*
	сolCat2.find({cat1id: ObjectID('5dd5a44ac9f8e60f2cc9182b')}).toArray((err,ar)=>{
		console.log('\ncolCat2 find');
		console.table(ar);	  
	});
	*/
	
	сolCat2.find().toArray((err,ar)=>{
		console.log('\ncolCat2');
		console.table(ar);	  
	});
		
	function ins3( c1id, c2id, cat3 ) {
		сolCat3.insertOne({cat1id: c1id, cat2id: c2id, cat3}, (err, newCat)=>{
			if (err) {
				console.log('Ошибка при создании cat3(', err);
			} else {
				console.log('newCat',newCat.ops); //insertedId
			}
		});
	}
	/*	
	сolCat2.find({cat2: 'Легковых авто'}).toArray((err,ar)=>{
		console.log('\ncolCat2 find');
		console.table(ar);
		for (let el of ar) {
			ins3(el.cat1id, el._id, 'Вольво');
			ins3(el.cat1id, el._id, 'Рено');
			ins3(el.cat1id, el._id, 'ДЕУ');
			ins3(el.cat1id, el._id, 'Тойота');
		}
	});
	*/	
	сolCat3.find().toArray((err,ar)=>{
		console.log('\ncolCat3');
		console.table(ar);	  
	});
		
	сolCat1.aggregate([
    { 	$lookup:
        {
			from: 'cat2',
			localField: '_id',
			foreignField: 'cat1id',
			as: 'cat2'
        },
		$lookup:
		{
			from: 'cat3',
			localField: '_id',
			foreignField: 'cat2id',
			as: 'cat3'
		}
    },
    ]).toArray(function(err, res) {
		if (err) throw err;
		console.log(JSON.stringify(res));
		let a = res[0]._id;
		console.log('a', a, typeof a);
	});
	
});
