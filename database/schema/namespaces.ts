export default {
  title: 'namespace schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    slug: {
      type: 'string'
    },
    inviteOnly: {
      default: false,
      type: 'boolean'
    },
    clients: {
      type: 'array',
      ref: 'client',
      items: {
        type: 'string'
      }
    },
    ideas: {
      type: 'array',
      ref: 'idea',
      items: {
        type: 'string'
      }
    },
    accessKeys: {
      type: 'array',
      ref: 'accessKey',
      items: {
        type: 'string'
      }
    },
    licenseKeys: {
      type: 'array',
      ref: 'licenseKey',
      items: {
        type: 'string'
      }
    },
  },
  required: ['id', 'slug'],
  indexes: [
    'slug'
  ]
}