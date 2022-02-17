import { useEffect, useState, useRef } from "react";
import Card from "./components/Card/Card";
import Button from "./components/Button/Button";
import "./App.css";

//    O useState vem pra lidar com a mudança de estado dentro da app que antes nao tinha nada e 
// apos o uso do useEffect passa a ter os dados da api. 
//    Ele ajuda a blindar a app de possiveis erros devido essa mudança.
const App = () => {
  const [data, setData] = useState([]); 
  const carousel = useRef(null); 

  useEffect(() => {
    fetch("http://localhost:3000/static/profile.json") //usando o fetch para acessar a api
      .then((response) => response.json()) //pegando os dados da api e transformando a resposta em json
      .then(
        (result) =>
          result.map((item, index) => ({ ...item, active: index <= 0 })) //usando o metodo map para percorrer a api
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
