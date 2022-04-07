import extra from '@mx-space/extra'

async function handler() {
  const { NeteaseMusic, NeteaseCloudMusicApi } = extra

  const client = new NeteaseMusic(phone, password)
  await client.Login()

  const uid = await client.getAccount()

  const weekdata = await client.getWeekData()
  const alldata = await client.getAllData()
  const playlist = await client.getFavorite()

  const detail = await NeteaseCloudMusicApi.user_detail({
    uid,
  }).then((res) => (res.body.code === 200 ? res.body.profile : null))

  const responsePayload = {
    playlist,
    weekdata,
    alldata,
    detail,
  }

  return responsePayload
}

/// CONFIGS ///
const phone = ''
const password = ''
/// CONFIGS END ///
