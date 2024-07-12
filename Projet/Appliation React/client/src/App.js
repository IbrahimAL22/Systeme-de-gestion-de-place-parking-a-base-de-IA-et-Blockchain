import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "antd/dist/antd.css";
import smartcontract from "./contracts/Main.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import AdministrateurComp from "./Components/AdministrateurComp/AdministrateurComp";
import Proprietaire from "./Components/AdministrateurComp/Proprietaire";
import Locataire from "./Components/AdministrateurComp/Locataire";
import ProprietaireComp from "./Components/ProprietaireComp/ProprietaireComp";
import AjouterOffre from "./Components/ProprietaireComp/Ajouter_un_offre";
import Listedesoffresp from "./Components/ProprietaireComp/Liste_des_offres_P";
import LocataireComp from "./Components/LocataireComp/LocataireComp";
import Listedesoffresl from "./Components/LocataireComp/Liste_des_offres_L";
import Ajoutermat from "./Components/LocataireComp/Ajouter-mat";
import Dashboard from "./Components/AdministrateurComp/Dashboard";
import Login from "./Components/LoginComp/LoginComp";
import ProtectedRoutes from "./ProtectedRoutes";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      contract: null,
      accounts: null,
    };
  }

  componentDidMount = async () => {
    try {
      var web3 = await getWeb3();
      var accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const contractAddr = "0x7417Bddb42CbcfA52375DEc173ddd57a991B2548";

      const contract = new web3.eth.Contract(smartcontract.abi, contractAddr);
      // set State variables to derived values.
      this.setState({ web3, accounts, contract });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Login
                contract={this.state.contract}
                accounts={this.state.accounts}
              />
            }
          ></Route>
          <Route element={<ProtectedRoutes />}>
            <Route
              path="Administrateur"
              element={
                <AdministrateurComp
                  contract={this.state.contract}
                  accounts={this.state.accounts}
                />
              }
            >
              <Route path="Dashboard" element={<Dashboard />}></Route>
              <Route
                path="editproprietaire"
                element={
                  <Proprietaire
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>
              <Route
                path="editlocataire"
                element={
                  <Locataire
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>
            </Route>
            <Route
              path="proprietaire"
              element={
                <ProprietaireComp
                  contract={this.state.contract}
                  accounts={this.state.accounts}
                />
              }
            >
              <Route path="Dashboard" element={<Dashboard />}></Route>
              <Route
                path="Ajouter_un_offre"
                element={
                  <AjouterOffre
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>
              <Route
                path="Liste_des_offres"
                element={
                  <Listedesoffresp
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>
            </Route>
            <Route
              path="locataire"
              element={
                <LocataireComp
                  contract={this.state.contract}
                  accounts={this.state.accounts}
                />
              }
            >
              <Route path="Dashboard" element={<Dashboard />}></Route>
              <Route
                path="liste_des_offres"
                element={
                  <Listedesoffresl
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>
              <Route
                path="Ajouter-mat"
                element={
                  <Ajoutermat
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>

            </Route>
          </Route>
          <Route path="*" element={<Navigate to={"/"} />}></Route>
        </Routes>
      </div>
    );
  }
}
export default App;
