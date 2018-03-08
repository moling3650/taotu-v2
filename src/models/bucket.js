import qiniu from 'qiniu.js'
import crypto from 'crypto-browserify'
import config from '@/config/bucket.json'

const isString = (value) => typeof value === 'string'
const safeEncode = (str) => btoa(str).replace(/\//g, '_').replace(/\+/g, '-')
const encodeSign = (str, key) => crypto
  .createHmac('sha1', key)
  .update(str)
  .digest('base64')
  .replace(/\//g, '_')
  .replace(/\+/g, '-')

const bucket = qiniu.bucket(config.name, { url: config.url })

bucket.fetchFile = (filename) => bucket.getFile(`${filename}?r=${Math.random()}`)

/**
 * 通过密码获取七牛数据桶的密钥
 * @param  String password 密码
 * @return Promise         包含密钥的Promise
 */
bucket.getKeys = (password) => {
  if (!isString(password)) {
    throw new TypeError('Password must be a string')
  }
  return bucket.fetchFile(`secret-${password}.json`).then(body => JSON.parse(body))
}

/**
 * 通过密码获取七牛数据桶的上传令牌
 * @param  String|Object password   密码或密钥
 * @param  String        scope      上传标识
 * @return Promise                  上传令牌
 */
bucket.fetchPutToken = (password, scope = null) => {
  return (isString(password) ? bucket.getKeys(password) : Promise.resolve(password))
    .then(keys => {
      if (!(keys && keys.ak && keys.sk)) {
        throw new TypeError('keys.ak and keys.sk are required')
      }
      const options = {
        scope: scope ? `${config.name}:${scope}` : config.name,
        deadline: Math.floor(Date.now() / 1000) + 3600
      }

      const signture = safeEncode(JSON.stringify(options))
      const encodeDigest = encodeSign(signture, keys.sk)
      const token = `${keys.ak}:${encodeDigest}:${signture}`
      return token
    })
}

/**
 * 通过密码上传文件
 * @param  String|Object password   密码或密钥
 * @param  String        filename   文件名
 * @param  Object        file       文件对象
 * @return Promise                  访问文件的URL
 */
bucket.uploadFile = (password, filename, file) => {
  return bucket.fetchPutToken(password, filename)
    .then(putToken => bucket.putFile(filename, file, {putToken}))
    .then(() => bucket.key(filename).url())
}

export default bucket
