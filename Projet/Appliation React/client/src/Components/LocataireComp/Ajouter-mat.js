import React, { Component } from "react";
import { Input, Card, Button, Form, Space, DatePicker, message } from "antd";

class Ajoutermat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matricule: "",
      duree_location: "",
    };
  }

  contract = this.props.contract;
  accounts = this.props.accounts;

  handleChange = async (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async () => {
    try {
      let result = await this.contract.methods
        .setMatricule(this.state.matricule, this.state.duree_location)
        .send({ from: this.accounts[0] });
      if (result.status === true) {
        message.info("matricule ajouté");
      }
    } catch (error) {
      alert(error);
    }
    
  };

  handleReset = () => {
    this.setState({
      matricule: "",
      duree_location: "",
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
            opacity: 0.7,
          }}
        >
          <legend>Ajouter matricule</legend>
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
              label="Matricule :"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Input
                name="matricule"
                value={this.state.matricule}
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item
              label="durée de location"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Input
                name="duree_location"
                value={this.state.duree_location}
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item
              label=" "
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
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
export default Ajoutermat;
