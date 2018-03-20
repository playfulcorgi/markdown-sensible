const { editorial } = require('../index')
const { readFileSync } = require('fs')
const markdown = readFileSync('./sampleMarkdown.md', 'utf8')
editorial(markdown, { mediaUrlPrefix: 'http://image.url.here/' })
  .then((html) => {
    console.log(html)
  })
  .catch((error) => {
    console.error(error)
  })
