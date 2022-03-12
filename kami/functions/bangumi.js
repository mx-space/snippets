async function handler() {
  const extra = await require('@mx-space/extra')
  const { BiliClient } = extra
  const bl = await context.getMaster().then((user) => user.socialIds.bilibili)
  const client = new BiliClient(parseInt(bl || uid))
  const bangumi = await client.getFavoriteBangumi(parseInt(len))
  return bangumi
}

const uid = 26578164
const len = 10
