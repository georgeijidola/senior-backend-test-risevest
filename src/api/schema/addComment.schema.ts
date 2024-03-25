const addComment = {
  body: {
    type: 'object',
    properties: {
      content: { type: 'string', minLength: 1 }
    },
    required: ['content'],
    additionalProperties: false
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', minLength: 32, maxLength: 36 }
    },
    required: ['id'],
    additionalProperties: false
  }
}

export { addComment }
