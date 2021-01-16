const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json')

module.exports.run = async (client, message, args) => {
 if(!message.member.roles.cache.get(ayarlar.BanYetkilisi) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta.')

 
let unbanid = args[0]
if(!unbanid) return message.reply("Banını kaldırmak istediğin kişinin **ID** sini yazmalısın.")

  
message.guild.members.unban(unbanid)
message.channel.send(`<@${unbanid}>, Adlı Kullanıcının Banı Kaldırıldı.`).then(msg => msg.delete(5000))

const unban = new Discord.MessageEmbed()
.setColor('BLACK')
.setThumbnail(message.author.avatarURL())  
.setDescription(`**• Hercus Moderation ! \n\n• Banı Kaldıran Yetkili :`+ message.member +`\n• Banı Kaldırılan Kullanıcı : <@${unbanid}>**`)
.setTimestamp()
.setFooter('Hercus Moderation')
client.channels.cache.get(ayarlar.BanKanal).send(unban)

  

};
exports.conf = {
enabled:true,
guildOnly: true,
aliases: ["unban"],
permlevel: 2
};
exports.help = {
name: "unban",
description: "Herhangi bir kullanıcının banını açarsınız.",
usage: "unban kullanıcı"
};