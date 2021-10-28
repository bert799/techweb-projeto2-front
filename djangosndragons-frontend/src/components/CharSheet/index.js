import React from "react";
import "./index.css";

export default function CharSheet(props) {
  return (
    <div className="card">
      <h3 className="card-title">{props.name}</h3>
      <div className="card-content">
        <p>
          Bata com um martelo antes de abrir o pacote. Misture o tempero,
          coloque em uma vasilha e aproveite seu snack :)
        </p>
      </div>
    </div>
  );
}
