package moderation

import (
	"strconv"
	"strings"

	"github.com/bwmarrin/discordgo"
)

// Kicks the member from guild
func KickMember(s *discordgo.Session, m *discordgo.MessageCreate) {
	if m.Mentions[0].ID == m.Author.ID {
		s.ChannelMessageSend(m.ChannelID, "<a:cross1:807504651170873364> You can't kick yourself.")
		return
	}
	err := s.GuildMemberDelete(m.GuildID, m.Mentions[0].ID)
	if err != nil {
		s.ChannelMessageSend(m.ChannelID, "<a:cross1:807504651170873364> Couldn't kick that member.")
		return
	}
	_raw_username := m.Mentions[0].Username
	response := "<a:tickmark1:869636360636612648> Successfully kicked " + _raw_username
	s.ChannelMessageSend(m.ChannelID, response)
}

// Bans the member from guild
func BanMember(s *discordgo.Session, m *discordgo.MessageCreate) {
	if m.Mentions[0].ID == m.Author.ID {
		s.ChannelMessageSend(m.ChannelID, "<a:cross1:807504651170873364> You can't ban yourself.")
		return
	}
	_, err := s.GuildBan(m.GuildID, m.Mentions[0].ID)
	if err != nil {
		s.ChannelMessageSend(m.ChannelID, "<a:cross1:807504651170873364> Couldn't ban that member.")
		return
	}
	_raw_username := m.Mentions[0].Username
	response := "<a:tickmark1:869636360636612648> Successfully banned " + _raw_username
	s.ChannelMessageSend(m.ChannelID, response)
}

func TempBanMember(s *discordgo.Session, m *discordgo.MessageCreate) {
	if m.Mentions[0].ID == m.Author.ID {
		s.ChannelMessageSend(m.ChannelID, "<a:cross1:807504651170873364> You can't ban yourself.")
		return
	}
	_str_days := strings.Split(m.Content, " ")[2]
	days, parseErr := strconv.Atoi(_str_days)
	if parseErr != nil {
		s.ChannelMessageSend(m.ChannelID, "<a:cross1:807504651170873364> Invalid number of days provided!")
		return
	}
	err := s.GuildBanCreate(m.GuildID, m.Mentions[0].ID, days)
	if err != nil {
		s.ChannelMessageSend(m.ChannelID, "<a:cross1:807504651170873364> Couldn't ban that member.")
		return
	}
	_raw_username := m.Mentions[0].Username
	response := "<a:tickmark1:869636360636612648> Successfully banned " + _raw_username + " for " + _str_days
	s.ChannelMessageSend(m.ChannelID, response)
}
