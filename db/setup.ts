import { createDatabase } from '.'

const setup = async () => {
  try {
    await createDatabase()

    process.exitCode = 0
  } catch (error) {
    console.error('Setup failed:', error)

    process.exitCode = 1
  }
}

setup()
