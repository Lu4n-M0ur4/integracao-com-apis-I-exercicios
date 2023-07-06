import React, { useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";

function Playlists() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getPlaylists();
  }, []);

  const getPlaylists = () => {
    const headers = {
      headers: {
        Authorization: '"luan-moura-easley"',
      },
    };
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
        headers
      )
      .then((res) => setPlaylists(res.data.result.list))
      .catch((res) => console.log("caso de erro", res.message));
  };

  return (
    <div>
      {playlists.map((playlist) => {
        return (
          <Musicas
            key={playlist.id}
            playlist={playlist}
            getPlaylists={getPlaylists}
          />
        );
      })}
    </div>
  );
}

export default Playlists;
