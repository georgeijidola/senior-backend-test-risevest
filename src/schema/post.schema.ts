const post = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 1 },
    content: { type: 'string', minLength: 1 }
  },
  required: ['title', 'content'],
  additionalProperties: false
}

export { post }
