const Bot = require('campchat').Bot
const http = require('http')
const fs = require('fs')
let bot = new Bot('>', 'inyourface', '#00ff00')
bot.block_db((type, value)=>{
    if (type === 'get') {
        return JSON.parse(fs.readFileSync('./blocks.json'))
    } else if (type === 'add') {
        let j = JSON.parse(fs.readFileSync('./blocks.json'))
        j.push(value)
        fs.writeFileSync('./blocks.json', JSON.stringify(j))
    } else if (type === 'remove') {
        let j = JSON.parse(fs.readFileSync('./blocks.json'))
        j.splice(j.indexOf(value), 1)
        fs.writeFileSync('./blocks.json', JSON.stringify(j))
    } else if (type === 'has') {
        let j = JSON.parse(fs.readFileSync('./blocks.json'))
        return j.includes(value)
    }
})
let db_inner = {}
const host = '0.0.0.0';
const port = 8000;
const requestListener = function (req, res) {
    res.writeHead(200);
    res.end("My first server!");
};
const server = http.createServer(requestListener);

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
// just checking for invs chars (cuz anti-anti spam)
let id = 
 "f2058054310c2d210d644310910b3644432935c9bee18a307144bc24a99c036d9f0a45a071d3b4bef7c69fe1078890a06ad36436a2c8b6544dd36b5ae12dfcee"
var db = class db {
    async get(name) {
        return db_inner[name]
    }
    async set(name, value) {
        db_inner[name] = value
    }
}

bot.on('command blocked', (msg)=>{
	msg.send('What are you doing?')
})

function owneronly(f) {
    return function(msg, ...args){
        if (msg.user.id !== id) {
            return msg.send("You are not the owner of this bot.")
        }
        return f(msg, ...args)
    }
}
db = new db()

bot.command('echo', (msg, ...args) => {
    msg.send(args.join(' '))
}, 'Repeats what you say (usage: >echo [msg]')

bot.command('id', (msg) => {
    msg.send(msg.user.id)
}, 'Get your id') // you can handle invaild commands now :)

bot.on('bad command', (msg, cmd)=>{
    msg.reply(`${cmd} isn't a command!`)
})

bot.command('test', (msg) => {
    let speed_msg = 'Tracking speed...'
    const start = Date.now()
    msg.send(speed_msg)
    bot.waitFor(
        'message',
        (m)=>{
            const stop = Date.now();
            setTimeout(()=>{
                msg.reply(`Here are the results: It took ${(stop-start)/1000} seconds to send and receive a message.`)
            }, 1000)
        }, 
        (m)=>{return(m.content === speed_msg) && (m.user?.name === bot.username && m.user?.color === bot.color)}
    )
}, 'Do a speed test')

bot.command('owner', owneronly((msg)=>{
    msg.send('hi')
}), 'Check if you are the owner')

bot.command('eval', owneronly(async (msg, ...args)=>{
    let code = args.join(' ')

    eval(code)
}), 'Eval a command, owner only. (usage: >eval [javascript])')

bot.command('room', (msg, room)=>{
    bot.room(room)
}, 'Make the bot enter any room. (usage: >room [roomname])')

bot.on('ready', ()=>{
    console.log("Logged in")
    bot.room('botspam')
})

bot.command('sleeptest', (msg, ...args) => {
	args = args.join(' ')
	msg.send(args)
	sleep(1500).then(() => {
    msg.send(args+args)
  });
}, 'Tests the sleep function. (Usage: >sleeptest [test message])')

bot.command('fake-typing', (msg, t='1000') =>{
	bot.starttyping()
	sleep(parseInt(t)).then(() => {
        bot.endtyping() // seams that i leaned on the keybord
    });
}, 'Makes it look like the bot is typing. (usage: >fake-typing [ms])')

// hey you might wanna make this owner only idk true
bot.command('block-usr', owneronly((msg, user)=>{
    user = bot.getUser({
        'name': user // dont reload yet k
    })
    // hold on imma upgrade getUser k
	// you can use bot.getUser on the use wait uhh no this is annoying nmv
	bot.block(user)
}), 'Block a user from using your bot (Usage >block-usr [username])')

bot.command('unblock-usr', owneronly((msg, user)=>{
    user = bot.getUser({
        'name': user 
    })
	bot.unblock(user)
}), 'Allow a user to use your bot (Usage >unblock-usr [username])')

