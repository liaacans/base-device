// Fix Aja Kalau Bisa
const { default: makeWaSocket, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, generateWAMessage, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require('@adiwajshing/baileys')
const logg = (pino = require("pino"));
const { Boom } = require('@hapi/boom');
const yargs = require('yargs/yargs')
const fs = require('fs')
const FileType = require('file-type')
const chalk = require('chalk')
const path = require('path')
const qrcode = require('qrcode');
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('../message/myfunc')
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

const storetes = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'storetes' }) })


if (global.listJadibot instanceof Array) console.log()
else global.listJadibot = []

const jadibot = async (liaacans, msg, from) => {
const { sendImage, sendMessage } = liaacans;
const { reply, sender } = m;
let userbot = `${liaacans.decodeJid(liaacans.user.id)}`
const { state, saveState } = useSingleFileAuthState(`./session/jadibot/@${userbot.split("@")[0]}`)
try {
async function startliaacans() {
let { version, isLatest } = await fetchLatestBaileysVersion();
const liaacans = await makeWaSocket({
auth: state,
printQRInTerminal: true,
browser: ['Bot Numpang', "Safari", "1.0.0"],
logger: logg({ level: "silent" }),
version,
})

liaacans.ev.on('messages.upsert', async chatUpdate => {
try {
mek = chatUpdate.messages[0]
if (!mek.message) return
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast') return
if (!liaacans.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
m = smsg(liaacans, m, store)
require("./command/liaacans")(liaacans, m, chatUpdate, store)
} catch (err) {
console.log(err)}
})

store.bind(liaacans.ev);
liaacans.ev.on("connection.update", async up => {
const { lastDisconnect, connection } = up;
if (connection == "connecting") return
if (connection){
if (connection != "connecting") console.log("Connecting to jadibot..")
}
if (up.qr) await sendImage(m.chat, await qrcode.toDataURL(up.qr,{scale : 8}), 'Scan QR ini untuk jadi bot sementara\n\n1. Klik titik 3 di pojok kanan atas\n2. Klik Perangkat Tertaut\n3. Scan QR ini \nQR Expired dalam 30 detik', m)
console.log(connection)
if (connection == "open") {
liaacans.id = liaacans.decodeJid(liaacans.user.id)
liaacans.time = Date.now()
global.listJadibot.push(liaacans)
await m.reply(`*Connected to Whatsapp - Bot*\n\n*User :*\n _*× ID : ${liaacans.decodeJid(liaacans.user.id)}*_`)
let user = `${liaacans.decodeJid(liaacans.user.id)}`
let txt = `*Terdeteksi menumpang Jadibot*\n\n _× User : @${user.split("@")[0]}_`
liaacans.sendMessage('6285821676621@s.whatsapp.net', {text: txt, mentions : [user]})
}

if (connection === 'close') {
let reason = new Boom(lastDisconnect?.error)?.output.statusCode
if (reason === DisconnectReason.badSession) { 
console.log(`Bad Session File, Please Delete Session and Scan Again`); liaacans.logout(); }
else if (reason === DisconnectReason.connectionClosed) { 
console.log("Connection closed, reconnecting...."); startliaacans(); }
else if (reason === DisconnectReason.connectionLost) { 
console.log("Connection Lost from Server, reconnecting..."); startliaacans(); }
else if (reason === DisconnectReason.connectionReplaced) { 
console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); conn.logout(); }
else if (reason === DisconnectReason.loggedOut) { 
console.log(`Device Logged Out, Please Scan Again And Run.`); liaacans.logout(); }
else if (reason === DisconnectReason.restartRequired) { 
console.log("Restart Required, Restarting..."); startliaacans(); }
else if (reason === DisconnectReason.timedOut) { 
console.log("Connection TimedOut, Reconnecting..."); startliaacans(); }
else liaacans.end(`Unknown DisconnectReason: ${reason}|${connection}`)
}
})

liaacans.ev.on('creds.update', saveState)

liaacans.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

liaacans.sendText = (jid, text, quoted = '', options) => liaacans.sendMessage(jid, { text: text, ...options }, { quoted })

}
startliaacans()
} catch (e) {
console.log(e)
}
}


module.exports = { jadibot, listJadibot }


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})