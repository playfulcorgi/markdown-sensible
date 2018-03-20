const marked = require('marked')
const pygmentizeBundle = require('pygmentize-bundled')
const escapeHTML = require('escape-html')
const MarkdownParseError = require('../MarkdownParseError')
const htmlConverter = require('../htmlConverter')
const editorial = (markdown, { mediaUrlPrefix = null }) => (
  new Promise((resolve, reject) => {
    const contentToMarkdownRenderer = new marked.Renderer()
    contentToMarkdownRenderer.image = (href, title, alt) => {
      let thumbnailHref
      let tinyHref
      if(mediaUrlPrefix !== null && href.substring(0, mediaUrlPrefix.length) === mediaUrlPrefix){
        console.log(`Found image from personal media library, adding dimension options for faster loading.`)
        thumbnailHref = encodeURI(`${mediaUrlPrefix}800/${href.substring(mediaUrlPrefix.length)}`)//mind the slashes
        tinyHref = encodeURI(`${mediaUrlPrefix}50/${href.substring(mediaUrlPrefix.length)}`)//mind the slashes
      }else{
        thumbnailHref = encodeURI(href)
        tinyHref = encodeURI(href)
      }
      const escapedAlt = escapeHTML(alt)
      return (
        `<figure>
          <img
            src-async-tiny="${tinyHref}" 
            src-async-thumb="${thumbnailHref}" 
            src-async-full="${encodeURI(href)}" 
            alt="${escapedAlt}"
          >
          <noscript>
            <div class="noscript-image">
              <img
                src="${thumbnailHref}" 
                alt="${escapedAlt}"
              >
              <a href="${encodeURI(href)}">View full size</a>
            </div>
          </noscript>
          <figcaption>${escapeHTML(title)}</figcaption>
        </figure>`
      )
    }
    marked(
      markdown,
      {
        renderer: contentToMarkdownRenderer,
        highlight: (code, lang, callback) => {
          console.log(`Found source code in language = ${lang}. ` +
            `Using Pygments to convert into pretty HTML.`)
          pygmentizeBundle({
            lang: lang,
            format: 'html'
          }, code, function (error, result) {
            console.log(`Code piece conversion ended for language ${lang}.`)
            callback(error, result.toString())
          })
        }
      },
      (error, content) => {
        if(error){
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

module.exports = editorial
