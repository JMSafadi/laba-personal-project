const express = require('express')
const cors = require('cors')
const pool = require('./db/database')


const port = 3000
const app = express()
app.use(cors())
app.use(express.json())


// Routes
const patientsRouter = require('./routes/patients.router')
const doctorsRouter = require('./routes/doctors.router')
const appointmentsRouter = require('./routes/appointments.router')

app.use('/api/patients', patientsRouter)
app.use('/api/doctors', doctorsRouter)
app.use('/api/appointments', appointmentsRouter)

app.get('/api', (req, res) => {
  res.json('Welcome to app backend!')
})


app.listen(process.env.PORT || port, () => {
  console.log(`Server running in PORT: ${port}`)
})
