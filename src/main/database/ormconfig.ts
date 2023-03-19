import path from 'path';

export default {
    'type': 'sqlite',
    'database': path.join(__dirname, './db-file/db-file.sqlite3'),
    'synchronize': true,
    'logging': false,
    'entities': [
        './entities/*.ts',
    ],
    'migrations': [
        './migration/*.ts',
    ],
};
  