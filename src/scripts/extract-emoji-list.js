const cheerio = require('cheerio')
const fs = require('fs')
// fetch from http://unicode.org/emoji/charts/full-emoji-list.html
const $ = cheerio.load('TODO FETCH ME')

const emojiList = []

$('body > div.main > table > tbody > tr > td.name').each(function(i, elm) {
  emojiList.push({
    text: $(this).text(),
    emoji: $(this)
      .prevAll('td.chars')
      .text()
  })
})

fs.writeFileSync('./emoji-list.json', JSON.stringify(emojiList, null, 2))
