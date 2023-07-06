import React, { useEffect, useState } from "react";
import {
  Botao,
  ContainerInputs,
  ContainerMusicas,
  InputMusica,
  Musica,
} from "./styled";
import axios from "axios";

// const musicasLocal = [{
//     artist: "Artista 1",
//     id: "1",
//     name: "Musica1",
//     url: "http://spoti4.future4.com.br/1.mp3"
// },
// {
//     artist: "Artista 2",
//     id: "2",
//     name: "Musica2",
//     url: "http://spoti4.future4.com.br/2.mp3"
// },
// {
//     artist: "Artista 3",
//     id: "3",
//     name: "Musica3",
//     url: "http://spoti4.future4.com.br/3.mp3"
// }]

export default function Musicas(props) {
  const [musicas, setMusicas] = useState([]);
  const [nameMusic, setNameMusic] = useState("");
  const [artist, setArtist] = useState("");
  const [url, setUrl] = useState("");

 
  useEffect(() => {
    getAllMusiclists(props.playlist.id);
  }, );


  const getAllMusiclists = () => {
    const headers = {
      headers: {
        Authorization: '"luan-moura-easley"',
      },
    };
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,
        headers
      )
      .then((res) => setMusicas(res.data.result.tracks))
      .catch((res) => console.log("caso de erro", res.message));
  };

  const AddTrackPlaylists = (id) => {
    const headers = {
      headers: {
        Authorization: '"luan-moura-easley"',
      },
    };
    const body = {
      name: nameMusic,
      artist: artist,
      url: url,
    };

    axios
      .post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}/tracks`,
        body,
        headers
      )
      .then(() => getAllMusiclists() , setNameMusic(""), setArtist(""), setUrl(""))
      .catch((res) => console.log("caso de erro", res.message));
  };

  const DeleteTrackPlaylists = (idTrack, idPlayList) => {
    const headers = {
      headers: {
        Authorization: '"luan-moura-easley"',
      },
    };

    axios
      .delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${idPlayList}/tracks/${idTrack}`,
        headers
      )
      .then(() => getAllMusiclists() )
      .catch((res) => console.log("caso de erro", res.message));
  };

  return (
    <ContainerMusicas>
      <h2>{props.playlist.name}</h2>
      {musicas.map((musica) => {
        return (
          <Musica key={musica.id}>
            <h3>
              {musica.name} - {musica.artist}
            </h3>
            <video src={musica.url} controls />
            <button
              onClick={() => DeleteTrackPlaylists(musica.id, props.playlist.id)}
            >
              X
            </button>
          </Musica>
        );
      })}
      <ContainerInputs>
        <InputMusica
          placeholder="artista"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <InputMusica
          placeholder="musica"
          value={nameMusic}
          onChange={(e) => setNameMusic(e.target.value)}
        />
        <InputMusica
          placeholder="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Botao onClick={() => AddTrackPlaylists(props.playlist.id)}>
          Adicionar musica
        </Botao>
      </ContainerInputs>
    </ContainerMusicas>
  );
}
