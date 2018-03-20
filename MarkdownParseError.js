function MarkdownParserError(message) {
  this.name = 'MarkdownParserError'
  this.message = message
  this.stack = (new Error()).stack
}
MarkdownParserError.prototype = new Error
module.exports = MarkdownParserError