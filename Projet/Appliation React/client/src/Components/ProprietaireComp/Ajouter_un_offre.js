import React, { Component } from "react";
import { Input, Card, Button, Form, Space, DatePicker, message } from "antd";

class AjouterOffre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: "",
      latitude: "",
      duree_dispo: "",
      date_debut: "",
    };
  }

  contract = this.props.contract;
  accounts = this.props.accounts;

  onChange = async (date, dateString) => {
    this.setState({ date_debut: dateString });
  };

  handleChange = async (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (event) => {
    try {
      let result = await this.contract.methods
        .setOffre(
          this.state.longitude,
          this.state.latitude,
          this.state.duree_dispo,
          this.state.date_debut
        )
        .send({ from: this.accounts[0] });
      if (result.status === true) {
        message.info("offre ajouté avec succés");
      }
    } catch (error) {
      alert(error);
    }
    event.preventDefault(true);
  };

  handleReset = () => {
    this.setState({
      longitude: "",
      latitude: "",
      duree_dispo: "",
      date_debut: "",
    });
  };

  render() {
    return (
      <>
        <Card
          style={{
            position: "relative",
            width: "50%",
            left: "600px",
            top: "70px",
            borderRadius: "7px",
            opacity:0.7,
          }}
        >
          <legend>Ajouter une offre :</legend>
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Longitude :"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Input
                name="longitude"
                value={this.state.longitude}
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item
              label="Latitude :"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Input
                name="latitude"
                value={this.state.latitude}
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item
              label="Durée de disponibilité :"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Input
                name="duree_dispo"
                value={this.state.duree_dispo}
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item
              label="Date de début de diiponibilité :"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <DatePicker
                placeholder={""}
                onChange={this.onChange.bind(this)}
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 10,
              }}
            >
              <Space size={3}>
                <Button
                  type="Success"
                  htmlType="submit"
                  onClick={this.handleSubmit.bind(this)}
                >
                  Envoyer
                </Button>
                <Button htmlType="submit" onClick={this.handleReset}>
                  Annuler
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </>
    );
  }
}
export default AjouterOffre;
