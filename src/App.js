import React, { useEffect, useState } from "react";
import { Grid, Box, Button } from "@material-ui/core";
import axios from "axios";

const App = () => {
  const [botoes, setBotoes] = useState([{nro:1,quant:0},{nro:2,quant:0},{nro:3,quant:0},{nro:4,quant:0},{nro:5,quant:0}])

  useEffect(() => {
    select();
  }, []);

  const select = () => {
    axios
      .get("/select")
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else{ 
          const aux = [...botoes];
          response.data.rows.forEach(item => {
            console.log('item.nro:' + item.nro)
            aux[item.nro-1].quant = item.quant
          })
          setBotoes(aux)
        }
      })
      .catch((e) => alert(e.message));
  };

  const salvar = (nro) => {
    axios
      .get(`/insert/${nro}`)
      .then((response) => {
        if (response.data.error) alert(response.data.message);
        else if (response.data.rowCount === 1) select();
      })
      .catch((e) => console.log(e.message));
  };

  const lista = botoes.map( item => 
    <Box m={1}>
      <Button variant="contained" color="primary" key={item.nro} onClick={() => salvar(item.nro)}>
        {item.nro}:{item.quant}
      </Button>
    </Box>
  );

  return (
    <Grid container style={{backgroundColor:'#dedede'}} justify="center">
        {lista}
    </Grid>
  );
}

export default App;