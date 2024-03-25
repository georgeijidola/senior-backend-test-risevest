const comment = {
  type: 'object',
  properties: {
    content: { type: 'string', minLength: 1 }
  },
  required: ['content'],
  additionalProperties: false
}

export { comment }
