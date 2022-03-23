#!env zx

fetch(
  'https://fastly.jsdelivr.net/gh/mx-space/assets@master/types/type.declare.ts',
)
  .then((res) => res.text())
  .then((text) => {
    fs.writeFileSync('./global.d.ts', text, { encoding: 'utf8' })
  })
