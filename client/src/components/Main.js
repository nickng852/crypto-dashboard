import React from "react";
/* import Account from "../components/Account"; */
import CoinCard from "./CoinCard";
import CoinList from "./CoinList";
import NavBar from "./navbar/NavBar";
import LineChart from "./LineChart";

const Main = ({
  user,
  coins,
  search,
  setSearch,
  open,
  setOpen,
  setIsLogged,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  chart,
  setChart,
}) => {
  return (
    <>
      <div className="flex flex-col w-full bg-gray-50 justify-items-center">
        <NavBar
          user={user}
          coins={coins}
          search={search}
          setSearch={setSearch}
          open={open}
          setOpen={setOpen}
          setIsLogged={setIsLogged}
        />
        <CoinCard coins={coins} />
        <CoinList
          coins={coins}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
        <LineChart chart={chart} setChart={setChart} />
        {/*         <Account /> */}
      </div>
    </>
  );
};

export default Main;
