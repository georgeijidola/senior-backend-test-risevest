import { Pool } from 'pg'
import { config } from '../config'
import { findDatabase } from '../src/helpers/findDatabase'
import { dropDatabase } from '.'

const { name, user, password, host } = config.database

const pool = new Pool({
  host,
  user,
  password
})

const teardown = async () => {
  try {
    await dropDatabase()

    process.exit(0)
  } catch (error) {
    console.error(error)
  }
}

export default teardown()
