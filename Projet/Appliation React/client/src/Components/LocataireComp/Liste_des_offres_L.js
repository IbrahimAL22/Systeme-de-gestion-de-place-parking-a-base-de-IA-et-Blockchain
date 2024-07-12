import React, { Component } from "react";
import { Button, Card, Table, Space, Tag } from "antd";

class Listedesoffresl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: [],
      number: [],
      Longitude: [],
      Latitude: [],
      duree_dispo: [],
      duree_location: [],
      statut_rasp:[],
      matricule:[],
      date_debut: [],
      EtatR: [],
      columns: [
        {
          title: "N° :",
          dataIndex: "number",
          align: ["center"],
        },

        {
          title: "Longitude :",
          dataIndex: "Longitude",
          align: ["center"],
        },

        {
          title: "Latitude :",
          dataIndex: "Latitude",
          align: ["center"],
        },

        {
          title: "Durée de disponbilité :",
          dataIndex: "duree_dispo",
          align: ["center"],
        },

        {
          title: "Date de début",
          dataIndex: "date_debut",
          align: ["center"],
        },

        {
          title: "Matricule :",
          dataIndex: "matricule",
          align: ["center"],
        },
        {
          title: "Durée de location ",
          dataIndex: "duree_location",
          align: ["center"],
        },

        {
          title: "Statut ",
          dataIndex: "statut_rasp",
          align: ["center"],
        },

        {
          title: "Etat de réservation:",
          dataIndex: "EtatR",
          align: ["center"],
          render: (Etat) => (
            <>
              {Etat.map((tag) => {
                let color;
                if (tag === "Place reservee") {
                  color = "green";
                } else {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={Etat}>
                    {Etat}
                  </Tag>
                );
              })}
            </>
          ),
        },

        {
          title: "Action",
          key: "action",
          align: ["center"],
          render: (record) => (
            <Space size={1}>
              <Button
                type="Success"
                shape={"round"}
                onClick={async () => {
                  try {
                    let result = await this.contract.methods
                      .setReservation(record.number)
                      .send({ from: this.accounts[0] });
                    if (result.status === true) {
                      this.list();
                    }
                  } catch (error) {
                    alert(error);
                  }
                }}
              >
                Réserver
              </Button>
            </Space>
          ),
        },
      ],
    };
  }

  contract = this.props.contract;
  accounts = this.props.accounts;

  list = async () => {
    this.setState(() => ({
      tab: [],
    }));
    let resultat = await this.contract.methods
      .getOffre()
      .call({ from: this.accounts[0] });
    let resultat1 = await this.contract.methods
      .getReservedOffre()
      .call({ from: this.accounts[0] });
    this.setState({
      number: resultat[0],
      Longitude: resultat[1],
      Latitude: resultat[2],
      duree_dispo: resultat[3],
      date_debut: resultat[4],
      EtatR: resultat[5],
      duree_location: resultat1[0],
      statut_rasp: resultat1[1],
      matricule: resultat1[2],
    });
    for (let i = 0; i < this.state.number.length; i++) {
      this.setState((x) => ({
        tab: [
          ...x.tab,
          {
            key: i,
            number: x.number[i],
            Longitude: x.Longitude[i],
            Latitude: x.Latitude[i],
            duree_dispo: x.duree_dispo[i],
            date_debut: x.date_debut[i],
            EtatR: [x.EtatR[i]],
            duree_location: x.duree_location[i],
            statut_rasp: x.statut_rasp[i],
            matricule: x.matricule[i],
          },
        ],
      }));
    }
  };

  componentDidMount = async () => {
    this.list();
  };

  render() {
    return (
      <>
        <Card
          style={{
            position: "relative",
            width: "80%",
            left: "265px",
            top: "70px",
            borderRadius: "7px",
            opacity:0.7,

          }}
        >
          <legend>Liste des offres :</legend>
          <Table
            size="small"
            columns={this.state.columns}
            dataSource={this.state.tab}
            pagination={{ pageSize: 5 }}
          />
        </Card>
        
      </>
    );
  }
}

export default Listedesoffresl;
