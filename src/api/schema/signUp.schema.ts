const signUpSchema = {
  body: {
    type: 'object',
    properties: {
      username: { type: 'string', minLength: 3, maxLength: 12 },
      password: { type: 'string', minLength: 8, maxLength: 14 }
    },
    required: ['username', 'password'],
    additionalProperties: false
  }
}

export { signUpSchema }
