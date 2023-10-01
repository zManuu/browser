import test from './test.json'

function removeHttpProtocols(input) {
  return input.replace('https://', '')
}

test.author.website = removeHttpProtocols(test.author.website)
console.log(test)
