import extra from '@mx-space/extra'

const cacheKey = 'netease-lyrics'
async function handler() {
  const { NeteaseCloudMusicApi } = extra
  const {
    req: { query },

    storage: { cache },
  } = context

  if (!query.id) {
    context.throws(400, 'id is required')
  }

  const { get, set } = cache
  const fromCache = await get(cacheKey + ':' + query.id)
  if (fromCache) {
    return fromCache
  }

  const { lyric } = NeteaseCloudMusicApi
  const result =
    (
      await lyric({
        id: query.id,
      })
    ).body?.lrc?.lyric || ''
  result && (await set(`${cacheKey}:${query.id}`, result))
  return result
}
