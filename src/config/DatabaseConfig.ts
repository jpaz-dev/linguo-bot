import * as path from "path";
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
			entities: [path.resolve(__dirname, "../bot/entity/**/*{.ts,.js}")],
			migrations: [path.resolve(__dirname, "../bot/migration/**/*{.ts,.js}")],
			subscribers: [path.resolve(__dirname, "../bot/subscriber/**/*{.ts,.js}")],
			cli: {
				entitiesDir: path.resolve(__dirname, "../bot/entity/**/*{.ts,.js}"),
				migrationsDir: path.resolve(__dirname, "../bot/migration/**/*{.ts,.js}"),
				subscribersDir: path.resolve(__dirname, "../bot/subscriber/**/*{.ts,.js}"),
			},
		});
	};
}
