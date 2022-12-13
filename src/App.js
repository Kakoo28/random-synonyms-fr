import React, { useState } from 'react';
import axios from "axios";

const App = () => {
  const [text, setText] = useState('');
  const [synonyms, setSynonyms] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    axios.get(`https://thesaurus.altervista.org/thesaurus/v1?key=kCUvjCtemYl0UQWU4gUQ&language=fr_FR&output=json&word=${text}`)
      .then((r) => {
        const synonymList = r.data.response[0].list.synonyms.split('|');
        setSynonyms(synonymList[Math.floor(Math.random() * synonymList.length)]);
      })
      .catch((e) => {
        setSynonyms(e.message);
      });
  }

  return (
    <div className="App">
      <h1>Synonymes Aléatoire Français</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setText(e.target.value)} value={text} id="input"/>
        <input type="submit" value="Trouver un synonyme"/>
      </form>
      <div className="Result">{synonyms}</div>
    </div>
  );
};

export default App;