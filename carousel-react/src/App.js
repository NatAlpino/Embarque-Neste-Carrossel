import { useEffect, useState, useRef } from "react";
import Card from "./components/Card";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const carousel = useRef(null);

  useEffect(() => {
    fetch('http://localhost:3000/static/profile.json')
      .then((response) => response.json())
      .then((result) =>
        result.map((item, index) => ({ ...item, active: index <= 0 }))
      )
      .then(setData);
  }, []);

  const handleNewRightClick = (position) => {
    const lastIndex = data.findIndex(({ active }) => active);
    const result = data.map((item, index) => {
      return {
        ...item,
        active: index === (position > 0 ? lastIndex + 1 : lastIndex - 1),
      };
    });

    setData(result);
  };

  if (!data) return null;

  const selectedIndex = data.findIndex(({ active }) => active);

  return (
    <div className="container">
      <div className="carousel" ref={carousel}>
        {data.map((itemData, index) => (
          <Card item={itemData} key={index} />
        ))}
      </div>

      <div className="buttons">
        <button
          disabled={selectedIndex <= 0}
          onClick={() => handleNewRightClick(-1)}
        >
          <img
            src="static/images/cursor.png"
            alt="Left"
            className="button"
          ></img>
        </button>
        <button
          disabled={selectedIndex >= data.length - 1}
          onClick={() => handleNewRightClick(1)}
        >
          <img
            src="static/images/cursor.png"
            alt="Right"
            className="button"
          ></img>
        </button>
      </div>
    </div>
  );
};

export default App;
