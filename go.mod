module src/main

go 1.16

replace src/moderation => ./commands/moderation

replace src/fun => ./commands/fun

require (
	github.com/bwmarrin/discordgo v0.23.2
	src/fun v0.0.0-00010101000000-000000000000
	src/moderation v0.0.0-00010101000000-000000000000
)
