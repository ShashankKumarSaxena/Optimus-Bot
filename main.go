package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"src/moderation"
	"strings"
	"src/fun"

	"github.com/bwmarrin/discordgo"
	// "github.com/bwmarrin/discordgo"
)

var Token string = "TOKEN :_:"

func main() {
	dg, err := discordgo.New("Bot " + Token)
	if err != nil {
		fmt.Println("Error creating discord session,", err)
		return
	}

	dg.AddHandler(messageCreate)

	dg.Identify.Intents = discordgo.IntentsGuilds | discordgo.IntentsGuildMessages | discordgo.IntentsGuildVoiceStates
	err = fun.LoadSound()
	if err != nil {
		fmt.Println(err)
	}

	err = dg.Open()
	if err != nil {
		fmt.Println("Error opening connection", err)
		return
	}

	fmt.Println("Bot is Running!")

	sc := make(chan os.Signal, 1)
	signal.Notify(sc, syscall.SIGINT, syscall.SIGTERM, os.Interrupt, os.Kill)
	<-sc
	dg.Close()
}

func messageCreate(s *discordgo.Session, m *discordgo.MessageCreate) {
	// Called whrn message is create
	if m.Content == "?ping" {
		s.ChannelMessageSend(m.ChannelID, "Pong!")
	}

	// This is not the best way to handle commands though

	// ******************** MODERATION *************************
	if strings.Contains(m.Content, "?kick") {
		moderation.KickMember(s, m)
	}
	if strings.Contains(m.Content, "?ban") {
		moderation.BanMember(s, m)
	}
	if strings.Contains(m.Content, "?tempban") {
		moderation.TempBanMember(s, m)
	}
	if strings.Contains(m.Content, "?airhorn") {
		c, err := s.State.Channel(m.ChannelID)
		if err != nil {
			fmt.Println(err)
			return
		}

		g, err := s.State.Guild(c.GuildID)
		if err != nil {
			fmt.Println(err)
			return
		}

		for _, vs := range g.VoiceStates {
			if vs.UserID == m.Author.ID {
				err = fun.PlaySound(s, g.ID, vs.ChannelID)
				if err != nil {
					fmt.Println("Error playing sound")
				}

				return
			}
		}
	}
}
