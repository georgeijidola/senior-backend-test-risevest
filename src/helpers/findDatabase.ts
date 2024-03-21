import { Pool } from 'pg'

const findDatabase = async (pool: Pool, name: string) => {
  return await pool.query(
    `SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('${name}');`
  )
}

export { findDatabase }
