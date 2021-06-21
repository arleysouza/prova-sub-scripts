import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    select();
  }, []);

  const select = () => {
    axios
      .get("/select")
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else setRegistros(response.data.rows);
      })
      .catch((e) => alert(e.message));
  };

  const lista = registros.map( item => <div>{item.nro}: {item.quant}</div> )

  return ( <div className="App">  {lista}  </div> );
}

export default App;
