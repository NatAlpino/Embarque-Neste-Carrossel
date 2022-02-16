import { useEffect, useState, useRef } from "react";
import Card from "./components/Card/Card";
import Button from "./components/Button/Button";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const carousel = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3000/static/profile.json")
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

  if (!data) return;

  const selectedIndex = data.findIndex(({ active }) => active);

  return (
    <div>
      <header className="header">
        <img className="woman" src= "http://localhost:3000/static/images/woman.png" alt= "woman"></img>
        <p className="titulo"><strong><em>Mulheres na Tecnologia.</em></strong></p>
      </header>
      <div className="container">
        <div className="carousel" ref={carousel}>
          {data.map((itemData, index) => (
            <Card item={itemData} key={index} />
          ))}
        </div>
        <div className="buttons">
          <Button
            disabled={selectedIndex <= 0}
            onClick={() => handleNewRightClick(-1)}
            alt="Left"
          />
          <Button
            disabled={selectedIndex >= data.length - 1}
            onClick={() => handleNewRightClick(1)}
            alt="Rigth"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
