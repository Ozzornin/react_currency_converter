// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useState, useEffect } from "react";

export default function App() {
  const [currFrom, setCurrFrom] = useState("USD");
  const [currTo, setCurrTo] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState("");

  useEffect(
    function () {
      setResult("");
      const controller = new AbortController();
      async function fetchData() {
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${currFrom}&to=${currTo}`,
            { sign: controller }
          );
          const data = await res.json();
          if (data.message) throw new Error(data.message);
          console.log(data);
          setResult(data.rates[currTo]);
        } catch (e) {
          setResult(e.message);
        }
      }
      if (amount) fetchData();

      return () => {
        controller.abort();
      };
    },
    [currFrom, currTo, amount]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => {
          setAmount(Number(e.target.value));
        }}
      />
      <select value={currFrom} onChange={(e) => setCurrFrom(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="UAH">UAH</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={currTo}
        onChange={(e) => {
          setCurrTo(e.target.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="UAH">UAH</option>
        <option value="INR">INR</option>
      </select>
      <p>{result && result}</p>
    </div>
  );
}
