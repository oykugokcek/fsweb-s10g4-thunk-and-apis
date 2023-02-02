import React from "react";

function Item({ data }) {
  return (
    <div className="shadow-md bg-white text-center flex flex-col ">
      <h1 className="text-2xl bg-slate-100  ">Yeni bir Köpke</h1>
      <img src={data.message} />
    </div>
  );
}

export default Item;
