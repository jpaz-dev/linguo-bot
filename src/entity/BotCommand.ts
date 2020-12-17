import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class BotCommand extends BaseEntity {
	@PrimaryColumn()
	command: string;

	@Column({ name: "create_at", default: new Date() })
	createAt: Date;
}
