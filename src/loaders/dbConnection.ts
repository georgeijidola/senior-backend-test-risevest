import { Sequelize } from 'sequelize'
import { config } from '../../config'

const { host, port, user, password, name } = config.database

// Initialize Sequelize with database connection parameters
const sequelize = new Sequelize({
  dialect: 'postgres',
  host,
  port,
  username: user,
  password,
  database: name,
  logging: false,
  define: {
    underscored: true
  }
})

export { sequelize }
