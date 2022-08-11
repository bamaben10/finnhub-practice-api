import React, { useContext, useState } from "react";
import { XIcon, SearchIcon } from "@heroicons/react/solid";
import SearchResults from "./SearchResults";
import ThemeContext from "../context/ThemeContext";
import { searchSymbols } from "../api/stock-api";

const Search = () => {
  const [input, setInput] = useState("");
  const [bestMatches, setBestMatches] = useState([]);

  const { darkMode } = useContext(ThemeContext);

  const clear = () => {
    setInput("");
    setBestMatches([]);
  };

  const updateBestMatches = async () => {
    try {
      if (input) {
        const searchResults = await searchSymbols(input);
        const result = searchResults.result;
        setBestMatches(result);
      }
    } catch (error) {
      setBestMatches([]);
      console.log(error);
    }
  };
};
