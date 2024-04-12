import { Configuration } from './config.interface';

export default (): Configuration => ({
  database: {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ['dist/**/entities/*.{ts,js}'],
  },
  jwt_options: {
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '8h' },
  },
});
