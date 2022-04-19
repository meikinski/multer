const express = require('express')
const { imageUploader, catUploader } = require('./middlewares/imageUploader.js')

const app = express()
const port = 8000

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello Multer!')
})

app.get('/upload', (req, res) => {
  res.sendFile(__dirname + '/page.html')
})

app.post(
  '/upload-profile-pic',
  imageUploader.single('profile_pic'),
  (req, res) => {
    if (!req.file) res.status(400).send('No file selected')
    console.log(req.file)
    res.send(`
  <h2>Here is the picture:</h2>
  <img src=http://localhost:8000/uploads/${req.file.originalname} alt=${req.file.originalname} />
  `)
  }
)

app.post(
  '/upload-cat-pics',
  catUploader.array('cat_pics', 1000),
  (req, res) => {
    console.log(req.files)
    let html = ''
    req.files.forEach((file) => {
      html += `<img src=http://localhost:8000/uploads/${file.originalname} />`
    })
    res.send(`<h2>Here is the picture:</h2><br />${html}`)
  }
)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
