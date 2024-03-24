interface Status {
  emoji: string
  icon?: string
  desc?: string
  ttl: number
  untilAt: number
}

function assetAuth(ctx: Context) {
  const body = ctx.req.body
  const authKey = ctx.secret.key
  if (ctx.isAuthenticated) return
  if (body.key !== authKey) {
    ctx.throws(401, 'Unauthorized')
  }
}
export default async function handler(ctx: Context) {
  const method = ctx.req.method.toLowerCase()

  switch (method) {
    case 'get': {
      return GET(ctx)
    }
    case 'post': {
      assetAuth(ctx)
      return POST(ctx)
    }
    case 'delete': {
      assetAuth(ctx)
      return DELETE(ctx)
    }
    default: {
      ctx.throws(405, 'Method Not Allowed')
    }
  }
}

const cacheKey = 'shiro:status'

function DELETE(ctx: Context) {
  ctx.storage.cache.del(cacheKey)
  ctx.broadcast('shiro#status', null)
}
function POST(ctx: Context) {
  const body = ctx.req.body

  const { emoji, icon, desc } = body as Status
  const ttl = body.ttl || 86400 // 1 day

  const status = {
    emoji,
    icon,
    desc,
    ttl,
    untilAt: Date.now() + ttl,
  } as Status
  ctx.storage.cache.set(cacheKey, JSON.stringify(status), ttl)
  ctx.status(204)

  ctx.broadcast('shiro#status', status)
}

function GET(ctx: Context) {
  const status = ctx.storage.cache.get(cacheKey)
  ctx.res.type('application/json')
  return status
}
