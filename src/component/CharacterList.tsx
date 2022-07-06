import React, { useEffect, useState } from "react";

import { collection, DocumentData, getDocs } from "firebase/firestore";
import { db } from "../firebase";

type CharacterType = {
  id: string;
  name?: string;
  number?: number;
  createdAt: Date;
  videoUrl?: string;
  tags?: string[];
  league: string;
};

type TagType = {
  id: string;
  name: string;
  category: string;
  level?: number;
};

type LeagueType = {
  id: string;
  name: string;
  infoUrl: string;
};

function CharacterList() {
  const [characters, setCharacters] = useState<CharacterType[] | never[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);
  const [leagues, setLeagues] = useState<LeagueType[]>([]);

  async function getData() {
    const querySnapshot = await getDocs(collection(db, "characters"));
    setCharacters([]);
    querySnapshot.forEach((doc: DocumentData) => {
      const newData = doc.data();
      setCharacters((prev) => [
        {
          ...newData,
          id: doc.id,
          createdAt: new Date(newData.createdAt.seconds * 1000),
        },
        ...prev,
      ]);
    });
    const tagQuerySnapshot = await getDocs(collection(db, "tags"));
    setTags([]);
    tagQuerySnapshot.forEach((doc: DocumentData) => {
      const newData = doc.data();
      setTags((prev) => [
        {
          ...newData,
          id: doc.id,
        },
        ...prev,
      ]);
    });
    const leagueQuerySnapshot = await getDocs(collection(db, "leagues"));
    setLeagues([]);
    leagueQuerySnapshot.forEach((doc: DocumentData) => {
      const newData = doc.data();
      setLeagues((prev) => [
        {
          ...newData,
          id: doc.id,
        },
        ...prev,
      ]);
    });
  }

  function dateToFormatString(date: Date) {
    return date.toLocaleDateString("ko-kr", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  function getVideoUrl(url: string | undefined) {
    var twitchRe = /twitch.tv\/(\S+)/;
    if (url === undefined) {
      return "";
    }
    const matches = url.match(twitchRe);
    if (matches !== null && matches.length > 1) {
      return `https://clips.twitch.tv/embed?clip=${matches[1]}&parent=localhost`;
    }
    return url;
  }

  function getTagInfo(tagId: string) {
    const tagData = tags.find((tag) => tag.id === tagId);
    if (tagData === undefined) {
      return tagId;
    }
    if (tagData.category === "레벨") {
      return `${tagData.name}(${tagData.level})`;
    } else if (tagData.category === "배신") {
      return `${tagData.name}(${tagData.category})`;
    } else {
      console.log(tagData.category);
      return `${tagData.name}`;
    }
  }

  function getLeagueTitle(league: LeagueType) {
    if (league.infoUrl !== undefined)
      return <a href={league.infoUrl}>{league.name}</a>;
    return league.name;
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ padding: 10 }}>
      {leagues.map((league: LeagueType) => {
        return (
          <>
            <h2>{getLeagueTitle(league)}</h2>
            {characters.map((character: CharacterType) => {
              if (character.league === league.id) {
                return (
                  <div style={{ width: 600 }} key={character.id}>
                    <h3>
                      {character.number}호 - {character.name}(~{" "}
                      {dateToFormatString(character.createdAt)})
                    </h3>
                    {character.tags !== undefined &&
                      character.tags.map((tag) => (
                        <span key={tag}>#{getTagInfo(tag)}</span>
                      ))}
                    <iframe
                      //   src="https://clips.twitch.tv/embed?clip=AnimatedUnusualButterflySoBayed-oZUhkpJGLbM-11Pi&parent=localhost"
                      src={getVideoUrl(character.videoUrl)}
                      frameBorder="0"
                      allowFullScreen={true}
                      scrolling="no"
                      width="620"
                      height="378"
                    />
                  </div>
                );
              } else {
                return "";
              }
            })}
          </>
        );
      })}
    </div>
  );
}

export default CharacterList;
