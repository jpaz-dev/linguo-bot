import { Matches } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class BotCommand extends BaseEntity {
	@PrimaryColumn()
	@Matches(/^[a-zA-Z0-9\-_]{3,40}$/)
	command: string;

	@Column({ name: "create_at", default: new Date() })
	createAt: Date;
}
