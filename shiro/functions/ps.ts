export default async function handler(ctx: Context) {
  const { timestamp, process, key, media } = ctx.req.body || {}

  const [processName, mediaInfo] = await Promise.all([
    ctx.storage.cache.get('ps'),
    ctx.storage.cache.get('media').then((JSONString) => {
      if (JSONString) {
        try {
          return JSON.parse(JSONString)
        } catch {
          return undefined
        }
      }
    }),
  ])

  if (!key) {
    return {
      processName,
      mediaInfo,
    }
  }

  const validKey = (await ctx.secret.key) || 'testing'
  if (key != validKey)
    ctx.throws(401, "You haven't permission to update process info")
  await ctx.storage.cache.set('ps', process, 60)
  const ts = +new Date()

  if (process !== processName)
    ctx.broadcast('ps-update', {
      process,
      ts,
    })
  if (media) {
    await ctx.storage.cache.set('media', JSON.stringify(media), 10)

    if (mediaInfo.title !== media.title) ctx.broadcast('media-update', media)
  }
  return {
    ok: 1,
    process,
    timestamp: +new Date(),
  }
}
