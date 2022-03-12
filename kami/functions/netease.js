async function handler(ctx, require) {
  const extra = await require('@mx-space/extra')
  const { NeteaseMusic } = extra

  const client = new NeteaseMusic(phone, password)
  await client.Login()

  const weekdata = await client.getWeekData()
  const alldata = await client.getAllData()
  const playlist = await client.getFavorite()

  const responsePayload = {
    playlist,
    weekdata,
    alldata,
  }

  return responsePayload
}

const phone = ''
const password = ''
