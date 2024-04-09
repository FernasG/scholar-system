import { Configuration } from './config.interface';

export default (): Configuration => ({
  database: {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ['dist/**/entities/*.{ts,js}'],
  },
});
