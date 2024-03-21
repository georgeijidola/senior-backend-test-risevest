import { Pool } from 'pg'
import { config } from '../config'
import { findDatabase } from '../src/helpers/findDatabase'
import { createDatabase } from '.'

const { name, user, password, host } = config.database

const setup = async () => {
  try {
    await createDatabase()

    process.exit(0)
  } catch (error) {
    console.error(error)
  }
}

export default setup()
