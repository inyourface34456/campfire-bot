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
				args = args.replace('a', 'ᾇ').replace('b', 'β').replace('c', 'ç').replace('d', 'δ').replace('e', 'ễ').replace('f', 'ƒ').replace('g', 'ϱ').replace('h', 'ԣ').replace('i', 'ï').replace('j', 'J').replace('k', 'ƙ').replace('l', 'ℓ').replace('m', 'ဣ').replace('n', 'ἧ').replace('o', 'ô').replace('p', 'ƥ').replace('q', '9').replace('r', 'ř').replace('s', 'ƨ').replace('t', 'ƭ').replace('u', 'ᵿ').replace('v', 'ṽ').replace('w', 'ὧ').replace('x', 'ж').replace('y', '¥').replace('z', 'ƺ').replace('A', '᷽᷿᷾Ḁ').replace('B', 'β').replace('C', '₡').replace('D', 'Ð').replace('E', 'Ễ').replace('F', 'Ⅎ').replace('G', 'Ꮆ').replace('H', 'ℋ').replace('I', 'ï').replace('J', 'J').replace('K', 'ƙ').replace('L', 'ℓ').replace('M', 'ℳ').replace('N', 'ℿ').replace('O', 'ô').replace('P', 'ƥ').replace('Q', '𝕼').replace('R', 'ℛ').replace('S', '₷').replace('T', '┴').replace('U', 'Ṻ').replace('V', 'Ṽ').replace('W', 'ὧ').replace('X', 'ж').replace('Y', 'Ɣ').replace('Z', '⅀').replace('fax', '℻').replace('0', 'θ').replace('?', '¿').replace('(', '⟪').replace(')', '⟫').replace('/', '⫽').replace('1', '႑').replace('2', '႒').replace('8', '႘').replace('9', '႖')
			}
			break;
		/* case 1:
			args = args.replace('a', '𝖆').replace('b', '𝖇').replace('c', '𝖈').replace('d', '𝖉').replace('e', '𝖊').replace('f', '𝖋').replace('g', '𝖌').replace('h', '𝖍').replace('i', '𝖎').replace('j', '𝖏').replace('k', '𝖐').replace('l', '𝖑').replace('m', '𝖒').replace('n', '𝖓').replace('o', '𝖔').replace('p', '𝖖').replace('q', '𝖖').replace('r', '𝖗').replace('s', '𝖘').replace('t', '𝖙').replace('u', '𝖚').replace('v', '𝖛').replace('w', '𝖜').replace('x', '𝖝').replace('y', '𝖞').replace('z', '𝖟').replace('A', '𝕬').replace('B', '𝕭').replace('C', '𝕮').replace('D', '𝕯').replace('E', '𝕰').replace('F', '𝕱').replace('G', '𝕲').replace('H', '𝕳').replace('I', '𝕴').replace('J', '𝕵').replace('K', '𝕶').replace('L', '𝕷').replace('M', '𝕸').replace('N', ' 𝕹').replace('O', '𝕺').replace('P', '𝕻').replace('Q', '𝕼').replace('R', '𝕽').replace('S', '𝕿').replace('T', '𝕻').replace('U', '𝖀').replace('V', '𝖁').replace('W', '𝖂').replace('X', '𝖃').replace('Y', '𝖄').replace('Z', '𝖅').replace('fax', '℻');
			break;
		case 2:
			args = args.replace('a', '𝒶').replace('b', '𝒷').replace('c', '𝒸').replace('d', '𝒹').replace('e', 'ℯ').replace('f', '𝒻').replace('g', 'ℊ').replace('h', '𝒽').replace('i', '𝒾').replace('j', '𝒿').replace('k', '𝓀').replace('l', '𝓁').replace('m', '𝓂').replace('n', '𝓃').replace('o', 'ℴ').replace('p', '𝓅').replace('q', '𝓆').replace('r', '𝓇').replace('s', '𝓈').replace('t', '𝓉').replace('u', '𝓊').replace('v', '𝓋').replace('w', '𝓌').replace('x', '𝓍').replace('y', '𝓎').replace('z', '𝓏').replace('A', '𝒜').replace('B', 'ℬ').replace('C', '𝒞').replace('D', '𝒟').replace('E', 'ℰ').replace('F', 'ℱ').replace('G', '𝒢').replace('H', 'ℋ').replace('I', 'ℐ').replace('J', '𝒥').replace('K', '𝒦').replace('L', 'ℒ').replace('M', 'ℳ').replace('N', ' 𝒩').replace('O', '𝒪').replace('P', '𝒫').replace('Q', '𝒬').replace('R', 'ℛ').replace('S', '𝒮').replace('T', '𝒯').replace('U', '𝒰').replace('V', '𝒱').replace('W', '𝒲').replace('X', '𝒳').replace('Y', '𝒴').replace('Z', '𝒵').replace('fax', '℻');
			break;
		case 3:
			args = args.replace('a', '𝕒').replace('b', '𝕓').replace('c', '𝕔').replace('d', '𝕕').replace('e', '𝕖').replace('f', '𝕗').replace('g', '𝕘').replace('h', '𝕙').replace('i', '𝕚').replace('j', '𝕛').replace('k', '𝕜').replace('l', '𝕝').replace('m', '𝕞').replace('n', '𝕟').replace('o', '𝕠').replace('p', '𝕡').replace('q', '𝕢').replace('r', '𝕣').replace('s', '𝕤').replace('t', '𝕥').replace('u', '𝕦').replace('v', '𝕧').replace('w', '𝕨').replace('x', '𝕩').replace('y', '𝕪').replace('z', '𝕫').replace('A', '𝔸').replace('B', '𝔹').replace('C', 'ℂ').replace('D', '𝔻').replace('E', '𝔼').replace('F', '𝔽').replace('G', '𝔾').replace('H', 'ℍ').replace('I', '𝕀').replace('J', '𝕁').replace('K', '𝕂').replace('L', '𝕃').replace('M', '𝕄').replace('N', 'ℕ').replace('O', '𝕆').replace('P', 'ℙ').replace('Q', 'ℚ').replace('R', 'ℝ').replace('S', '𝕊').replace('T', '𝕋').replace('U', '𝕌').replace('V', '𝕍').replace('W', '𝕎').replace('X', '𝕏').replace('Y', '𝕐').replace('Z', 'ℤ').replace('fax', '℻').replace('1', '𝟙').replace('2', '𝟚').replace('3', '𝟛').replace('4', '𝟜').replace('5', '𝟝').replace('6', '𝟞').replace('7', '𝟟').replace('8', '𝟠').replace('9', '𝟡').replace('0', '𝟘')
			break;
		case 4:
			thechars = ['𝗮', '𝗯', '𝗰', '𝗱', '𝗲', '𝗳', '𝗴', '𝗵', '𝗶', '𝗷', '𝗸', '𝗹', '𝗺', '𝗻', '𝗼', '𝗽', '𝗾', '𝗿', '𝘀', '𝘁', '𝘂', '𝘃', '𝘄', '𝘅', '𝘆', '𝘇', '𝗔', '𝗕', '𝗖', '𝗗', '𝗘', '𝗙', '𝗚', '𝗛', '𝗜', '𝗝', '𝗞', '𝗟', '𝗠', '𝗡', '𝗢', '𝗣', '𝗤', '𝗥', '𝗦', '𝗧', '𝗨', '𝗩', '𝗪', '𝗫', '𝗬', '𝗭', '𝟭', '𝟮', '𝟯', '𝟰', '𝟱', '𝟲', '𝟳', '𝟴', '𝟵', '𝟬'];
      args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break;*/
		case 2:
			thechars = ['Λ','B','ᄃ','D','Σ','F','G','Ή','I','J','K','ᄂ','M','П','Ө','P','Q','Я','Ƨ','Ƭ','Ц','V','Щ','X','Y','Z','Λ','B','ᄃ','D','Σ','F','G','Ή','I','J','K','ᄂ','M','П','Ө','P','Q','Я','Ƨ','Ƭ','Ц','V','Щ','X','Y','Z','1','2','3','4','5','6','7','8','9','0'];
			for(var i = 0; i <= 256; i++) {
				args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
			break;
		case 3:
			thechars = ['卂', '乃', '匚', 'ᗪ', '乇', '千', 'Ꮆ', '卄', '丨', 'ﾌ', 'Ҝ', 'ㄥ', '爪', '几', 'ㄖ', '卩', 'Ɋ', '尺', '丂', 'ㄒ', 'ㄩ', 'ᐯ', '山', '乂', 'ㄚ', '乙', '卂', '乃', '匚', 'ᗪ', '乇', '千', 'Ꮆ', '卄', '丨ﾌ', 'Ҝ', 'ㄥ', '爪', '几', 'ㄖ', '卩', 'Ɋ', '尺', '丂', 'ㄒ', 'ㄩ', 'ᐯ', '山', '乂', 'ㄚ', '乙', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
		for(var i = 0; i <= 256; i++) {	
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
		case 4:
			thechars = ['ꪖ','᥇','ᥴ','ᦔ','ꫀ','ᠻ','ᧁ','ꫝ','꠸','꠹','ᛕ','ꪶ','ꪑ','ꪀ','ꪮ','ρ','ꪇ','᥅','ᦓ','ꪻ','ꪊ','ꪜ','᭙','᥊','ꪗ','ƺ','ꪖ','᥇','ᥴ','ᦔ','ꫀ','ᠻ','ᧁ','ꫝ','꠸','꠹','ᛕ','ꪶ','ꪑ','ꪀ','ꪮ','ρ','ꪇ','᥅','ᦓ','ꪻ','ꪊ','ꪜ','᭙','᥊','ꪗ','ƺ','᧒','ᒿ','ᗱ','ᔰ','Ƽ','ᦆ','ᒣ','ၦ','ᦲ'];
			for(var i = 0; i <= 256; i++) {
				args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
			break;
		/* case 8:
			thechars = ['🄰','🄱','🄲','🄳','🄴','🄵','🄶','🄷','🄸','🄹','🄺','🄻','🄼','🄽','🄾','🄿','🅀','🅁','🅂','🅃','🅄','🅅','🅆','🅇','🅈','🅉','🄰','🄱','🄲','🄳','🄴','🄵','🄶','🄷','🄸','🄹','🄺','🄻','🄼','🄽','🄾','🄿','🅀','🅁','🅂','🅃','🅄','🅅','🅆','🅇','🅈','🅉','1','2','3','4','5','6','7','8','9','0'];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break;
		case 9:
			thechars = ['𝔞','β','𝒸','ᵈ','є','𝒇','ﻮ','𝓗','Į','ᒎ','к','𝐋','ϻ','Ｎ','Ｏ','ⓟ','ℚ','Ⓡ','丂','Ⓣ','𝐔','𝔳','𝔀','𝐱','ү','𝐳','卂','𝐁','ｃ','Đ','ᗴ','𝔣','ﻮ','ℍ','ᶤ','𝕛','𝐤','ℓ','𝓶','ⓝ','σ','ρ','q','ⓡ','Ⓢ','𝓣','ย','𝓋','ᗯ','Ж','𝔂','𝐙','➀','➁','３','４','５','➅','❼','８','❾','０'];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break;*/
		case 5:
			thechars = ['🅰','🅱','🅲','🅳','🅴','🅵','🅶','🅷','🅸','🅹','🅺','🅻','🅼','🅽','🅾','🅿','🆀','🆁','🆂','🆃','🆄','🆅','🆆','🆇','🆈','🆉','🅰','🅱','🅲','🅳','🅴','🅵','🅶','🅷','🅸','🅹','🅺','🅻','🅼','🅽','🅾','🅿','🆀','🆁','🆂','🆃','🆄','🆅','🆆','🆇','🆈','🆉','1','2','3','4','5','6','7','8','9','0'];
			for(var i = 0; i <= 256; i++) {
				args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
			break;
		/* case 11:
			thechars = ['ₐ','b','c','d','ₑ','f','g','ₕ','ᵢ','ⱼ','ₖ','ₗ','ₘ','ₙ','ₒ','ₚ','q','ᵣ','ₛ','ₜ','ᵤ','ᵥ','w','ₓ','y','z','ₐ','B','C','D','ₑ','F','G','ₕ','ᵢ','ⱼ','ₖ','ₗ','ₘ','ₙ','ₒ','ₚ','Q,','ᵣ','ₛ','ₜ','ᵤ','ᵥ','W','ₓ','Y','Z','₁','₂','₃','₄','₅','₆','₇','₈','₉','₀'];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break;
		case 12:
			thechars = ['ⓐ','ⓑ','ⓒ','ⓓ','ⓔ','ⓕ','ⓖ','ⓗ','ⓘ','ⓙ','ⓚ','ⓛ','ⓜ','ⓝ','ⓞ','ⓟ','ⓠ','ⓡ','ⓢ','ⓣ','ⓤ','ⓥ','ⓦ','ⓧ','ⓨ','ⓩ','Ⓐ','Ⓑ','Ⓒ','Ⓓ','Ⓔ','Ⓕ','Ⓖ','Ⓗ','Ⓘ','Ⓙ','Ⓚ','Ⓛ','Ⓜ','Ⓝ','Ⓞ','Ⓟ','Ⓠ','Ⓡ','Ⓢ','Ⓣ','Ⓤ','Ⓥ','Ⓦ','Ⓧ','Ⓨ','Ⓩ','①','②','③','④','⑤','⑥','⑦','⑧','⑨','⓪'];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break; */
		case 6:
			thechars = ['Ꮧ','Ᏸ','ፈ','Ꮄ','Ꮛ','Ꭶ','Ꮆ','Ꮒ','Ꭵ','Ꮰ','Ꮶ','Ꮭ','Ꮇ','Ꮑ','Ꭷ','Ꭾ','Ꭴ','Ꮢ','Ꮥ','Ꮦ','Ꮼ','Ꮙ','Ꮗ','ጀ','Ꭹ','ፚ','Ꮧ','Ᏸ','ፈ','Ꮄ','Ꮛ','Ꭶ','Ꮆ','Ꮒ','Ꭵ','Ꮰ','Ꮶ','Ꮭ','Ꮇ','Ꮑ','Ꭷ','Ꭾ','Ꭴ','Ꮢ','Ꮥ','Ꮦ','Ꮼ','Ꮙ','Ꮗ','ጀ','Ꭹ','ፚ','1','2','3','4','5','6','7','8','9','0'];
			for(var i = 0; i <= 256; i++) {
				args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
			break;
		/* case 14:
			thechars = ['𝐚','𝐛','𝐜','𝐝','𝐞','𝐟','𝐠','𝐡','𝐢','𝐣','𝐤','𝐥','𝐦','𝐧','𝐨','𝐩','𝐪','𝐫','𝐬','𝐭','𝐮','𝐯','𝐰','𝐱','𝐲','𝐳','𝐀','𝐁','𝐂','𝐃','𝐄','𝐅','𝐆','𝐇','𝐈','𝐉','𝐊','𝐋','𝐌','𝐍','𝐎','𝐏','𝐐','𝐑','𝐒','𝐓','𝐔','𝐕','𝐖','𝐗','𝐘','𝐙','𝟏','𝟐','𝟑','𝟒','𝟓','𝟔','𝟕','𝟖','𝟗','𝟎'];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61])
			break;
		case 15:
			thechars = ["𝘢","𝘣","𝘤","𝘥","𝘦","𝘧","𝘨","𝘩","𝘪","𝘫","𝘬","𝘭","𝘮","𝘯","𝘰","𝘱","𝘲","𝘳","𝘴","𝘵","𝘶","𝘷","𝘸","𝘹","𝘺","𝘻","𝘈","𝘉","𝘊","𝘋","𝘌","𝘍","𝘎","𝘏","𝘐","𝘑","𝘒","𝘓","𝘔","𝘕","𝘖","𝘗","𝘘","𝘙","𝘚","𝘛","𝘜","𝘝","𝘞","𝘟","𝘠","𝘡","1","2","3","4","5","6","7","8","9","0"];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break;
		case 16:
			thechars = ["𝙖","𝙗","𝙘","𝙙","𝙚","𝙛","𝙜","𝙝","𝙞","𝙟","𝙠","𝙡","𝙢","𝙣","𝙤","𝙥","𝙦","𝙧","𝙨","𝙩","𝙪","𝙫","𝙬","𝙭","𝙮","𝙯","𝘼","𝘽","𝘾","𝘿","𝙀","𝙁","𝙂","𝙃","𝙄","𝙅","𝙆","𝙇","𝙈","𝙉","𝙊","𝙋","𝙌","𝙍","𝙎","𝙏","𝙐","𝙑","𝙒","𝙓","𝙔","𝙕","1","2","3","4","5","6","7","8","9","0"];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break;
		case 17:
			thechars = ["𝚊","𝚋","𝚌","𝚍","𝚎","𝚏","𝚐","𝚑","𝚒","𝚓","𝚔","𝚕","𝚖","𝚗","𝚘","𝚙","𝚚","𝚛","𝚜","𝚝","𝚞","𝚟","𝚠","𝚡","𝚢","𝚣","𝙰","𝙱","𝙲","𝙳","𝙴","𝙵","𝙶","𝙷","𝙸","𝙹","𝙺","𝙻","𝙼","𝙽","𝙾","𝙿","𝚀","𝚁","𝚂","𝚃","𝚄","𝚅","𝚆","𝚇","𝚈","𝚉","𝟷","𝟸","𝟹","𝟺","𝟻","𝟼","𝟽","𝟾","𝟿","𝟶"];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break; */
		case 7:
			thechars =["₳","฿","₵","Đ","Ɇ","₣","₲","Ⱨ","ł","J","₭","Ⱡ","₥","₦","Ø","₱","Q","Ɽ","₴","₮","Ʉ","V","₩","Ӿ","Ɏ","Ⱬ","₳","฿","₵","Đ","Ɇ","₣","₲","Ⱨ","ł","J","₭","Ⱡ","₥","₦","Ø","₱","Q","Ɽ","₴","₮","Ʉ","V","₩","Ӿ","Ɏ","Ⱬ","1","2","3","4","5","6","7","8","9","0"];
			for(var i = 0; i <= 256; i++) {
				args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
			break;
		/* case 19:
			thechars =["ａ","ｂ","ｃ","ｄ","ｅ","ｆ","ｇ","ｈ","ｉ","ｊ","ｋ","ｌ","ｍ","ｎ","ｏ","ｐ","ｑ","ｒ","ｓ","ｔ","ｕ","ｖ","ｗ","ｘ","ｙ","ｚ","Ａ","Ｂ","Ｃ","Ｄ","Ｅ","Ｆ","Ｇ","Ｈ","Ｉ","Ｊ","Ｋ","Ｌ","Ｍ","Ｎ","Ｏ","Ｐ","Ｑ","Ｒ","Ｓ","Ｔ","Ｕ","Ｖ","Ｗ","Ｘ","Ｙ","Ｚ","１","２","３","４","５","６","７","８","９","０"];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break;
		case 20:
			thechars =["Ⓐ","ᵇ","¢","𝔡","𝐞","𝕗","𝑔","𝓱","Ꭵ","ן","ｋ","ⓛ","𝐦","ภ","𝐎","𝔭","𝐪","𝓡","ˢ","𝐓","ù","ᵛ","ᗯ","א","ʸ","𝔃","Ⓐ","𝔟","c","๔","𝔼","𝕗","ᵍ","ⓗ","𝒾","Ĵ","ᛕ","𝓵","м","η","Ỗ","Ƥ","ℚ","𝓡","𝓼","𝐓","υ","Ѷ","ฬ","χ","ЎŽ","➀","❷","❸","❹","５","❻","７","➇","９","Ѳ"];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break; */
		case 8:
			thechars =["ᴀ","ʙ","ᴄ","ᴅ","ᴇ","ꜰ","ɢ","ʜ","ɪ","ᴊ","ᴋ","ʟ","ᴍ","ɴ","ᴏ","ᴘ","Q","ʀ","ꜱ","ᴛ","ᴜ","ᴠ","ᴡ","x","ʏ","ᴢ","ᴀ","ʙ","ᴄ","ᴅ","ᴇ","ꜰ","ɢ","ʜ","ɪ","ᴊ","ᴋ","ʟ","ᴍ","ɴ","ᴏ","ᴘ","Q","ʀ","ꜱ","ᴛ","ᴜ","ᴠ","ᴡ","x","ʏ","ᴢ","1","2","3","4","5","6","7","8","9","0"];
			for(var i = 0; i <= 256; i++) {
				args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
			break;
		case 9:
			thechars =["ɐ","q","ɔ","p","ǝ","ɟ","ƃ","ɥ","ᴉ","ɾ","ʞ","l","ɯ","u","o","d","b","ɹ","s","ʇ","n","ʌ","ʍ","x","ʎ","z","∀","q","Ɔ","p","Ǝ","Ⅎ","פ","H","I","ſ","ʞ","˥","W","N","O","Ԁ","Q","ɹ","S","┴","∩","Λ","M","X","⅄","Z","Ɩ","ᄅ","Ɛ","ㄣ","ϛ","9","ㄥ","8","6","0"];
			for(var i = 0; i <= 256; i++) {
				args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
			break;
		/* case 23:
			thechars =["𝒂","𝒃","𝒄","𝒅","𝒆","𝒇","𝒈","𝒉","𝒊","𝒋","𝒌","𝒍","𝒎","𝒏","𝒐","𝒑","𝒒","𝒓","𝒔","𝒕","𝒖","𝒗","𝒘","𝒙","𝒚","𝒛","𝑨","𝑩","𝑪","𝑫","𝑬","𝑭","𝑮","𝑯","𝑰","𝑱","𝑲","𝑳","𝑴","𝑵","𝑶","𝑷","𝑸","𝑹","𝑺","𝑻","𝑼","𝑽","𝑾","𝑿","𝒀","𝒁","1","2","3","4","5","6","7","8","9","0"];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break; 
		case 24:
			thechars =["ƛ","Ɓ","Ƈ","Ɗ","Є","Ƒ","Ɠ","Ӈ","Ɩ","ʆ","Ƙ","Լ","M","Ɲ","Ơ","Ƥ","Ƣ","Ʀ","Ƨ","Ƭ","Ʋ","Ɣ","Ɯ","Ҳ","Ƴ","Ȥ","ƛ","Ɓ","Ƈ","Ɗ","Є","Ƒ","Ɠ","Ӈ","Ɩ","ʆ","Ƙ","Լ","M","Ɲ","Ơ","Ƥ","Ƣ","Ʀ","Ƨ","Ƭ","Ʋ","Ɣ","Ɯ","Ҳ","Ƴ","Ȥ","1","2","3","4","5","6","7","8","9","0"];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break; */
		case 10:
			thechars = ["✌︎","👌︎","👍︎","👎︎","☜︎","☞︎","☝︎","☟︎","✋︎","☺︎","😐︎","☹︎","💣︎","☠︎","⚐︎","🏱︎","✈︎","☼︎","💧︎","❄︎","🕆︎","✞︎","🕈︎","✠︎","✡︎","☪︎","✌︎","👌︎","👍︎","👎︎","☜︎","☞︎","☝︎","☟︎","✋︎","☺︎","😐︎","☹︎","💣︎","☠︎","⚐︎","🏱︎","✈︎","☼︎","💧︎","❄︎","🕆︎","✞︎","🕈︎","✠︎","✡︎","☪︎","📂︎","📄︎","🗏︎","🗐︎","🗄︎","⌛︎","🖮︎","🖰︎","🖲︎","📁︎"];
			for(var i = 0; i <= 256; i++) {
				args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
			break;
		case 11:
			thechars = ['♋︎','♌︎','♍︎','♎︎','♏︎','♐︎','♑︎','♒︎','♓︎','🙰','🙵','●︎','❍︎','■︎','□︎','◻︎','❑︎','❒︎','⬧︎','⧫︎','◆︎','❖︎','⬥︎','⌧︎','⍓︎','⌘︎','✌︎','👌︎','👍︎','👎︎','☜︎','☞︎','☝︎','☟︎','✋︎','☺︎','😐︎','☹︎','💣︎','☠︎','⚐︎','🏱︎','✈︎','☼︎','💧︎','❄︎','🕆︎','✞︎','🕈︎','✠︎','✡︎','☪︎','📂︎','📄︎','🗏︎','🗐︎','🗄︎','⌛︎','🖮︎','🖰︎','🖲︎','📁︎'];
		for(var i = 0; i <= 256; i++) {	
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
			break;
		case 12:
			thechars = ["ঞ","၉","の","ஞ","≽","≼","⋞","⋟","ⓞ","①","②","③","④","⑤","⑥","⑦","⑧","⑨","⑩","⓿","❶","❷","❸","❹","❺","❻","➦","☜","☞","☚","☛","☝","☟","ᖱ","ᖰ","👆","👇","ᖲ","ᖳ","✋","✗","✓","⊠","☑","⛝","☒","ⓧ","⊗","⊘","ø","ফ","&","❒","📋","💳","🗑","💬","🖨","⎙","๏","🎥","📄"];
			for(var i = 0; i <= 256; i++) {
				args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);}
			break;
		/* case 29:
			thechars = ["↦","↽","➫","↼","➬","←","→","↑","↓","↖","↗","↙","↘","↔","↕","▲","▼","△","▽","◀","▶","⊲","⊳","◣","◢","◤","⤷","⊐","⊏","⇆","⇅","↹","⤓","⤒","⇇","⇉","⇈","⇊","⤥","⤣","↪","↩","↻","↺","э","⊼","∧","ヾ","ப","ᴗ","⇧","⇪","⇐","⇔","⇳","⇠","⇢","⇡","⇣","ㄣ","↵","↳","⇟"];
			args = args.replace('a', thechars[0]).replace('b', thechars[1]).replace('c', thechars[2]).replace('d', thechars[3]).replace('e', thechars[4]).replace('f', thechars[5]).replace('g', thechars[6]).replace('h', thechars[7]).replace('i', thechars[8]).replace('j', thechars[9]).replace('k', thechars[10]).replace('l', thechars[11]).replace('m', thechars[12]).replace('n', thechars[13]).replace('o', thechars[14]).replace('p', thechars[15]).replace('q', thechars[16]).replace('r', thechars[17]).replace('s', thechars[18]).replace('t', thechars[19]).replace('u', thechars[20]).replace('v', thechars[21]).replace('w', thechars[22]).replace('x', thechars[23]).replace('y', thechars[24]).replace('z', thechars[25]).replace('A', thechars[26]).replace('B', thechars[27]).replace('C', thechars[28]).replace('D', thechars[29]).replace('E', thechars[30]).replace('F', thechars[31]).replace('G', thechars[32]).replace('H', thechars[33]).replace('I', thechars[34]).replace('J', thechars[35]).replace('K', thechars[36]).replace('L', thechars[37]).replace('M', thechars[38]).replace('N', thechars[39]).replace('O', thechars[40]).replace('P', thechars[41]).replace('Q', thechars[42]).replace('R', thechars[43]).replace('S', thechars[44]).replace('T', thechars[45]).replace('U', thechars[46]).replace('V', thechars[47]).replace('W', thechars[48]).replace('X', thechars[49]).replace('Y', thechars[50]).replace('Z', thechars[51]).replace('fax', '℻').replace('1', thechars[52]).replace('2', thechars[53]).replace('3', thechars[54]).replace('4', thechars[55]).replace('5', thechars[56]).replace('6', thechars[57]).replace('7', thechars[58]).replace('8', thechars[59]).replace('9', thechars[60]).replace('0', thechars[61]);
			break;	*/	
default:
		for(var i = 0; i <= 256; i++) {
			args = args.replace('a', 'ᾇ').replace('b', 'β').replace('c', 'ç').replace('d', 'δ').replace('e', 'ễ').replace('f', 'ƒ').replace('g', 'ϱ').replace('h', 'ԣ').replace('i', 'ï').replace('j', 'J').replace('k', 'ƙ').replace('l', 'ℓ').replace('m', 'ဣ').replace('n', 'ἧ').replace('o', 'ô').replace('p', 'ƥ').replace('q', '9').replace('r', 'ř').replace('s', 'ƨ').replace('t', 'ƭ').replace('u', 'ᵿ').replace('v', 'ṽ').replace('w', 'ὧ').replace('x', 'ж').replace('y', '¥').replace('z', 'ƺ').replace('A', '᷽᷿᷾Ḁ').replace('B', 'β').replace('C', '₡').replace('D', 'Ð').replace('E', 'Ễ').replace('F', 'Ⅎ').replace('G', 'Ꮆ').replace('H', 'ℋ').replace('I', 'ï').replace('J', 'J').replace('K', 'ƙ').replace('L', 'ℓ').replace('M', 'ℳ').replace('N', 'ℿ').replace('O', 'ô').replace('P', 'ƥ').replace('Q', '𝕼').replace('R', 'ℛ').replace('S', '₷').replace('T', '┴').replace('U', 'Ṻ').replace('V', 'Ṽ').replace('W', 'ὧ').replace('X', 'ж').replace('Y', 'Ɣ').replace('Z', '⅀').replace('fax', '℻').replace('0', 'θ').replace('?', '¿').replace('(', '⟪').replace(')', '⟫').replace('/', '⫽').replace('1', '႑').replace('2', '႒').replace('8', '႘').replace('9', '႖')}
	}
	msg.send(`${args} is you new string.`)
}, 'Converts the string into various diffrent unicode charater sets. (Usage: >fonts [id number 1-12] [message])')

bot.command('random-font', (msg, ...args) =>{
	args = args.join(' ')
	args = args.toLowerCase()
	var thechars = ["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"];
	var a = ["ᾇ","Λ","卂","ꪖ","🅰","Ꮧ","₳","ᴀ","ɐ","✌︎","♋︎","ঞ"];
	var b = ["β","B","乃","᥇","🅱","Ᏸ","฿","ʙ","q","👌︎","♌︎","၉"];
	var c = ["ç","ᄃ","匚","ᥴ","🅲","ፈ","₵","ᴄ","ɔ","👍︎","♍︎","の"];
	var d = ["δ","D","ᗪ","ᦔ","🅳","Ꮄ","Đ","ᴅ","d","👎︎","♎︎","ஞ"];
	var e = ["ễ","Σ","乇","ꫀ","🅴","Ꮛ","Ɇ","ᴇ","ǝ","☜︎","♏︎","≽"];
	var f = ["ƒ","F","千","ᠻ","🅵","Ꭶ","₣","ꜰ","ɟ","☞︎","♐︎","≼"];
	var g = ["ρ","G","Ꮆ","ᧁ","🅶","Ꮆ","₲","ɢ","ƃ","☝︎","♑︎","⋞"];
	var h = ["ԣ","Ή","卄","ꫝ","🅷","Ꮒ","Ⱨ","ʜ","ɥ","☟︎","♒︎","⋟"];
	var i = ["ï","I","丨","꠸","🅸","Ꭵ","ł","ɪ","ᴉ","✋︎","♓︎","o"];
	var j = ["J","J","フ","꠹","🅹","Ꮰ","J","ᴊ","ɾ","☺︎","🙰","1"];
	var k = ["ƙ","K","Ҝ","ᛕ","🅺","Ꮶ","₭","ᴋ","ʞ","😐︎","🙵","2"];
	var l = ["l","ᄂ","ㄥ","ꪶ","🅻","Ꮭ","Ⱡ","ʟ","l","☹","●","3"];
	var m = ["ဣ","M","爪","ꪑ","🅼","Ꮇ","₥","ᴍ","ɯ","💣︎","❍︎","4"];
	var n = ["ἧ","П","几","ꪀ","🅽","Ꮑ","₦","ɴ","n","☠︎","■︎","5"];
	var o = ["ô","Ө","ㄖ","ꪮ","🅾","Ꭷ","Ø","ᴏ","o","⚐︎","□︎","6"];
	var p = ["ƥ","P","卩","ρ","🅿","Ꭾ","₱","ᴘ","d","🏱︎","◻︎","7"];
	var q = ["႖","Q","Ɋ","ꪇ","🆀","Ꭴ","Q","Q","b","✈︎","❑︎","8"];
	var r = ["ř","Я","尺","᥅","🆁","Ꮢ","Ɽ","ꜱ","ɹ","☼︎","❒︎","10"];
	var s = ["ƨ","Ƨ","丂","ᦓ","🆂","Ꮥ","₴","s","💧︎","⬧︎","10"];
	var t = ["ƭ","Ƭ","ㄒ","ꪻ","🆃","Ꮦ","₮","ᴛ","ʇ","❄︎","⧫︎","⓿"];
	var u = ["ᵿ","Ц","ㄩ","ꪊ","🆄","Ꮼ","Ʉ","ᴜ","n","🕆︎","◆︎","❶"];
	var v = ["ṽ","V","ᐯ","ꪜ","🆅","Ꮙ","V","ᴠ","ʌ","✞︎","❖︎","❷"];
	var w = ["ὧ","Щ","山","᭙","🆆","Ꮗ","₩","ᴡ","ʍ","🕈︎","⬥︎","❸"];
	var x = ["ж","X","乂","᥊","🆇","ጀ","Ӿ","x","x","✠︎","⌧︎","❹"];
	var y = ["¥","Y","ㄚ","ꪗ","🆈","Ꭹ","Ɏ","ʏ","ʎ","✡︎","⍓︎","❺"];
	var z = ["ƺ","Z","乙","ƺ","🆉","ፚ","Ⱬ","ᴢ","z","☪︎","⌘︎","❻"];
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