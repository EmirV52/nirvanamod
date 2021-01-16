const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
  
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\    
  
 if(!message.member.roles.cache.get(ayarlar.JailYetkilisi) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta!')

  let kişi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!kişi) return message.channel.send(`Jailden Çıkartmak için Bir **Kullanıcı** Etiketlemelisin!`)
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\  

        let jailzaman = args[0]
          .replace("sn", "s")
          .replace("dk", "m")
          .replace("sa", "h")
          .replace("gün", "d");
          let vakit = jailzaman
            .replace("m", " dakika")
            .replace("s", " saniye")
            .replace("h", " saat")
            .replace("d", " d");

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\    
  
  db.add(`cezaPuan.${kişi.id}`, -5)
  
  let cezapuan = db.fetch(`cezaPuan.${kişi.id}`);
  
  db.add(`muteSorgu.${kişi.id}`, -1)
  
  let jailsorgu = db.fetch(`muteSorgu.${kişi.id}`); 
  
  db.delete(`muteli_${message.guild.id + kişi.id}`, 'muteli')
db.delete(`süre_${message.mentions.users.first().id + message.guild.id}`, jailzaman)
  
          

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\          
            kişi.roles.remove(ayarlar.JailCezalıRol);
            kişi.roles.add(ayarlar.Unregistered)
            message.react("✅")

            const sadxstriga = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true }))
  .setColor(`PURPLE`)
  .setTimestamp()
  .setDescription(`• Yetkili: <@${message.author.id}> | \`${message.author.id}\`
• Jailden Çıkarılan: <@${kişi.id}> | \`${kişi.id}\`
• Kanal: \`${message.channel.name}\``)
client.channels.cache.get(ayarlar.JailKanal).send(sadxstriga)
  
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
  

}
      
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unjail"],
  permLevel: 0,
}

exports.help = {
  name: "unjail"
};