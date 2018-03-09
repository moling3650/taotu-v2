const thumbnail = (photoURL, width = 1000, height) => `${photoURL}?imageMogr2/thumbnail/!${width}x${height || width}r`

export default thumbnail
