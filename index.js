const Discord = require("discord.js");
const client = new Discord.Client();
const embed = new Discord.RichEmbed();
const Canvas = require("canvas");

const token = process.env.TOKEN;
const prefix = "!";
const guildID = process.env.guildID;
const ownerID = process.env.ownerID;
const whiteList = new Map([[ownerID, 9999], ["291266041068126208", 999]]);
const isOwner = (message) => message.author.id === ownerID;
client.login(token);

//////////////////////////////

client.on("ready", (ready)=>{
    console.log("ready");
    client.users.get("308921859179544577").send("start");
    client.user.setPresence({game: {name: "Black Crow", type:"PLAYING"}});
    //color(client.guilds.get("544874662421725204").roles.find(r=>r.name === client.user.username));
    roleInfo();
});

function roleInfo(){
    console.log(client.guilds.get("544874662421725204").roles.map(r=>`${r.name} | ${r.members.size} | ${r.id}`))
}

var c = 0x0;
function color(rol){
    if (c > (0xffffff-0xfff)) c = 0x0;
    rol.setColor(c);
    c += 0x007FC;
    setTimeout(color, 2000, rol);
}

client.on("message", async (message)=>{
    if (!message.guild) return;
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const GUI = client.guilds.get("544874662421725204");

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "setss"){
        if (!isOwner(message)) return;
        let target = message.mentions.users.first();
        if (!target) return;
        whiteList.set(target.id, parseInt(args[0]));
        message.channel.send({embed:{color: 255*255, description: `${target} has ${whiteList.get(target.id)} points`}});
    }
    if (command === "addss"){
        if (!isOwner(message)) return;
        let target = message.mentions.users.first();
        if (!target) return;
        whiteList.set(target.id, whiteList.get(target.id)+parseInt(args[0]));
        message.channel.send({embed:{color: 255*255, description: `${target} has ${whiteList.get(target.id)} points`}});
    }
    if (command === "ss"){
        let authorId = message.author.id;
        if (!whiteList.has(authorId)) return message.channel.send("Нету в списке");
        if (whiteList.get(authorId) <= 0) return message.channel.send("закончились поинты");

        let attachment = message.attachments.first();
        if (!attachment) return message.channel.send("dont find image");
        let imageSS = attachment.url;

        let text = message.content.slice(command.length+prefix.length+1);
        let textArr = text.split("\n");
        
        message.channel.startTyping();
        var image;
         try{
            image = await Canvas.loadImage(imageSS);
        }catch(e){message.channel.stopTyping();
            return console.log(e)}

        const canvas = Canvas.createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        ctx.font = "bold 20px serif";
        var y = 25;
        textArr.forEach(function(line){
            line = line.trim();
            if (line.startsWith("me")){
                ctx.fillStyle = "#b754d1";
                line = line.slice(2).trim();
            }
            else
            ctx.fillStyle = `rgb(255, 255, 255)`;
            ctx.strokeText(line, 15, y);
            ctx.fillText(line, 15, y);
            y += 22;
        });

        whiteList.set(authorId, whiteList.get(authorId)-1);
        await message.channel.send({
            embed: {
                description: "have " + whiteList.get(authorId),
                color: 255*255,
                image: {
                     url: 'attachment://file.jpg'
                  }
               },
               files: [{
                  attachment: canvas.toBuffer(),
                  name: 'file.jpg'
               }]
            });
        await client.channels.get("552527923672776705").send(message.author.tag ,
            {files: [{
                attachment: canvas.toBuffer(),
                name: 'file.jpg'}]
            });
        message.channel.stopTyping();
    }
    if (command === "del" || command === "dell"){
        if (!message.channel.memberPermissions(message.member).has("MANAGE_MESSAGES")) return message.channel.send("don't have permission");
        //if (message.author.id != "308921859179544577" && message.author.id != "429323228117467136") return;
        if (isNaN(args[0])) return console.log("nan");
        message.channel.bulkDelete(parseInt(args[0])+1, true);
    }
    if (command === "bot"){
        if (!isOwner(message)) return;
        message.channel.send({embed:{description: message.content.slice(prefix.length+command.length)}})
    }
    if (command === "t1"){
        if (!isOwner(message)) return;
        message.channel.send({embed:{
            description: "Сейчас мы расскажем с чего все начиналось, еще давно когда наш друг был генералом армии США, задумался он о создании данного клуба. Но все это были лишь мечты. Он даже в своё свободное время искал место под где будет находиться клуб. Шли годы, и когда у нашего любимого генерала подходил срок, и ему уже надо было на отставку, решил он осуществить мечту свей жизни,  построить свою империю. Так и начинается история создания клуба \"Black Crow\"",
            timestamp: new Date('2019-02-12T17:00:00.000Z'),
            color: 43775
        }});
    }
    if (command === "t2"){
        if (!isOwner(message)) return;
        message.channel.send({embed:{
            description: "Было проведено собрание. На котором была решена дальнейшая судьба клуба. Были набраны следующие участники:\nLeonardo Swift, Lorenzo Gattie, Manuel Meso,  Marian Campbell, Mike Murphy, Anton Royce,  Haims Dahako, Carol Rosewood, Jaromir Perschin, Dante Eskobare, Mike Lothbrok, Dairon Bullet, Jason Brook.\n\nЭто первые возможные байкеры.\n\nБыли созданы первые законы, правила. Первостепенной задачей клуба  стал поиск места обоснования.",
            timestamp: new Date('2019-02-12T21:00:00.000Z'),
            color: 43775
        }});
    }
    if (command === "t3"){
        if (!isOwner(message)) return;
        message.channel.send({embed:{
            description: "Всеобщем решением на собрании было принято:\nЗаказные убийства и ограбления, торговля оружием, грабежи на дорогах.",
            timestamp: new Date('2019-02-13T00:15:00.000Z'),
            color: 43775
        }});
    }
    if (command == "news"){
        
        let checkRole = (id) => id.map(i=>message.member.roles.has(i)).every(e=>e === false);
        if (checkRole(["544905847994712064","544905004197216275","544894702625751040","544905166726496276","544907129052463124"])) return;
        let mes = message.content.slice(prefix.length+command.length);
        let attachment = message.attachments.first();
        if (mes == "" && !attachment) return;
        message.channel.send({embed:{
            description: message.content.slice(prefix.length+command.length),
            footer: {
                //icon_url: message.author.avatarURL,
                text: `${message.author.tag}`
            },
            timestamp: new Date(),
            image: {
                url: attachment ? attachment.url : ""
              },
            color: 43775
        }}).then(()=>{
            setTimeout(()=>{
                message.delete();
            }, 3000);
        });
    }
    if (command == "role"){
        if (!args[0]) return message.channel.send({embed:{
            color: 16711680,
            description: "Use: "+client.config.prefix+message.cmd.help.usage
        }});
        const roles = message.guild.roles.array().filter(r=>r.name.toLowerCase().match(args.join(" ").toLowerCase()));
        if (roles.length == 0) return message.channel.send({embed:{
            color: 16711680,
            description: `Role **${args.join(/ +/)}** not found`
        }});
        if (roles.length == 1){
            var output = `Members with role **${roles[0]}** | **${roles.map(r=>r.members.size)}**\n\n`
            let n = 0;
            //console.log(`${n}  ${output.length}`);
            roles[0].members.forEach(mem => {
                if ((output.length + mem.user.toString().length) < 2028){
                    output += mem.user + " ";
                }
                else {
                    n++;
                }
            });
            output += `${n ? `  **[${n}]**`: ""}`;
            message.channel.send({embed:{color: roles[0].color || 255*255,description:output}});
        } else {
            var output = `Roles found **[${roles.length}]**\n\nEnter number with role\n\n${roles.map((r, i)=>`${++i}) ${r}`).join("\n")}`;
            if (output.length > 2038) output = `Roles found **[${roles.length}]**`;
            else {
                var filter = m => m.author.id === message.author.id;
                message.channel.awaitMessages(filter,{time: 60000,max: 1})
                .then(m=>{
                    var index = (m.first().content)-1;
                    if (!roles[index]) return;
                    output = `Members with role **${roles[index]}** | **${roles[index].members.size}**\n\n`
                    let n = 0;
                    roles[index].members.forEach(mem => {
                        if ((output.length + mem.user.toString().length) < 2028){
                            output += mem.user + " ";
                        }
                        else {
                            n++;
                        }
                    });
                    output += `${n ? `  **[${n}]**`: ""}`;
                    message.channel.send({embed:{color: roles[index].color || 255*255,description:output}});
                })
                .catch(e=>e);
            }
            message.channel.send({embed:{
                color: 16776960,
                description: output
            }});
        }
    }
})



