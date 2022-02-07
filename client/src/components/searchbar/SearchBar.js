import React, { useState } from "react";
import SearchBarResult from "./SearchBarResult";
import ClickAwayListener from "react-click-away-listener";

// Services
import { useGetCoinsQuery } from "../../services/cryptoApi";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  // Coinranking API call
  const { data: coinrankingApi, isFetching: isCoinsFetching } =
    useGetCoinsQuery();

  const coins = coinrankingApi?.data?.coins;

  // Find matched results between input value and API data
  const filteredCoins = coins?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClickAway = () => {
    setSearch("");

    const input = document.getElementById("search");
    input.value = "";
  };

  return (
    <>
      <section className="relative hidden w-full max-w-lg mx-auto 2xl:block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-5">
          <svg
            className="w-5 h-5 text-gray-400 dark:text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>
        <input
          type="text"
          id="search"
          maxLength="27"
          className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-xl dark:placeholder-gray-500 dark:bg-tertiary dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          placeholder="Search Crypto"
          onChange={handleChange}
        />
        {!isCoinsFetching && search && search?.length !== 0 ? (
          <span
            className="absolute inset-y-0 right-0 flex items-center pr-5"
            onClick={handleClickAway}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-400 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        ) : null}

        {!isCoinsFetching && search && filteredCoins.length !== 0 ? ( // Search result will show only when input field is not empty and match result is returned.
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className="absolute inset-x-0 z-10 mt-4 overflow-y-auto bg-white border border-gray-300 rounded-2xl max-h-72 dark:bg-secondary dark:border-transparent">
              {filteredCoins.map((result, index) => {
                return (
                  <>
                    <SearchBarResult
                      key={index}
                      result={result}
                      id={result.uuid}
                      icon={result.iconUrl}
                      name={result.name}
                      symbol={result.symbol}
                      setSearch={setSearch}
                    />
                  </>
                );
              })}
            </div>
          </ClickAwayListener>
        ) : null}
      </section>
    </>
  );
};

export default SearchBar;
