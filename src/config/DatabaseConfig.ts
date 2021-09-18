import { Connection, createConnection } from "typeorm";

export default class DatabaseConfig {
	connect = (): Promise<Connection> => {
		return createConnection({
			type: "postgres",
			host: process.env.DB_HOST,
			database: process.env.DB_DATABASE,
			schema: process.env.DB_SCHEMA,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			port: parseInt(process.env.DB_PORT),
			extra: {
				ssl: {
					rejectUnauthorized: false,
				},
			},
			synchronize: true,
			logging: false,
			entities: ["src/bot/entity/**/*.ts"],
			migrations: ["src/bot/migration/**/*.ts"],
			subscribers: ["src/bot/subscriber/**/*.ts"],
			cli: {
				entitiesDir: "src/bot/entity",
				migrationsDir: "src/bot/migration",
				subscribersDir: "src/bot/subscriber",
			},
		});
	};
}
