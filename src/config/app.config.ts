export interface DbConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export default () => ({
  app: {
    db: {
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT ?? '5432', 10),
      username: process.env.PG_NAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
    } as DbConfig,
  },
});
