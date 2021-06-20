const { Client } = require("pg");

const select = async () => {
  const client = new Client(process.env.BD_URL);
  const sql = `select nro, count(*) as "quant" from tbregistro group by nro order by nro`;
  try {
    await client.connect();
    const { rows } = await client.query(sql);
    await client.end();
    return { rows };
  } catch (e) {
    await client.end();
    console.log(e)
    return { error: e.message };
  }
};

const insert = async (nro) => {
  if (nro === undefined || nro.trim() === "") {
    return { error: "Forneça um número inteiro" };
  }
  const client = new Client(process.env.BD_URL);
  const sql = `insert into tbregistro(nro) values ('${nro}')`;
  try {
    await client.connect();
    const { rowCount } = await client.query(sql);
    await client.end();
    return { rowCount };
  } catch (e) {
    await client.end();
    return { error: e.message };
  }
};

module.exports = {
  select,
  insert,
};