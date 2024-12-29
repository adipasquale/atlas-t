const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT');

  const connections = {
    sqlite: {
      connection: {
        filename: env('DATABASE_PATH'),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
