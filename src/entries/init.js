import swal from 'sweetalert2'
import bucket from '@/models/bucket'
import Model from '@/models/Model'

swal.setDefaults({
  input: 'text',
  confirmButtonText: 'Next &rarr;',
  progressSteps: ['1', '2', '3']
})

const steps = [
  '请输入AccessKey',
  '请输入SecretKey',
  '请输入初始化密码'
]

let keys = null

bucket.fetchFile('init.json')
  .then(() => {
    window.location = '/admin.html'
  })
  .catch(() => swal.queue(steps))
  .then(({ value: [ak, sk, password] }) => {
    keys = { ak, sk }
    return new Model(`secret-${password}`).saveToCloud(keys, keys)
  })
  .then(() => new Model('init').saveToCloud(keys, null))
  .then(() => (window.location = '/admin.html'))
  .catch(error => console.error(error))
