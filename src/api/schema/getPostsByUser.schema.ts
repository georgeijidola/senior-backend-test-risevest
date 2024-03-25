const getPostsByUser = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', minLength: 32, maxLength: 36 }
    },
    required: ['id'],
    additionalProperties: false
  }
}

export { getPostsByUser }
