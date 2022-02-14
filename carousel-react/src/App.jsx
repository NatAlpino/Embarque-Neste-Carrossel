import { useEffect, useState, useRef } from "react";
import Card from "./components/Card";
import Button from "./components/Button";
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
      <footer class="footer">
        <div>
          <img
            class="logoReact"
            src="static/images/logo.png"
            alt="Logo React"
          ></img>
          <p>Natália Alpino</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
