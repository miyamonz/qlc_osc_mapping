let fs = require("fs")
let cheerio = require("cheerio")
let $ = cheerio.load("", {xmlMode: true})
let xml = fs.readFileSync("./slider.xml").toString();

module.exports = function (config = { width: 60, height: 200, col: 10, row: 5,dmx: 512 }) {
  [...Array(config.dmx).keys()].map( i => {
    let $s = cheerio.load(xml, {xmlMode: true})
    let x = i % config.col;
    let y = Math.floor(i / config.col);
    $s("WindowState").attr("X", x * config.width);
    $s("WindowState").attr("Y", y * config.height);
    $s("WindowState").attr("Width",  config.width);
    $s("WindowState").attr("Height", config.height);
    return $s.html()
  }).forEach( e => $.root().append(e) )

  return $.html();
}