bot.command('random-number', (msg, num1)=>{
	msg.send(`${Math.floor(Math.random()*(parseInt(num1)+1))} is your random number`)
}, 'Chose a random number inbetween two numbers that you select (the lower bound is always 1). (usage >random-number [num1])')


bot.command('fonts', (msg, id, ...args) =>{
	var thechars = [];
	args = args.join(' ');
	id = parseInt(id);
	switch(id) {
		case 1:
			for(var i = 0; i <= 256; i++) {
				args = args.replace('a', '???').replace('b', '??').replace('c', '??').replace('d', '??').replace('e', '???').replace('f', '??').replace('g', '??').replace('h', '??').replace('i', '??').replace('j', 'J').replace('k', '??').replace('l', '???').replace('m', '???').replace('n', '???').replace('o', '??').replace('p', '??').replace('q', '9').replace('r', '??').replace('s', '??').replace('t', '??').replace('u', '???').replace('v', '???').replace('w', '???').replace('x', '??').replace('y', '??').replace('z', '??').replace('A', '????????????').replace('B', '??').replace('C', '???').replace('D', '??').replace('E', '???').replace('F', '???').replace('G', '???').replace('H', '???').replace('I', '??').replace('J', 'J').replace('K', '??').replace('L', '???').replace('M', '???').replace('N', '???').replace('O', '??').replace('P', '??').replace('Q', '????').replace('R', '???').replace('S', '???').replace('T', '???').replace('U', '???').replace('V', '???').replace('W', '???').replace('X', '??').replace('Y', '??').replace('Z', '???').replace('fax', '???').replace('0', '??').replace('?', '??').replace('(', '???').replace(')', '???').replace('/', '???').replace('1', '???').replace('2', '???').replace('8', '???').replace('9', '???')
			}
			break;
		/* case 1:
			args = args.replace('a', '????').replace('b', '????').replace('c', '????').replace('d', '????').replace('e', '????').replace('f', '????').replace('g', '????').replace('h', '????').replace('i', '????').replace('j', '????').replace('k', '????').replace('l', '????').replace('m', '????').replace('n', '????').replace('o', '????').replace('p', '????').replace('q', '????').replace('r', '????').replace('s', '????').replace('t', '????').replace('u', '????').replace('v', '????').replace('w', '????').replace('x', '????').replace('y', '????').replace('z', '????').replace('A', '????').replace('B', '????').replace('C', '????').replace('D', '????').replace('E', '????').replace('F', '????').replace('G', '????').replace('H', '????').replace('I', '????').replace('J', '????').replace('K', '????').replace('L', '????').replace('M', '????').replace('N', ' ????').replace('O', '????').replace('P', '????').replace('Q', '????').replace('R', '????').replace('S', '????').replace('T', '????').replace('U', '????').replace('V', '????').replace('W', '????').replace('X', '????').replace('Y', '????').replace('Z', '????').replace('fax', '???');
			break;
		case 2:
			args = args.replace('a', '????').replace('b', '????').replace('c', '????').replace('d', '????').replace('e', '???').replace('f', '????').replace('g', '???').replace('h', '????').replace('i', '????').replace('j', '????').replace('k', '????').replace('l', '????').replace('m', '????').replace('n', '????').replace('o', '???').replace('p', '????').replace('q', '????').replace('r', '????').replace('s', '????').replace('t', '????').replace('u', '????').replace('v', '????').replace('w', '????').replace('x', '????').replace('y', '????').replace('z', '????').replace('A', '????').replace('B', '???').replace('C', '????').replace('D', '????').replace('E', '???').replace('F', '???').replace('G', '????').replace('H', '???').replace('I', '???').replace('J', '????').replace('K', '????').replace('L', '???').replace('M', '???').replace('N', ' ????').replace('O', '????').replace('P', '????').replace('Q', '????').replace('R', '???').replace('S', '????').replace('T', '????').replace('U', '????').replace('V', '????').replace('W', '????').replace('X', '????').replace('Y', '????').replace('Z', '????').replace('fax', '???');
			break;
		case 3:
			args = args.replace('a', '????').replace('b', '????').replace('c', '????').replace('d', '????').replace('e', '????').replace('f', '????').replace('g', '????').replace('h', '????').replace('i', '????').replace('j', '????').replace('k', '????').replace('l', '????').replace('m', '????').replace('n', '????').replace('o', '????').replace('p', '????').replace('q', '????').replace('r', '????').replace('s', '????').replace('t', '????').replace('u', '????').replace('v', '????').replace('w', '????').replace('x', '????').replace('y', '????').replace('z', '????').replace('A', '????').replace('B', '????').replace('C', '???').replace('D', '????').replace('E', '????').replace('F', '????').replace('G', '????').replace('H', '???').replace('I', '????').replace('J', '????').replace('K', '????').replace('L', '????').replace('M', '????').replace('N', '???').replace('O', '????').replace('P', '???').replace('Q', '???').replace('R', '???').replace('S', '????').replace('T', '????').replace('U', '????').replace('V', '????').replace('W', '????').replace('X', '????').replace('Y', '????').replace('Z', '???').replace('fax', '???').replace('1', '????').replace('2', '????').replace('3', '????').replace('4', '????').replace('5', '????').replace('6', '????').replace('7', '????').replace('8', '????').replace('9', '????').replace('0', '????')
			break;
		case 4:
			thechars = ['????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????', '????'];
      args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break;*/
		case 2:
			thechars = ['??','B','???','D','??','F','G','??','I','J','K','???','M','??','??','P','Q','??','??','??','??','V','??','X','Y','Z','??','B','???','D','??','F','G','??','I','J','K','???','M','??','??','P','Q','??','??','??','??','V','??','X','Y','Z','1','2','3','4','5','6','7','8','9','0'];
			for(var i = 0; i <= 256; i++) {
				args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
			break;
		case 3:
			thechars = ['???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '??', '???', '???', '???', '???', '???', '??', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '??????', '??', '???', '???', '???', '???', '???', '??', '???', '???', '???', '???', '???', '???', '???', '???', '???', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
		for(var i = 0; i <= 256; i++) {	
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
		case 4:
			thechars = ['???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','??','???','???','???','???','???','???','???','???','???','??','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','??','???','???','???','???','???','???','???','???','???','??','???','???','???','???','??','???','???','???','???'];
			for(var i = 0; i <= 256; i++) {
				args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
			break;
		/* case 8:
			thechars = ['????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','1','2','3','4','5','6','7','8','9','0'];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break;
		case 9:
			thechars = ['????','??','????','???','??','????','???','????','??','???','??','????','??','???','???','???','???','???','???','???','????','????','????','????','??','????','???','????','???','??','???','????','???','???','???','????','????','???','????','???','??','??','q','???','???','????','???','????','???','??','????','????','???','???','???','???','???','???','???','???','???','???'];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break;*/
		case 5:
			thechars = ['????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','1','2','3','4','5','6','7','8','9','0'];
			for(var i = 0; i <= 256; i++) {
				args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
			break;
		/* case 11:
			thechars = ['???','b','c','d','???','f','g','???','???','???','???','???','???','???','???','???','q','???','???','???','???','???','w','???','y','z','???','B','C','D','???','F','G','???','???','???','???','???','???','???','???','???','Q,','???','???','???','???','???','W','???','Y','Z','???','???','???','???','???','???','???','???','???','???'];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break;
		case 12:
			thechars = ['???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???'];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break; */
		case 6:
			thechars = ['???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','???','1','2','3','4','5','6','7','8','9','0'];
			for(var i = 0; i <= 256; i++) {
				args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
			break;
		/* case 14:
			thechars = ['????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????','????'];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61])
			break;
		case 15:
			thechars = ["????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","1","2","3","4","5","6","7","8","9","0"];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break;
		case 16:
			thechars = ["????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","1","2","3","4","5","6","7","8","9","0"];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break;
		case 17:
			thechars = ["????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????"];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break; */
		case 7:
			thechars =["???","???","???","??","??","???","???","???","??","J","???","???","???","???","??","???","Q","???","???","???","??","V","???","??","??","???","???","???","???","??","??","???","???","???","??","J","???","???","???","???","??","???","Q","???","???","???","??","V","???","??","??","???","1","2","3","4","5","6","7","8","9","0"];
			for(var i = 0; i <= 256; i++) {
				args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
			break;
		/* case 19:
			thechars =["???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???"];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break;
		case 20:
			thechars =["???","???","??","????","????","????","????","????","???","??","???","???","????","???","????","????","????","????","??","????","??","???","???","??","??","????","???","????","c","???","????","????","???","???","????","??","???","????","??","??","???","??","???","????","????","????","??","??","???","??","????","???","???","???","???","???","???","???","???","???","??"];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break; */
		case 8:
			thechars =["???","??","???","???","???","???","??","??","??","???","???","??","???","??","???","???","Q","??","???","???","???","???","???","x","??","???","???","??","???","???","???","???","??","??","??","???","???","??","???","??","???","???","Q","??","???","???","???","???","???","x","??","???","1","2","3","4","5","6","7","8","9","0"];
			for(var i = 0; i <= 256; i++) {
				args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
			break;
		case 9:
			thechars =["??","q","??","p","??","??","??","??","???","??","??","l","??","u","o","d","b","??","s","??","n","??","??","x","??","z","???","q","??","p","??","???","??","H","I","??","??","??","W","N","O","??","Q","??","S","???","???","??","M","X","???","Z","??","???","??","???","??","9","???","8","6","0"];
			for(var i = 0; i <= 256; i++) {
				args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
			break;
		/* case 23:
			thechars =["????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","????","1","2","3","4","5","6","7","8","9","0"];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break; 
		case 24:
			thechars =["??","??","??","??","??","??","??","??","??","??","??","??","M","??","??","??","??","??","??","??","??","??","??","??","??","??","??","??","??","??","??","??","??","??","??","??","??","??","M","??","??","??","??","??","??","??","??","??","??","??","??","??","1","2","3","4","5","6","7","8","9","0"];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break; */
		case 10:
			thechars = ["??????","???????","???????","???????","??????","??????","??????","??????","??????","??????","???????","??????","???????","??????","??????","???????","??????","??????","???????","??????","???????","??????","???????","??????","??????","??????","??????","???????","???????","???????","??????","??????","??????","??????","??????","??????","???????","??????","???????","??????","??????","???????","??????","??????","???????","??????","???????","??????","???????","??????","??????","??????","???????","???????","???????","???????","???????","??????","???????","???????","???????","???????"];
			for(var i = 0; i <= 256; i++) {
				args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
			break;
		case 11:
			thechars = ['??????','??????','??????','??????','??????','??????','??????','??????','??????','????','????','??????','??????','??????','??????','??????','??????','??????','??????','??????','??????','??????','??????','??????','??????','??????','??????','???????','???????','???????','??????','??????','??????','??????','??????','??????','???????','??????','???????','??????','??????','???????','??????','??????','???????','??????','???????','??????','???????','??????','??????','??????','???????','???????','???????','???????','???????','??????','???????','???????','???????','???????'];
		for(var i = 0; i <= 256; i++) {	
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
			break;
		case 12:
			thechars = ["???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","????","????","???","???","???","???","???","???","???","???","???","???","???","???","??","???","&","???","????","????","????","????","????","???","???","????","????"];
			for(var i = 0; i <= 256; i++) {
				args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
			break;
		/* case 29:
			thechars = ["???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","??","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???","???"];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '???').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break;	*/	
default:
		for(var i = 0; i <= 256; i++) {
			args = args.replace('a', '???').replace('b', '??').replace('c', '??').replace('d', '??').replace('e', '???').replace('f', '??').replace('g', '??').replace('h', '??').replace('i', '??').replace('j', 'J').replace('k', '??').replace('l', '???').replace('m', '???').replace('n', '???').replace('o', '??').replace('p', '??').replace('q', '9').replace('r', '??').replace('s', '??').replace('t', '??').replace('u', '???').replace('v', '???').replace('w', '???').replace('x', '??').replace('y', '??').replace('z', '??').replace('A', '????????????').replace('B', '??').replace('C', '???').replace('D', '??').replace('E', '???').replace('F', '???').replace('G', '???').replace('H', '???').replace('I', '??').replace('J', 'J').replace('K', '??').replace('L', '???').replace('M', '???').replace('N', '???').replace('O', '??').replace('P', '??').replace('Q', '????').replace('R', '???').replace('S', '???').replace('T', '???').replace('U', '???').replace('V', '???').replace('W', '???').replace('X', '??').replace('Y', '??').replace('Z', '???').replace('fax', '???').replace('0', '??').replace('?', '??').replace('(', '???').replace(')', '???').replace('/', '???').replace('1', '???').replace('2', '???').replace('8', '???').replace('9', '???')}
	}
	msg.send(`${args} is you new string.`)
}, 'Converts the string into various diffrent unicode charater sets. (Usage: >fonts [id number 1-12] [message])')

bot.command('random-font', (msg, ...args) =>{
	args = args.join(' ')
	args = args.toLowerCase()
	var thechars = ["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"];
	var a = ["???","??","???","???","????","???","???","???","??","??????","??????","???"];
	var b = ["??","B","???","???","????","???","???","??","q","???????","??????","???"];
	var c = ["??","???","???","???","????","???","???","???","??","???????","??????","???"];
	var d = ["??","D","???","???","????","???","??","???","d","???????","??????","???"];
	var e = ["???","??","???","???","????","???","??","???","??","??????","??????","???"];
	var f = ["??","F","???","???","????","???","???","???","??","??????","??????","???"];
	var g = ["??","G","???","???","????","???","???","??","??","??????","??????","???"];
	var h = ["??","??","???","???","????","???","???","??","??","??????","??????","???"];
	var i = ["??","I","???","???","????","???","??","??","???","??????","??????","o"];
	var j = ["J","J","???","???","????","???","J","???","??","??????","????","1"];
	var k = ["??","K","??","???","????","???","???","???","??","???????","????","2"];
	var l = ["l","???","???","???","????","???","???","??","l","???","???","3"];
	var m = ["???","M","???","???","????","???","???","???","??","???????","??????","4"];
	var n = ["???","??","???","???","????","???","???","??","n","??????","??????","5"];
	var o = ["??","??","???","???","????","???","??","???","o","??????","??????","6"];
	var p = ["??","P","???","??","????","???","???","???","d","???????","??????","7"];
	var q = ["???","Q","??","???","????","???","Q","Q","b","??????","??????","8"];
	var r = ["??","??","???","???","????","???","???","???","??","??????","??????","10"];
	var s = ["??","??","???","???","????","???","???","s","???????","??????","10"];
	var t = ["??","??","???","???","????","???","???","???","??","??????","??????","???"];
	var u = ["???","??","???","???","????","???","??","???","n","???????","??????","???"];
	var v = ["???","V","???","???","????","???","V","???","??","??????","??????","???"];
	var w = ["???","??","???","???","????","???","???","???","??","???????","??????","???"];
	var x = ["??","X","???","???","????","???","??","x","x","??????","??????","???"];
	var y = ["??","Y","???","???","????","???","??","??","??","??????","??????","???"];
	var z = ["??","Z","???","??","????","???","???","???","z","??????","??????","???"];
	/*var A = [];
	var B = [];
	var C = [];
	var D = [];
	var E = [];
	var F = [];
	var G = [];
	var H = [];
	var I = [];
	var J = [];
	var K = [];
	var L = [];
	var M = [];
	var N = [];
	var O = [];
	var P = [];
	var Q = [];
	var R = [];
	var S = [];
	var T = [];
	var U = [];
	var V = [];
	var W = [];
	var X = [];
	var Y = [];
	var Z = [];
	var n1 = [];
	var n2 = [];
	var n3 = [];
	var n4 = [];
	var n5 = [];
	var n6 = [];
	var n7 = [];
	var n8 = [];
	var n9 = [];
	var n0 = [];*/
	var randomelement = Math.floor(Math.random() * 11);
	thechars[0] = a[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[1] = b[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[2] = c[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[3] = d[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[4] = e[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[5] = f[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[6] = g[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[7] = h[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[8] = i[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[9] = j[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[10] = k[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[11] = l[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[12] = m[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[13] = n[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[14] = o[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[15] = p[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[16] = q[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[17] = r[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[18] = s[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[19] = t[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[20] = u[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[21] = v[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[22] = w[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[23] = x[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[24] = y[randomelement]
	randomelement = Math.floor(Math.random() * 11);
	thechars[25] = z[randomelement]
	for (var i = 0; i <= 256; i++){
	args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]);}
	msg.send(`${args} is your new string.`)
}, 'Take a string and makes each charater a 1 of 12 diffrent letter varients, randomly. (Usage: >random-font [string])')

bot.connect()

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});