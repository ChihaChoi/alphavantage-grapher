import fetchApi from "../service/fetchApi";

describe("fetchApi", () => {
  test("test fetch api on working alphavantage url", async () => {
    const url =
      "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=GME&interval=60min&apikey=GKZ3Y2D5GRR8IJWF";
    const data = await fetchApi(url);
    expect(data["Meta Data"]).toBeTruthy();
  });
});
