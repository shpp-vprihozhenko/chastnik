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
	usersCol.find().toArray((err,ar)=>{
		console.log('\nusersCol');
		console.table(ar);
	});

	сolCat1 = client.db("chastnik").collection("cat1");
	сolCat2 = client.db("chastnik").collection("cat2");

	
	сolCat1.find().toArray((err,ar)=>{
		console.log('\ncolCat1');
		console.table(ar);
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
		console.table(res);
		for (let el of res) {
			if (el.cat2.length==0) {
				console.log('need kill ', el._id);
				/*
				сolCat1.deleteOne({_id: el._id}, (err, result)=>{
					if(err){
						console.log('Error on del.', err);
					} else {
						console.log('ok del');
					}
				});
				*/
			}
		}
	})
});
