/**
 * author dan penulis asli: @hardianto02_
 * @implemented from hexagonz
 * mohon untuk tidak mengubah credit yang sudah ada
 */

const { default: fetch } = require('node-fetch')
const cheerio = require('cheerio')

exports.csrfGenerator = async () => {
  return new Promise(async (resolve, reject) => {
    const asu = await fetch('https://www.hotelmurah.com/pulsa/top-up-gopay')
    const data = await asu.text()
    const $ = cheerio.load(data)
    const csrfHash = $('.txt_csrfname').attr('value')
    const csrfName = $('.txt_csrfname').attr('name')
    resolve({
      csrfHash,
      csrfName,
    })
  })
}
exports.listProduct = async (token) => {
  return new Promise(async (resolve, reject) => {
    const asu = await fetch('https://www.hotelmurah.com/pulsa/index.php/ewallet/getProductEwallet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        referer: 'https://www.hotelmurah.com/pulsa/top-up-gopay',
      },
      body: new URLSearchParams({
        tipe_produk: 12,
        [token.csrfName]: token.csrfHash,
      }),
    })
    const data = await asu.json()
    resolve(data)
  })
}
exports.isProductValid = async (token, productId, PhoneNumber) => {
  return new Promise(async (resolve, reject) => {
    if (PhoneNumber.length < 10) {
      reject('Phone number must be 10 digit')
    }
    const asu = await fetch('https://www.hotelmurah.com/pulsa/index.php/ewallet/isOrderValidated', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        referer: 'https://www.hotelmurah.com/pulsa/top-up-gopay',
      },
      body: new URLSearchParams({
        cust_number: PhoneNumber,
        id: productId,
        tipe_produk: 12,
        web: 'web',
        [token.csrfName]: token.csrfHash,
      }),
    })
    const data = await asu.json()
    resolve(data)
  })
}
exports.getDetailProduct = async (dataValid) => {
  return new Promise(async (resolve, reject) => {
    const asu = await fetch('https://www.hotelmurah.com/pulsa/Ewallet/detailOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        referer: 'https://www.hotelmurah.com/pulsa/top-up-gopay',
      },
      body: new URLSearchParams({
        data: dataValid.data,
        hm_csrf_hash_name: dataValid.csrfHash,
      }),
    })
    const datas = await asu.text()
    const $ = cheerio.load(datas)
    var csrfName = $('.txt_csrfname').attr('name') // Value specified in $config['csrf_token_name']
    var csrfHash = $('.txt_csrfname').val() // CSRF hash
    let payment = $('#cardcc').val()

    resolve({
      [csrfName]: csrfHash,
      data: dataValid.data,
      payment,
      id_pay: 100,
      type_pembayaran: 'x4',
      payment_pay: 'qris',
      no_ovo: '6281731222764',
      source: '',
      voucher_kode: '',
    })
  })
}
exports.getQrCode = async (idOrder, csrf) => {
  return new Promise(async (resolve, reject) => {
    const resp = await fetch('https://www.hotelmurah.com/pulsa/Ewallet/finishXendit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        referer: 'https://www.hotelmurah.com/pulsa/top-up-gopay',
      },
      body: new URLSearchParams({
        idorder: idOrder,
        hm_csrf_hash_name: csrf,
      }),
    })
    const data = await resp.text()
    const $ = cheerio.load(data)
    resolve($('.img-qris').attr('src'))
  })
}
/**
 * convert your saldo to gopay
 * @param {Number} idNominal id nominlal
 * @param {String} PhoneNumber nomor gopay yang akan ditambahkan [pastikan nomor gopay sudah benar]
 * @returns
 */
exports.convertGopay = async (idNominal, PhoneNumber, token) => {
  const datas = await this.isProductValid(token, idNominal, PhoneNumber)
  return new Promise(async (resolve, reject) => {
    const data = await fetch('https://www.hotelmurah.com/pulsa/ewallet/submitorder', {
      method: 'POST',
      body: new URLSearchParams(await this.getDetailProduct(datas)),
      headers: {
        Referer: 'https://www.hotelmurah.com/pulsa/top-up-gopay',
        'Content-type': 'application/x-www-form-urlencoded',
      },
    })
    const dataa = await data.json()
    const qr = await this.getQrCode(dataa.status, dataa.csrf)
    resolve({
      ...dataa,
      qr,
    })
  })
}
