/* 
NOTE : JGN HPS DIBAWAH INI!!
RECODE : RAHMXBOT X RAHMAN GNTENG:V
WHATSAPP : 085821676621
NOMOR BOT : 085821369324
NOTE : JGN HPS AUTHORNYA!!!

DONASI LAH BANG BIAR 
ADMINNYA UPDATE LAGI

Kalau Mau Donasi Silahkan Pilih Yah
Payment : Ovo/Gopay/Dana
Number Payment : Chat Owner Wa nya Di Atas
Pulsa : 081528965381
*/

const fs = require('fs')
const chalk = require('chalk')

//━━━━━━━━━━━━━━━[ WEBSITE APIKEY ]━━━━━━━━━━━━━━━━━//

global.APIs = {
liaacans: 'https://zenzapis.xyz',
}

//━━━━━━━━━━━━━━━[ APIKEY ]━━━━━━━━━━━━━━━━━//

global.APIKeys = {
'https://zenzapis.xyz': '9d30efca66',
}

//━━━━━━━━━━━━━━━[ SETTING ]━━━━━━━━━━━━━━━━━//
global.thumb = fs.readFileSync('./image/thumbnail.jpg') // JGN DI UBAH!
global.name = 'Aulia Rahman (Owner)', // GNTI NAMA LU!
global.creator = 'LiaaCans BOT' // GANTI NAMA BOT LU BANH!
global.owner = ['6285821676621'] // GNTI NOMOR LU!
global.premium = ['6285821676621', '6281528965381']
 // ADD PREM YG LU MAU BANH!!
global.quotes = 'Kesempatan Anda Untuk Sukses Di Setiap Kondisi Selalu Dapat Diukur Oleh Seberapa Besar Kepercayaan Anda Pada Diri Sendiri' // Ganti Quotes, Tapi Trsrh Klian
global.pulsa = ['081528965381'] // UBAH NOMOR YG AKTIF!
global.botname = 'Created LiaaCans BOT' // GNTI NAMA BOT LU!
global.packname = 'Nih Stikel Umtukmu' // TRSERAH MO GANTI AP!
global.author = 'LiaaCans BOT' // GNTI NMA LU!
global.fake = 'LIAACANS BOT VERIFIED' // GNTI NMA BOT LU BANH!
// FITUR TOPUP OTOMATIS 
global.hargadmff = 1261
global.hargadmml = 1700
global.merchant = 'M221101PAZJ5903YO' 
global.secret = 'fcc9c3922337cd1443c071dbd3d356daebe4f908632e293241c31e8ac014c46f'
global.signature = 'ad488c46183fa32611f547ffbc5e4e10'
//CARA AKTIFIN:
//1. DAFTAR DI APIGAMES.UD
//2. AMBIL MERCHANT ID DAN SECRET KEY
//3. DAFTAR DI UNIPIN
//4. HUBUNGKAN AKUN UNIPIN DENGAN APIGANES DI BAGIAN KONEKSI
//5. BUAT SIGNATURE DENGAN TOOLS ENCRYPT MD5 MERCHANTID+SECRETKEY
//6 PASANG DIATAS SITU DAN SELESAI.
global.prefa = ['','!','.','/','#','$']
global.sp = '⭔' // JGN DI UBAH²! NTR EROR
global.mess = {
success: '*[SUCCESS]* SUKSES PERMINTAAN ANDA TERKIRIM!',
admin: 'Fitur Ini Khusus Untuk Admin Group!',
botAdmin: 'Bot Harus Menjadi Admin Terlebih Dahulu!',
prem: 'Fitur Ini Khusus Untuk Premium',
owner: 'Fitur Ini Khusus Untuk Owner Bot',
group: 'Fitur Ini Digunakan Hanya Untuk Group!',
private: 'Fitur Ini Digunakan Hanya Untuk Private Chat!',
bot: 'Fitur Ini Khusus Pengguna Nomor Bot',
wait: '*[WAIT]* SEDANG DIPROSES, HARAP TUNGGU SEBENTAR!',
endLimit: 'Limit Harian Anda Telah Habis, Limit Akan Direset Setiap Jam 12',
}
global.limitawal = {
premium: "Unlimited",
free: 10
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update'${__filename}'`))
delete require.cache[file]
require(file)
})
