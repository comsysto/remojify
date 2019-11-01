const Fuse = require('fuse.js')
const emojis = require('./emoji-list.json')

const options = {
  shouldSort: true,
  threshold: 0.5,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 2,
  keys: ['text']
}
const fuse = new Fuse(emojis, options)
const emojisFound = text =>
  text
    .split(' ')
    .filter(a => a.length > 3)
    .map(a => ({
      text: a,
      emoji: fuse.search(a)[0] ? fuse.search(a)[0].emoji : ''
    }))
    .filter(a => a.emoji)

const run = text =>
  text
    .split(' ')
    .map(word => {
      const allEmojis = emojisFound(text)
      const emojiFound = allEmojis.find(({ text }) => text === word)
      return emojiFound ? emojiFound.emoji : word
    })
    .join(' ')

module.exports = run
