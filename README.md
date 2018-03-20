# @playfulcorgi/markdown-sensible

Converts markdown into HTML following some specific conventions.

## Features:
- Removes HTML comments, so if there are any notes in markdown, they will not be transferred to HTML.
- Editorial converter will convert images to `<figure>`.
- Editorial converter will add links to thumbnails of images to `<figure>`.

## Examples

```js
const { simple } = require('@playfulcorgi/markdown-sensible')
const { readFileSync } = require('fs')
const markdown = readFileSync('./sampleMarkdown.md', 'utf8')
simple(markdown)
  .then((html) => {
    console.log(html)
  })
  .catch((error) => {
    console.error(error)
  })
```

```js
const { editorial } = require('@playfulcorgi/markdown-sensible')
const { readFileSync } = require('fs')
const markdown = readFileSync('./sampleMarkdown.md', 'utf8')
editorial(markdown, { mediaUrlPrefix: 'http://image.url.here/' })
  .then((html) => {
    console.log(html)
  })
  .catch((error) => {
    console.error(error)
  })
```