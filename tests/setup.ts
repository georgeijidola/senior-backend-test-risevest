import { createDatabase, migrator } from '../db'

beforeAll(async () => {
  const pool = await createDatabase()

  pool && (await pool.end())

  process.exitCode = 0
})

beforeEach(async () => {
  await migrator.up()

  process.exitCode = 0
})

afterEach(async () => {
  await migrator.down({ to: 0 })

  process.exitCode = 0
})
