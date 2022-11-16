/**
 * Author Asli & Penulis : https://github.com/hexagonz
 * uploader : @hadianto0_
 * note: mohon untuk tidak mengubah credit yang sudah ada
 */
const Axios = require('axios')
const cherio = require('cheerio')

function GetProduct(number) {
  return new Promise((resolve, reject) => {
    if (isNaN(number)) reject('masukkan angka produk')
    else
      Axios('https://www.hotelmurah.com/pulsa/top-up-dana', {
        method: 'GET',
        headers: {
          'Content-type': 'text/html; charset=UTF-8',
        },
      })
        .then(({ data }) => {
          const $ = cherio.load(data)
          const csrf = $('.txt_csrfname').attr('value')
          const form = {
            tipe_produk: number,
            hm_csrf_hash_name: csrf,
          }
          Axios('https://www.hotelmurah.com/pulsa/index.php/ewallet/getProductEwallet', {
            method: 'POST',
            data: new URLSearchParams(Object.entries(form)),
          })
            .then((res) => {
              resolve({
                status: res.status,
                product: res.data.data.daftar_product,
                token: res.data.csrf,
              })
            })
            .catch(reject)
        })
        .catch(reject)
  })
}

function OrderValidated(Csrf, value_produk, value_id, no_hp) {
  return new Promise(async (resolve, reject) => {
    Csrf(value_produk)
      .then((a) => {
        const order = {
          cust_number: no_hp,
          id: value_id,
          tipe_produk: value_produk,
          web: 'web',
          hm_csrf_hash_name: a.token,
        }
        Axios('https://www.hotelmurah.com/pulsa/index.php/ewallet/isOrderValidated', {
          method: 'POST',
          data: new URLSearchParams(Object.entries(order)),
        })
          .then((res) => {
            if (!isNaN(value_produk)) resolve(res.data)
            else reject('Masukkan Angka! cuy')
          })
          .catch(reject)
      })
      .catch(reject)
  })
}

function Order(Validate, Product, value_produk, value_id, no_hp) {
  return new Promise(async (resolve, reject) => {
    Validate(Product, value_produk, value_id, no_hp).then((res) => {
      const detailOrder = {
        hm_csrf_hash_name: res.csrf,
        data: res.data,
      }
      Axios('https://www.hotelmurah.com/pulsa/Ewallet/detailOrder', {
        method: 'POST',
        data: new URLSearchParams(Object.entries(detailOrder)),
      })
        .then((res) => {
          const $ = cherio.load(res.data)
          const form = $('[data-id="bank_trf6"]')
            .attr('onclick')
            .replace(/[pilihanPayment()']/gi, '')
            .split(',')
          const submitorder = {
            data: detailOrder.data,
            payment_pay: form[0],
            id_pay: 100,
            payment_pay: 'qris',
            no_ovo: '085751056816',
            type_pembayaran: 'x4',
            source: '',
            hm_csrf_hash_name: detailOrder.hm_csrf_hash_name,
          }
          Axios('https://www.hotelmurah.com/pulsa/ewallet/submitorder', {
            method: 'POST',
            data: new URLSearchParams(Object.entries(submitorder)),
          })
            .then((res) => {
              const wallet = {
                idorder: res.data.status,
                hm_csrf_hash_name: res.data.csrf,
              }
              resolve({
                detail: submitorder,
                payment: wallet,
              })
            })
            .catch(reject)
        })
        .catch(reject)
    })
  })
}

function Payment(Orders, Validate, Product, value_produk, value_id, no_hp) {
  return new Promise((resolve, reject) => {
    Orders(Validate, Product, value_produk, value_id, no_hp).then((res) => {
      Axios('https://www.hotelmurah.com/pulsa/Ewallet/finishXendit', {
        method: 'POST',
        data: new URLSearchParams(Object.entries(res.payment)),
      })
        .then((res) => {
          const $ = cherio.load(res.data)
          const img = $('img.img-qris').attr('src')
          Axios($('.plntrx').find('a').attr('href'), {
            method: 'GET',
          })
            .then(({ data }) => {
              const $ = cherio.load(data)
              resolve({
                order_id: $('div > div:nth-child(2) > p:nth-child(2)').text(),
                tagihan: $('div:nth-child(4) > p.mb0.color-orange.hm-bold').text(),
                time: $('div.hm.hm_50.hm-center.bor-hm-r-solid > p:nth-child(2)').text(),
                RRN: $('div:nth-child(3) > div:nth-child(3) > p.mb0.hm-bold').text(),
                product: $('div:nth-child(5) > div:nth-child(1) > p.mb0').text(),
                img: img,
              })
            })
            .catch(reject)
        })
        .catch(reject)
    })
  })
}
/**
 *
 * @param {number} product_id id produk
 * @param {string} PhoneNumber
 * @returns
 **/
exports.convertSaldo = async (product_id, PhoneNumber) => await Payment(Order, OrderValidated, GetProduct, 11, product_id, PhoneNumber)
