import {
  TextField,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import {
  fetchApiDataAsync,
  selectInterval,
  selectSymbol,
  selectError,
  reduceSymbol,
  reduceInterval,
  reduceData,
  reduceError,
} from "./formSlice";
import { useDispatch, useSelector } from "react-redux";

function Form() {
  const symbol = useSelector(selectSymbol);
  const interval = useSelector(selectInterval);
  const errorMessage = useSelector(selectError);
  const dispatch = useDispatch();

  async function submitRequest() {
    dispatch(reduceError("loading"));
    const apiData = await dispatch(fetchApiDataAsync({ symbol, interval }));

    if (!apiData.payload["Meta Data"]) {
      dispatch(reduceError(Object.entries(apiData.payload)[0][1]));
      dispatch(reduceData(undefined));
    } else {
      dispatch(reduceError(""));
      dispatch(reduceData(apiData.payload));
    }
  }
  return (
    <div className="form__container">
      <TextField
        label="Symbol"
        variant="outlined"
        defaultValue={symbol}
        onChange={(event) => {
          dispatch(reduceSymbol(event.target.value));
        }}
      />
      <FormLabel component="legend">Interval</FormLabel>
      <RadioGroup
        row
        aria-label="gender"
        name="interval"
        value={interval}
        onChange={(event) => {
          dispatch(reduceInterval(event.target.value));
        }}
      >
        <FormControlLabel value="1min" control={<Radio />} label="1min" />
        <FormControlLabel value="5min" control={<Radio />} label="5min" />
        <FormControlLabel value="15min" control={<Radio />} label="15min" />
        <FormControlLabel value="30min" control={<Radio />} label="30min" />
        <FormControlLabel value="60min" control={<Radio />} label="60min" />
      </RadioGroup>
      <Button
        variant="contained"
        disabled={!symbol || !interval}
        onClick={submitRequest}
        data-testid={"submit-button"}
      >
        Submit
      </Button>
      <p className="error-message">{errorMessage}</p>
    </div>
  );
}

export default Form;
