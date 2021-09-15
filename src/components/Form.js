import {
  TextField,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useState, useEffect } from "react";

function Form(props) {
  const [apiKey, setApiKey] = useState("sdf");
  const [symbol, setSymbol] = useState("GME");
  const [interval, setInterval] = useState("60min");
  const [apiUrl, setApiUrl] = useState();
  const [errorMessage, setErrorMessage] = useState();

  async function submitRequest() {
    setApiUrl(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`
    );
    setErrorMessage("loading");
  }
  useEffect(async () => {
    await fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (!data["Meta Data"]) {
          setErrorMessage(Object.entries(data)[0][1]);
        } else {
          props.setData(data);
          setErrorMessage("");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [apiUrl]);

  return (
    <div className="form__container">
      <TextField
        label="API Key"
        variant="outlined"
        defaultValue={apiKey}
        onChange={(event) => {
          setApiKey(event.target.value);
        }}
      />
      <TextField
        label="Symbol"
        variant="outlined"
        defaultValue={symbol}
        onChange={(event) => {
          setSymbol(event.target.value);
        }}
      />
      <FormLabel component="legend">Interval</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="interval"
        value={interval}
        onChange={(event) => {
          setInterval(event.target.value);
        }}
      >
        <FormControlLabel value="1min" control={<Radio />} label="1min" />
        <FormControlLabel value="5min" control={<Radio />} label="5min" />
        <FormControlLabel value="15min" control={<Radio />} label="15min" />
        <FormControlLabel value="30min" control={<Radio />} label="30min" />
        <FormControlLabel value="60min" control={<Radio />} label="60min" />
      </RadioGroup>
      <Button variant="contained" onClick={submitRequest}>
        Submit
      </Button>
      <p className="error-message">{errorMessage}</p>
    </div>
  );
}

export default Form;
