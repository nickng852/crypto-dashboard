import React from "react";
import CoinCard from "./CoinCard";
import NavBar from "./navbar/NavBar";

const Main = ({ coins, search, setSearch, open, setOpen }) => {
  return (
    <>
      <div className="flex flex-col w-full bg-gray-50 justify-items-center">
        <NavBar
          coins={coins}
          search={search}
          setSearch={setSearch}
          open={open}
          setOpen={setOpen}
        />
        <CoinCard coins={coins} />
      </div>
    </>
  );
};

export default Main;
