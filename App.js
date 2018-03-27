import React from 'react';
import { StyleSheet, Text, View, Image, Animated, Easing, Button, TouchableHighlight } from 'react-native';

export default class App extends React.Component {
  constructor(){
    super()
    this.RotateValueHolder = new Animated.Value(0);
    this.state = {
      someStuff: "meow!",
      isRotate: true,
    }
  }

  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);

    Animated.timing(
      this.RotateValueHolder,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear
      }
    ).start(() => this.StartImageRotateFunction())
  }

  componentDidMount() {
    this.StartImageRotateFunction();
  }

  clickCat(e) {
    e.preventDefault();
    console.log("hello");
    this.setState({
       someStuff: "not meow!"
    })
  }

  render() {
    const rotateData = this.RotateValueHolder.interpolate({
      inputRange: [0,1],
      outputRange: ["0 deg", "360 deg"]
    })

    return (
        <View style={styles.container}>
          <Text style={styles.header}>A picture of cat &#128584;</Text>
          <TouchableHighlight onPress={(e) => this.clickCat(e)}>
            <Animated.Image
               style={{ transform: [{ rotate: rotateData }] }}
               source={require('./img/meow.jpg')}
             />
         </TouchableHighlight>
           <Text onPress={(e) => this.clickCat(e)}>{this.state.someStuff}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
    color: 'red',
  },
});
