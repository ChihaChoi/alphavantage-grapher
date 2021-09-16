import React from "react";
import Chart from "react-google-charts";
import styled from "styled-components";

const InfoStylesContainer = styled.div`
  display: flex;
`;

const InfoStyles = styled.div`
  margin: 5px;
  width: 200px;
`;
function Info(props) {
  return (
    <div>
      <h2>Meta Data</h2>
      {Object.entries(props.data).map((infoBit, infoBitNum) => (
        <InfoStylesContainer key={`infoDiv${infoBitNum}`}>
          <InfoStyles>{infoBit[0]}</InfoStyles>
          <InfoStyles>{infoBit[1]}</InfoStyles>
        </InfoStylesContainer>
      ))}
    </div>
  );
}

function Graph(props) {
  const dataAsArray = Object.entries(Object.entries(props.data)[1][1]); //remove the metadata from the json, and turn the object into an array
  let sortedData = [["Time", "a", "b", "c", "d"]];
  const options = {
    legend: "none",
    animation: { startup: true, duration: 700, easing: "out" },
    candlestick: {
      fallingColor: {
        fill: "red",
        strokeWidth: 0,
      },
      risingColor: {
        fill: "green",
        strokeWidth: 0,
      },
    },
  };

  dataAsArray.forEach((entry) => {
    let arr = [
      entry[0].substring(5), //x axis, use substring to remove the year
      parseInt(entry[1]["3. low"]),
      parseInt(entry[1]["1. open"]),
      parseInt(entry[1]["4. close"]),
      parseInt(entry[1]["2. high"]),
    ];
    sortedData.push(arr);
  });
  return (
    <div className="graph__container">
      <Info data={Object.entries(props.data)[0][1]} />
      <Chart
        width={"100%"}
        height={600}
        chartType="CandlestickChart"
        loader={<div>Loading Chart</div>}
        data={sortedData}
        options={options}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
}

export default Graph;
