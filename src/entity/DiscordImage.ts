import { IsString, Matches, MaxLength, MinLength } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class DiscordImage extends BaseEntity {
	@PrimaryColumn()
	@Matches(/^[a-zA-Z0-9\-_]{3,40}$/)
	name: string;

	@PrimaryColumn({ name: "guild_id" })
	guildId: string;

	@PrimaryColumn({ name: "channel_id" })
	channelId: string;

	@Column()
	title: string;

	@Column()
	@IsString()
	@MinLength(5)
	@MaxLength(100)
	link: string;

	@Column({ name: "create_at", default: new Date() })
	createAt: Date;
}
