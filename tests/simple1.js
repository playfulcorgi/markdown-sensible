const { simple } = require('../index')
const { readFileSync } = require('fs')
const markdown = readFileSync('./sampleMarkdown.md', 'utf8')
simple(markdown)
  .then((html) => {
    console.log(html)
  })
  .catch((error) => {
    console.error(error)
  })
