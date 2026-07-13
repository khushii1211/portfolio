import express from 'express'
import cors from 'cors'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const port = process.env.PORT || 3001
const here = dirname(fileURLToPath(import.meta.url))
const dataFile = resolve(here, '../data/bookings.json')

app.use(cors())
app.use(express.json({ limit: '50kb' }))

app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.post('/api/bookings', async (req, res) => {
  const { name, email, phone, city, details } = req.body
  if (![name, email, phone, city, details].every(v => typeof v === 'string' && v.trim())) return res.status(400).json({ error: 'Please complete all required fields.' })
  if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'Please enter a valid email.' })
  try {
    await mkdir(dirname(dataFile), { recursive: true })
    let bookings = []
    try { bookings = JSON.parse(await readFile(dataFile, 'utf8')) } catch (error) { if (error.code !== 'ENOENT') throw error }
    bookings.push({ id: crypto.randomUUID(), ...req.body, createdAt: new Date().toISOString() })
    await writeFile(dataFile, JSON.stringify(bookings, null, 2))
    res.status(201).json({ message: 'Booking inquiry received.' })
  } catch (error) { console.error(error); res.status(500).json({ error: 'Unable to save inquiry.' }) }
})

app.listen(port, () => console.log(`Booking API running at http://localhost:${port}`))
