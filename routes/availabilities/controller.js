const queries = require('./queries')

// Method to GET all availabilities from DB
const getAvailabilities = async (req, res) => {
  const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
  const client = await pool.connect()
  try {
    const results = await client.query(queries.getAvailabilities)
    client.release()
    res.status(200).json(results.rows)
  } catch (err) {
    client.release()
    res.status(500).json({ error: 'Internal server error', message: err.message })
  }
}

// Method to GET one appointment by id from DB
const getAvailabilityById = async (req, res) => {
  const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
  const id = parseInt(req.params.id)
  const client = await pool.connect()
  try {
    const results = await client.query(queries.getAvailabilityById, [id])
    if (!results.rows.length) {
      client.release()
      return res.status(404).json({ message: 'ID availability not found.'} )
    }
    client.release()
    res.status(200).json(results.rows)
  } catch (err) {
    client.release()
    res.status(500).json({ error: 'Internal server error', message: err.message })
  }
}

module.exports = {
  getAvailabilities,
  getAvailabilityById
}
