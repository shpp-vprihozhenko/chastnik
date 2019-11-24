const MongoClient = require('mongodb').MongoClient;
//const uri = "mongodb+srv://dbMaster:Qwe123@cluster0-qwqcu.mongodb.net/test?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true}); 

let usersCol;

client.connect(err => {
	console.log('cb of connect');
	if (err) {
		console.error('some err on connect to db', err);
		return;
	}
	usersCol = client.db("chastnik").collection("users");
	сolCat1 = client.db("chastnik").collection("cat1");
	сolCat2 = client.db("chastnik").collection("cat2");

	/*
	сolCat2.deleteMany({}, (err, result)=>{
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
	
	usersCol.find({}).toArray((err,arUsers)=>{
		console.table(arUsers);	  
	});
	
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
	
	сolCat2.find().toArray((err,ar)=>{
		console.log('\ncolCat2');
		console.table(ar);	  
	});

	сolCat1.aggregate([
    { $lookup:
       {
         from: 'cat2',
         localField: '_id',
         foreignField: 'cat1id',
         as: 'cat2'
       }
     }
    ]).toArray(function(err, res) {
		if (err) throw err;
		console.log(JSON.stringify(res));
	})
});
