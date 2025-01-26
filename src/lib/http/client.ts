import axios from 'axios';
import { env } from '@/env.mjs'
import AuthorizationCookies from '../utils/authorization-cookie.handler';

const Authorization = AuthorizationCookies.getSession();

const http = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    'Authorization': `Bearer ${Authorization}`,
  } 
})

export default http;