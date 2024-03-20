import { config } from '../config'
// import Postgrator from 'postgrator'
import pg, { Client } from 'pg'
import { join } from 'path'

const migrate = async () => {
  const { host, port, user, name, password } = config.database

  const client: Client = new pg.Client({
    host,
    port,
    database: name,
    user,
    password
  })

  try {
    await client.connect()

    const action = process.argv[2]

    !['do', 'undo'].includes(action) &&
      console.log("Invalid migration argument. Do you mean 'do' or 'undo'?")

    const postgratorModule = await import('postgrator')
    const postgrator = new postgratorModule.default({
      // const postgrator = new Postgrator({
      migrationPattern: join(__dirname, `/migrations/*.${action}.*.sql`),
      driver: 'pg',
      database: name,
      schemaTable: 'migrations',
      currentSchema: 'public',
      execQuery: (query: string) => client.query(query)
    })

    const result = await postgrator.migrate()

    if (result.length === 0) {
      console.log(
        'No migrations run for schema "public". Already at the latest one.'
      )
    }

    console.log('Migration done.')

    process.exitCode = 0
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  }

  await client.end()
}

export default migrate()
