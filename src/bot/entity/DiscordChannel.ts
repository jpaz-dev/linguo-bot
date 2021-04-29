import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class DiscordChannel extends BaseEntity {
	@PrimaryColumn({ name: "guild_id" })
	guildId: string;

	@PrimaryColumn({ name: "channel_id" })
	channelId: string;

	@Column({ name: "create_at", default: new Date() })
	createAt: Date;
}
