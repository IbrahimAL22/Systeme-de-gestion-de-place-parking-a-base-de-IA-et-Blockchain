import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

class AdministrateurComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
    };
  }

  componentDidMount = async () => {
    const result = await this.contract.methods
      .AdministrateurName()
      .call({ from: this.accounts[0] });
    this.setState({ result });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require('../../assets/favicon.png')}
          />
          <Text style={styles.title}>Smart Parking</Text>
          <LogoutButton />
        </View>
        <View style={styles.sider}>
          <Avatar
            size="large"
            rounded
            source={{
              uri: 'https://toppng.com/uploads/preview/dm-icon-admin-client-round-icon-administrator-11563182866urbejlvbxt.png',
            }}
            containerStyle={styles.avatar}
          />
          <Text style={styles.userName}>{this.state.result}</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Proprietaire</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Locataire</Text>
          </TouchableOpacity>
        </View>
        <Outlet />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#001220',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  logo: {
    width: 35,
    height: 35,
  },
  title: {
    color: 'white',
    fontSize: 18,
    marginLeft: 7,
  },
  sider: {
    flex: 1,
    backgroundColor: '#001220',
    paddingTop: 100,
    paddingHorizontal: 10,
  },
  avatar: {
    marginBottom: 20,
  },
  userName: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: '#001220',
    marginBottom: 10,
  },
  menuText: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 10,
    paddingLeft: 10,
  },
});

export default AdministrateurComp;
