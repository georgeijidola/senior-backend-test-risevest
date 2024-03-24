import { config } from '../config'
import pg, { Client, Pool } from 'pg'
import { SequelizeStorage, Umzug } from 'umzug'
import { findDatabase } from '../src/helpers/findDatabase'
import { sequelize } from '../src/loaders/dbConnection'
import { readFileSync } from 'fs'
import { logger } from '../src/loaders/logger'

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

const getRawSqlClient = () => {
  return {
    query: async (sql: string) => sequelize.query(sql)
  }
}

const migrate = async (path: string) => {
  const sql = readFileSync(path).toString()

  return sequelize.query(sql)
}

const migrator = new Umzug({
  migrations: {
    glob: 'db/migrations/*.up.sql',
    resolve: ({ name, path }) => ({
      name,
      up: async () => await migrate(path!),
      down: async () => await migrate(path!.replace('.up.sql', '.down.sql'))
    })
  },
  context: getRawSqlClient(),
  storage: new SequelizeStorage({
    sequelize,
    modelName: 'MigrationMeta',
    tableName: 'migrations_meta'
  }),
  logger: console
})

const createDatabase = async () => {
  try {
    const pool = new Pool({
      host,
      user,
      password
    })

    const result = await findDatabase(pool, name!)

    if (result.rowCount === 0) {
      await pool.query(`CREATE DATABASE ${name};`)

      logger.info(`Created database ${name}.`)
    } else {
      logger.info('Database already exists.')
    }

    return pool
  } catch (error) {
    logger.error(error)
  }
}

const dropDatabase = async () => {
  try {
    const pool = new Pool({
      host,
      user,
      password
    })

    const result = await findDatabase(pool, name!)

    if (result.rowCount === 0) {
      logger.info(`Database ${name} doesn't exist.`)
    } else {
      await pool.query(`DROP DATABASE IF EXISTS ${name};`)

      logger.info(`Dropped database ${name}.`)
    }

    return pool
  } catch (error) {
    logger.error(error)
  }
}

export { connectDatabase, migrator, createDatabase, dropDatabase }
