import extra from '@mx-space/extra'
async function handler() {
  const { BiliClient } = extra
  const bl = await context.getMaster().then((user) => user.socialIds.bilibili)
  const client = new BiliClient(parseInt(bl || uid))
  const bangumi = await client.getFavoriteBangumi(parseInt(len.toString()))
  return bangumi
}
// 如果社交平台 ID 录入中有哔哩哔哩 ID 可不填，留空
const uid = 26578164
const len = 10
