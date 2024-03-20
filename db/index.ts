import { config } from '../config'
import pg, { Client } from 'pg'
import { join } from 'path'

const { host, port, user, name, password } = config.database

const connectDatabase = async () => {
  const client: Client = new pg.Client({
    host,
    port,
    database: name,
    user,
    password
  })

  await client.connect()

  return client
}

const runMigration = async ({
  action,
  client
}: {
  action: string
  client: Client
}) => {
  const postgratorModule = await import('postgrator')
  const postgrator = new postgratorModule.default({
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
}

const migrate = async () => {
  try {
    const client = await connectDatabase()

    const action = process.argv[2]

    !['do', 'undo'].includes(action) &&
      console.log("Invalid migration argument. Do you mean 'do' or 'undo'?")

    await runMigration({ action, client })

    await client.end()

    process.exitCode = 0
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  }
}

export default migrate()
