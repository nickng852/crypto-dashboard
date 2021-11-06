import React from "react";
import { Line } from "react-chartjs-2";

const CoinCard = ({ coins }) => {
  const slicedCoins = coins.slice(0, 5);

  return (
    <>
      <div className="flex flex-wrap items-center justify-center max-w-8xl mt-14">
        {slicedCoins.map((result, index) => {
          const symbol = result.symbol;
          const name = result.name;
          const price = Number(result.price);
          const priceChange = result.change;
          const AbsPriceChange = Math.abs(priceChange);

          const chartLabel = [];
          const chartData = [];

          for (let i = 0; i < result.history?.length; i++) {
            chartLabel.push(i);
            chartData.push(result.history[i]);
          }

          const data = (canvas) => {
            const ctx = canvas.getContext("2d");
            const gradient = ctx.createLinearGradient(0, 0, 0, 110);
            gradient.addColorStop(0, "rgba(34, 153, 84,0.5)");
            gradient.addColorStop(1, "rgba(34, 153, 84,0.01)");

            return {
              labels: chartLabel,
              datasets: [
                {
                  data: chartData,
                  fill: true,
                  backgroundColor: gradient,
                  borderColor: "#218c74",
                  borderWidth: 2,
                },
              ],
            };
          };

          const options = {
            scales: {
              y: {
                display: false,
              },
              x: {
                display: false,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
            radius: 0,
            tension: 0.4,
          };

          return (
            <div
              className="relative m-5 overflow-hidden bg-white rounded-lg shadow w-60 md:w-72 dark:bg-gray-600"
              key={index}
            >
              <img
                src={result.iconUrl}
                alt={crypto}
                className="absolute w-24 h-24 rounded-full opacity-95 -top-6 -right-6 md:-right-4"
              />
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <span className="px-2 py-1 text-xs font-medium leading-5 text-gray-600 truncate bg-gray-200 rounded-md">
                    {symbol}
                  </span>
                  <dd className="mt-4 font-semibold text-gray-500">
                    <span className="mr-3 dark:text-gray-100">{name}</span>
                    <span
                      className={`${
                        priceChange < 0 ? "text-red-600" : "text-green-500"
                      }`}
                    >
                      {`${
                        priceChange < 0
                          ? "▼ " + AbsPriceChange.toFixed(2) + "%"
                          : "▲ " + AbsPriceChange.toFixed(2) + "%"
                      }`}
                    </span>
                  </dd>
                  <dd className="mt-1 text-3xl font-semibold leading-9 text-gray-900 dark:text-gray-100">
                    $
                    {`${
                      price < 1
                        ? price.toLocaleString(undefined, {
                            maximumFractionDigits: 10,
                          })
                        : price.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })
                    }`}
                  </dd>
                </dl>
              </div>
              <div className="px-4 pb-5">
                <Line key={index} data={data} options={options} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CoinCard;
