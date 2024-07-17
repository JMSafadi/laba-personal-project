const express = require('express')
const router = express.Router()

// Create new appointment
router.post('/', (req, res) => {
  
})

// Get appointments
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Appointments')
    res.status(200).json(result.rows)
  } catch (err) {
    console.log('Error fetching Appointments:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router