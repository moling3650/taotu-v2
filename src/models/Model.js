import bucket from '@/models/bucket'

class Model {
  // constructor
  constructor (filename) {
    this.filename = `${filename}.json`
  }

  fetch (silent = false) {
    return bucket.fetchFile(this.filename)
      .then(body => JSON.parse(body))
      .catch(_ => silent && alert('You must init Web with the administrator tools.'))
  }

  saveToCloud (password, fileData) {
    return bucket.fetchPutToken(password, this.filename)
      .then(putToken => {
        const file = new Blob([JSON.stringify(fileData)], {type: 'application/json'})
        file.name = this.filename
        return bucket.putFile(file.name, file, {putToken})
      })
  }
}

export default Model
