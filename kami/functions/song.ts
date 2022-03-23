import { NeteaseCloudMusicApi } from '@mx-space/extra'

async function handler() {
  const { song_url } = NeteaseCloudMusicApi
  const id = context.req.query.id
  if (!id) {
    return { message: 'id must be not empty stringnumber' }
  }
  const data = await song_url({
    id: +id,
  })

  return data.body.data
}
