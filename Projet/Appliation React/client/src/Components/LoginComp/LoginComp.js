import React from "react";
import { Button, Form, message, Layout, Typography } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;
const { Title } = Typography;

const LoginComp = (props) => {
  const contract = props.contract;
  const accounts = props.accounts;
  const navigate = useNavigate();

  const checkAdmin = async () => {
    let result = await contract.methods
      .isAdminExist()
      .call({ from: accounts[0] });
    if (result === "true") {
      setTimeout(() => {
        localStorage.setItem("isloggedin", JSON.stringify(true));
        message.success("C'est parti !");
      }, 500);
      setTimeout(() => {
        navigate("Administrateur/dashboard");
      }, 1000);
    } else {
      setTimeout(() => {
        message.error("Ce compte n'existe pas.");
      }, 1000);
    }
  };
  const checkproprietaire = async () => {
    let result = await contract.methods
      .isProprietaireExist()
      .call({ from: accounts[0] });
    if (result === "true") {
      setTimeout(() => {
        localStorage.setItem("isloggedin", JSON.stringify(true));
        message.success("C'est parti !");
      }, 500);
      setTimeout(() => {
        navigate("proprietaire/dashboard");
      }, 1000);
    } else {
      setTimeout(() => {
        message.error("Ce compte n'existe pas.");
      }, 1000);
    }
  };

  const checklocataire = async () => {
    let result = await contract.methods
      .isLocataireExist()
      .call({ from: accounts[0] });
    if (result === "true") {
      setTimeout(() => {
        localStorage.setItem("isloggedin", JSON.stringify(true));
        message.success("C'est parti !");
      }, 500);
      setTimeout(() => {
        navigate("locataire/dashboard");
      }, 1000);
    } else {
      setTimeout(() => {
        message.error("Ce compte n'existe pas.");
      }, 1000);
    }
  };

  return (
    <div className="back">
      <Header style={{ zIndex: 1, width: "100%", backgroundColor: "#001220" }}>
        <img
          style={{
            float: "left",
            width: "60px",
            height: "60px",
            borderRadius: 50,
          }}
          alt=""
          src="/favicon.png"
          width="35"
          height="35"
          className="d-inline-block align-top"
        />
        <Title
          level={3}
          style={{
            position: "relative",
            color: "white",
            float: "left",
            top: "15px",
            marginLeft: "7px",
          }}
        >
          Smart Parking
        </Title>
      </Header>
      <br />
      <br />
      <br />
      <h1>Bienvenue sur Smart Parking</h1> <br />
      <br />
      <br />
      <br />
      <h2>Se connecter en tant que :</h2>
      <br />
      <br />

      <Form>
        <Button
          shape={"round"}
          className="button1"
          type="Success"
          size={"large"}
          onClick={checkAdmin}
        >
          Administrateur
        </Button>

        <br />
        <br />
        

        <Button
          shape={"round"}
          className="button1"
          type="Success"
          size={"large"}
          onClick={checkproprietaire}
        >
          Proprietaire
        </Button>
        <br />
        <br />

        <Button
          shape={"round"}
          className="button1"
          type="Success"
          size={"large"}
          onClick={checklocataire}
        >
          Locataire
        </Button>
      </Form>
    </div>
  );
};

export default LoginComp;
