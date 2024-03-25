import { Pool, QueryResult } from 'pg'

const findDatabase = async (pool: Pool, name: string): Promise<QueryResult> => {
  const query = `
    SELECT datname 
    FROM pg_catalog.pg_database 
    WHERE lower(datname) = lower('${name}');
  `

  return await pool.query(query)
}

export { findDatabase }
