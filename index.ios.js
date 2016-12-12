/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';
const axios = require('axios');

function api() {
  if (process.env.NODE_ENV === 'production') {
    return 'https://bestbuy.now.sh';
  } else {
    return 'http://localhost:3030';
  }
}

export default class NativePractice extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      storeResults: ds.cloneWithRows([])
    }
  }
  componentDidMount() {
    this.getStores()
  }
  getStores() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    axios.get(api() + '/stores').then((response) => {
      let storeResults = ds.cloneWithRows(response.data.data);
      this.setState({storeResults});
      console.log(this.state.storeResults)
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          React Native practice using the Best Buy API playground
        </Text>
        <ListView style={{marginBottom: 300, flex: 1}} enableEmptySections={true} dataSource={this.state.storeResults} renderRow={(store) => <TouchableHighlight style={{backgroundColor: 'white'}} activeOpacity={.5}>
          <View>
            <Text>
              {store.name}
            </Text>
            <Text>
              {store.address}
            </Text>
          </View>
        </TouchableHighlight>}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1560fb'
  },
  welcome: {
    flex: 2,
    fontSize: 20,
    textAlign: 'center',
    margin: 50
  }
});

AppRegistry.registerComponent('NativePractice', () => NativePractice);
