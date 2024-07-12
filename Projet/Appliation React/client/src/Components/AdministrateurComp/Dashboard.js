import React from "react";
import { Card } from "antd";
import "rsuite/styles/index.less";
function Dashboard() {
  return (
    <Card
      style={{
        position: "relative",
        width: "80%",
        left: "295px",
        top: "70px",
        borderRadius: "7px",
        opacity:0.7,
      }}
    >
      <h1>Bienvenue !</h1>
      <br/>
      <br/>
      <br/>

      <img
            style={{ float: "center", width: "900px", height: "600px" }}
            alt=""
            src="/Parking.png"
            width="350"
            height="350"
            className="d-inline-block align-top"
      />
      <h5>Quand on possède un véhicule, trouver une place de parking est trop souvent source de stress et de temps perdu. De la même façon, lorsqu’on gère un espace de stationnement, un fort taux d’occupations est la clé de la rentabilité, mais trop de places restent souvent vides. Les technologies dites de “Smart Parking” ont pour but de faire disparaître ces désagréments, utilisateurs comme gestionnaires.</h5>
    </Card>
  );
}

export default Dashboard;
