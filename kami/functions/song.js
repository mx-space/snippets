async function handler(ctx, require) {
  const { NeteaseCloudMusicApi } = await require('@mx-space/extra')
  const { song_url } = NeteaseCloudMusicApi
  const id = ctx.req.query.id
  if (!id) {
    return { message: 'id must be not empty stringnumber' }
  }
  const data = await song_url({
    id: +id,
  })

  return data.body.data
}
