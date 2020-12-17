import { Connection, createConnection } from "typeorm";

export default class DatabaseConfig {
	connect = (): Promise<Connection> => {
		return createConnection({
			type: "postgres",
			host: process.env.DB_HOST,
			database: process.env.DB_DATABASE,
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
			entities: ["src/entity/**/*.ts"],
			migrations: ["src/migration/**/*.ts"],
			subscribers: ["src/subscriber/**/*.ts"],
			cli: {
				entitiesDir: "src/entity",
				migrationsDir: "src/migration",
				subscribersDir: "src/subscriber",
			},
		});
	};
}
