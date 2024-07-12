import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Avatar } from "antd";
import { Menu, Layout, Typography } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";
import {
  UserOutlined,
  DashboardOutlined,
  OrderedListOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

const { Sider, Header } = Layout;
const { Title } = Typography;

class ProprietaireComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
    };
  }

  contract = this.props.contract;
  accounts = this.props.accounts;

  componentDidMount = async () => {
    const result = await this.contract.methods
      .ProprietaireName()
      .call({ from: this.accounts[0] });
    this.setState({ result });
  };
  render() {
    return (
      <>
        <Header
          style={{
            zIndex: 1,
            width: "100%",
            backgroundColor: "#001220",
            position: "fixed",
            backgroundColor: "#001220",
          }}
        >
          <img
            style={{ float: "left", width: "60px", height: "60px" ,borderRadius:50}}
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
          <LogoutButton></LogoutButton>
        </Header>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            color:"#001220",
            top: "64px",
            bottom: 0,
            backgroundColor:"#001220"
          }}
          width={"255px"}
        >
          <br />
          <Avatar size={90} src="data:image/png;base64,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" />
          <br />
          <br />
          <h4 style={{ color: "white" }}>{this.state.result}</h4>
          <br />
          <Menu style={{backgroundColor:"#001220"}} theme="dark" mode="inline">
            <Menu.Divider></Menu.Divider>
            <Menu.Item style={{backgroundColor:"#001220"}} key="1" >
              <NavLink style={{backgroundColor:"#001220"}} to="dashboard" />
             
              <h4 style={{color:"#ffffff"} }>Home</h4>
            </Menu.Item>
            <br />
            <Menu.Item style={{backgroundColor:"#001220"}} key="2" >
              <NavLink style={{backgroundColor:"#001220"}} to="Ajouter_un_offre" />
              <h4 style={{color:"#ffffff"} }>Ajouter une offre</h4>
            </Menu.Item>
            <br />
            <Menu.Item style={{backgroundColor:"#001220"}} key="3" >
              <NavLink style={{backgroundColor:"#001220"}} to="Liste_des_offres" />
              <h4 style={{color:"#ffffff"} }>Liste des offres</h4>
            </Menu.Item>
          </Menu>
        </Sider>
        <Outlet />
      </>
    );
  }
}
export default ProprietaireComp;
