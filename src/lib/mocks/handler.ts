import { env } from '@/env.mjs'
import { http, HttpResponse } from 'msw'

const baseUrl : string = env.NEXT_PUBLIC_API_URL;

export const handlers = [
  http.post(baseUrl + '/auth/login',  () => {
    return HttpResponse.json({ token: 'mocked_user_token', userId: '1' })
  }), 

  http.post(baseUrl + "/users", () => {
    return HttpResponse.json({ name: "Fernando", id: "1", email: "random@gmail.com"})
  })
]