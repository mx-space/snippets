import extra from '@mx-space/extra'

async function handler() {
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
