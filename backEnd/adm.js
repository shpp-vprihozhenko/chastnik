let fs = require('fs');

let arAdminsEmail  = [];

try {
	arAdminsEmail = JSON.parse(fs.readFileSync('admins.json'));
} catch(e) {
	console.log('err on read adm list', e);
}

console.table(arAdminsEmail);

/*
let ar = []
ar.push('vprihogenko@yahoo.com')
fs.writeFileSync('admins.json', JSON.stringify(ar))
*/