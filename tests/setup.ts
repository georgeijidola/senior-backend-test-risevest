import { createDatabase, dropDatabase, migrator } from '../db'

beforeAll(async () => {
  const pool = await createDatabase()

  await migrator.up()

  pool && (await pool.end())

  process.exitCode = 0
})

afterAll(async () => {
  await migrator.down({ to: 0 })

  process.exitCode = 0
})
