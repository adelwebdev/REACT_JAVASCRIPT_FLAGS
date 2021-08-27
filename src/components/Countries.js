import React, { useState } from "react";

const Countries = () => {
  // les Hook de react!!!! avec useSate!!
  // data est la vatriable, setData c pr stocker; mettre en place; dans data
  //   const [data, setData] = useState("hello");
  const [data, setData] = useState([]);
  //   const sayGoodbye = () => {
  //     setData("Goodbye");
  //   };

  //pour afficher le contenu de data, on met la variable dans des accolades {}
  return (
    <div>
      {/* <p>Countries</p>
      {data}
      <button onClick={sayGoodbye}>Dire byebye</button> */}
    </div>
  );
};

export default Countries;
