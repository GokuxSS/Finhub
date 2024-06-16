import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import authors from './authors'
import books from './books'
export const runtime = 'edge';

const app = new Hono().basePath('/api')

app.route('/authors', authors)
app.route('/books', books)

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello Next.js!',
  })
})
.get('/temp/:test', clerkMiddleware(),(c)=>{
    const auth = getAuth(c)
    const test = c.req.param('test');

    if (!auth?.userId) {
        return c.json({
          message: 'You are not logged in.'
        })
    }

    return c.json({
        message:"Temp",
        test:test
    })
})
.get('/temp1/:test', clerkMiddleware(), zValidator(
    'param',
    z.object({
      test: z.string(),
    })
  ),(c)=>{
    const auth = getAuth(c)
    const {test} = c.req.valid('param');

    if (!auth?.userId) {
        return c.json({
          message: 'You are not logged in.'
        })
    }

    return c.json({
        message:"Temp",
        test:test
    })
})

export const GET = handle(app)
export const POST = handle(app)