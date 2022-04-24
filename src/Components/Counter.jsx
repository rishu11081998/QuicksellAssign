import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { CounterVal } from "./CounterVal";
import styles from "./counter.module.css";
import { SpinnerCircular } from "spinners-react";

export const Counter = () => {
  const [state, setState] = useState({ count: 1 });
  const [input, setInput] = useState(state.count);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    axios
      .get(
        "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/rishab/rs94658/7973173643/count.json"
      )
      .then((res) => {
        if (res.data) {
          setState({ ...state, count: res.data.count });
          setInput(res.data.count);
          setLoading(true);
        }
      });
  }, []);

  if (state.count > 1000) {
    axios
      .put(
        "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/rishab/rs94658/7973173643/count.json",
        {
          count: 1000,
        }
      )
      .then((response) => {
        setState({ ...state, count: response.data.count });
        setInput(response.data.count);
        setLoading(true);
      })
      .catch((error) => {});
  }

  const Increment = () => {
    setLoading(false);
    axios
      .put(
        "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/rishab/rs94658/7973173643/count.json",
        {
          count: state.count + 1,
        }
      )

      .then((response) => {
        setState({ ...state, count: response.data.count });
        setInput(response.data.count);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Decrement = () => {
    setLoading(false);
    axios
      .put(
        "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/rishab/rs94658/7973173643/count.json",
        {
          count: state.count - 1,
        }
      )
      .then((response) => {
        setState({ ...state, count: response.data.count });
        setInput(response.data.count);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const InputChange = useCallback((val) => {
    setLoading(false);

    setInput(val);

    if (val >= 1) {
      axios
        .put(
          "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/rishab/rs94658/7973173643/count.json",
          {
            count: parseInt(val),
          }
        )
        .then((response) => {
          setState({ ...state, count: response.data.count });
          setLoading(true);
        })
        .then((res) => {
          setInput(res.data.count);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  //Post Request

  return (
    <div className={styles.cont}>
      {loading ? (
        <div className={styles.inp}>
          <button className={styles.btnD} onClick={Decrement}>
            <font className={styles.fontD}>-</font>
          </button>
          <input
            type="number"
            value={input}
            className={styles.input}
            onChange={(e) => InputChange(e.target.value)}
          />
          <button className={styles.btnI} onClick={Increment}>
            <font className={styles.fontI}>+</font>
          </button>
        </div>
      ) : (
        <div className={styles.inp}>
          <div className={styles.spinDiv}>
            <SpinnerCircular className={styles.spin} />
            <p className={styles.spintext}>Saving counter value</p>
          </div>

          <button className={styles.btnD} onClick={Decrement}>
            <font className={styles.fontD}>-</font>
          </button>
          <input
            type="text"
            value={input}
            className={styles.input}
            onChange={(e) => InputChange(e.target.value)}
          />
          <button className={styles.btnI} onClick={Increment}>
            <font className={styles.fontI}>+</font>
          </button>
        </div>
      )}

      <CounterVal className={styles.counnvl} value={input} />
    </div>
  );
};
