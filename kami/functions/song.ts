type Song = {
  author: string
  /**
   * 封面 url
   */
  pic: string
  title: string

  url: string
}

async function handler(ctx, require) {
  const { NeteaseCloudMusicApi } = await require('@mx-space/extra')
  const { song_url, song_detail } = NeteaseCloudMusicApi
  const id = ctx.req.query.id
  if (!id) {
    return { message: 'id must be not empty stringnumber' }
  }
  const [data, data2] = await Promise.all([
    song_url({
      id: +id,
    }),
    song_detail({
      ids: id,
    }),
  ])
  const song = data2.body.songs[0]
  const songDetail: Song = {
    title: song.name,
    author: song.ar?.map((a) => a.name).join(' & '),
    pic: song.al?.picUrl,
    url: data.body.data?.[0]?.url,
  }
  return [songDetail]
}
