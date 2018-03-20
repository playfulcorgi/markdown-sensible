const marked = require('marked')
const MarkdownParseError = require('../MarkdownParseError')
const htmlConverter = require('../htmlConverter')
const excerptToMarkdownRenderer = new marked.Renderer()
/**
 * Will remove comments from HTML (which could contain sensitive notes).
 * @param {string} markdown - input markdown to transform
 */
const simple = (markdown) => (
   new Promise((resolve, reject) => {
    marked(
      markdown,
      {
        renderer: excerptToMarkdownRenderer
      },
      (error, content) => {
        if (error) {
          reject(new MarkdownParseError(error.message))
          return
        }
        try {
          const convertedHTML = htmlConverter(content)
          resolve(convertedHTML)
        } catch (error) {
          reject(new MarkdownParseError(error.message))
        }
      }
    )
  })
)

module.exports = simple
