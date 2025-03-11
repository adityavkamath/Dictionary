import axios from "axios";
import React, { useEffect, useState } from "react";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (word.trim() !== "") {
      axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((res) => setResult(res.data[0].meanings))
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      setResult([]);
    }
  }, [word]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white">
      <div className="w-full max-w-lg p-6 mx-4 bg-gray-800/90 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-700/50">
        <div className="mb-6 pb-4 border-b border-gray-700/50">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            Dictionary
          </h1>
        </div>
        <input
          className="w-full p-3 mb-4 bg-gray-700/80 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300"
          type="text"
          placeholder="Enter a word..."
          onChange={(e) => setWord(e.target.value)}
          value={word}
        />
        <div className="flex justify-center">
          <button className="px-6 py-2 mb-6 font-semibold text-sm uppercase tracking-wider bg-gradient-to-r from-purple-600 to-purple-800 rounded-full shadow-lg hover:shadow-purple-500/20 hover:-translate-y-0.5 transition-all duration-300">
            Search
          </button>
        </div>
        <div className="font-medium">
          <h2 className="text-xl font-bold mb-4 uppercase text-purple-300">
            Definitions:
          </h2>
          {result.length > 0 ? (
            result.map((meaning, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <h3 className="text-lg mb-2 font-bold text-purple-200 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                  {meaning.partOfSpeech}
                </h3>

                <div className="space-y-3 pl-4 border-l-2 border-purple-800/50">
                  {meaning.definitions.map((def, i) => (
                    <p key={i} className="text-gray-300">
                      {def.definition}
                    </p>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">
              Enter a word to see definitions
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dictionary;
