import { createDatabase, migrator } from '../db'

beforeEach(async () => {
  const pool = await createDatabase()

  await migrator.up()

  pool && (await pool.end())

  process.exitCode = 0
})

afterEach(async () => {
  await migrator.down({ to: 0 })

  process.exitCode = 0
})
