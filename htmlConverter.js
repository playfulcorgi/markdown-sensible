const htmlparser = require('htmlparser2')
const convertHTML = (html) => {
  let output = ''
  let currentTagDepth = 0
  const htmlConverter = new htmlparser.Parser({
    onopentag: (tagname, attributes) => {
      currentTagDepth += 1
      const attributeParts = []
      
      for(let attributeKey in attributes){
        attributeParts.push(`${attributeKey}="${attributes[attributeKey]}"`)
      }
  
      const attributesString = attributeParts.length > 0 ? ' ' + attributeParts.join(' ') : ''
  
      output += `<${tagname}${attributesString}>`
    },
    ontext: (text) => {
      output += text
    },
    onclosetag: (tagname) => {
      if(tagname !== 'br' && tagname !== 'hr' && tagname !== 'img' && tagname !== 'input'){
        output += `</${tagname}>`
      }
      currentTagDepth -= 1
    }
  }, {
    decodeEntities: true,
    xmlMode: false,
    recognizeSelfClosing: true
  })
  htmlConverter.write(html)
  htmlConverter.parseComplete()
  if (currentTagDepth > 0) {
    throw new Error(
      `Parsing failed, currentTagDepth !== 0 but ${currentTagDepth}.`)
  }
  return output
}

module.exports = convertHTML