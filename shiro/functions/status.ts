interface Status {
  emoji: string
  icon?: string
  desc?: string
  ttl: number
  untilAt: number
}

export default async function handler(ctx: Context) {
  const method = ctx.req.method.toLowerCase()

  switch (method) {
    case 'get': {
      return GET(ctx)
    }
    case 'post': {
      return POST(ctx)
    }
    default: {
      ctx.throws(405, 'Method Not Allowed')
    }
  }
}

const cacheKey = 'shiro:status'

function POST(ctx: Context) {
  const body = ctx.req.body
  const authKey = ctx.secret.key
  if (body.key !== authKey) {
    ctx.throws(401, 'Unauthorized')
  }
  const { emoji, icon, desc, ttl } = body as Status
  const now = new Date()

  now.setSeconds(now.getSeconds() + ttl)

  const status = {
    emoji,
    icon,
    desc,
    ttl,
    untilAt: now.getTime(),
  } as Status
  ctx.storage.cache.set(cacheKey, JSON.stringify(status), ttl)
  ctx.status(204)

  ctx.broadcast('status-update', status)
}

function GET(ctx: Context) {
  const status = ctx.storage.cache.get(cacheKey)
  ctx.res.type('application/json')
  return status
}
