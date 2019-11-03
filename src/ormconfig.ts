import "./env";
import {SnakeNamingStrategy} from "typeorm-naming-strategies";
import {ConnectionOptions} from "typeorm";

// Check typeORM documentation for more information.
const config: ConnectionOptions = {
  name: "default",
  type: "postgres",
  url: process.env.POSTGRES_URL,
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: process.env.NODE_ENV !== "production",
  namingStrategy: new SnakeNamingStrategy(),
  logging: process.env.NODE_ENV === "development",
  // logger: 'file',
  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: "src/migrations",
  },
};

export default config;
