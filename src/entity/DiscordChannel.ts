import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class DiscordChannel {
	@PrimaryColumn({ name: "guild_id" })
	guildId: number;

	@PrimaryColumn({ name: "channel_id" })
	channelId: number;

	@Column()
	name: string;

	@Column({ name: "create_at", default: new Date() })
	createAt: Date;
}
