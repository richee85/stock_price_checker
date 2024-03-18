import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'dev',
        password: 'dev',
        database: 'stock_prices',
        entities: [],
        subscribers: [],
        migrations: [],
        logging: true,
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