client.on('guildMemberAdd',(guildmember)=>{
    if (guildmember.guild.id !== "544874662421725204") return;
    guildmember.send({embed:{color: 43775, description:"Если хочешь вступить в клуб [тыкай сюда](https://docs.google.com/forms/d/e/1FAIpQLSevmhIjeaDcWXYXLJvkzsyXe5DPo4nxDevbhI0qhFTeQmyp7A/viewform)"}});
    
    let roleNew = guildmember.guild.roles.get("548587960258396163");
    guildmember.addRole(roleNew);

    /*let rand = Math.floor(Math.random() * 5);
    switch (rand) {
  case 0:
        guildmember.guild.channels.get("548590343168458753").send(`${guildmember.user} теперь здесь.`);
    break;
  default:
        guildmember.guild.channels.get("548590343168458753").send(`Привет ${guildmember.user}`);
    }   */
});

client.on('messageReactionAdd', (react, user) => {
    var guildmember = client.guilds.get(guildID).members.get(user.id);
    let checkRole = (id) => id.map(i=>guildmember.roles.has(i)).every(e=>e === true);
    if (react.message.channel.id !== "550415394091958272") return;
        if (checkRole(["544906123451432961", "548587960258396163"])){
            react.remove(user);
            client.users.get(ownerID).send(`Delete emoji in ${react.message.channel.name} ${guildmember.user.tag}`);
        }   
});

client.on('error',(error)=>{});

client.on('warn', () => {});
