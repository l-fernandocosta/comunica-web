// <reference types="vitest" />

import '@testing-library/jest-dom/vitest'


import { server } from '@/lib/mocks/server'
import { afterAll, afterEach, beforeAll } from 'vitest'

afterAll(() => server.close())
beforeAll(() => server.listen())
afterEach (() => server.resetHandlers())