// ─────────────────────────────────────────
// DecodeLabs — Project 3: Database Integration
// Full Stack Development | Batch 2026
// Entry point of the application
// ─────────────────────────────────────────

require('dotenv').config()
const express = require('express')

// Route Imports
const userRoutes = require('./src/routes/userRoutes')
const postRoutes = require('./src/routes/postRoutes')

const app = express()
const PORT = process.env.PORT || 3000

// ─────────────────────────────────────────
// Global Middleware
// ─────────────────────────────────────────
app.use(express.json())

// ─────────────────────────────────────────
// Health Check Route
// Confirms the server is live and running
// ─────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    project: 'DecodeLabs — Project 3: Database Integration',
    status: 'Server is live and connected to the database.',
    endpoints: {
      users: '/api/users',
      posts: '/api/posts'
    }
  })
})

// ─────────────────────────────────────────
// API Route Registration
// All CRUD operations are handled here
// ─────────────────────────────────────────
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

// ─────────────────────────────────────────
// 404 Handler
// Catches any undefined routes
// ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route '${req.originalUrl}' does not exist on this server.`
  })
})

// ─────────────────────────────────────────
// Global Error Handler
// Catches any unhandled server-side errors
// ─────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message)
  res.status(500).json({
    success: false,
    error: 'An unexpected internal server error occurred.'
  })
})

// ─────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log('─────────────────────────────────────')
  console.log('  DecodeLabs — Project 3')
  console.log('  Database Integration')
  console.log(`  Server running at http://localhost:${PORT}`)
  console.log('─────────────────────────────────────')
})