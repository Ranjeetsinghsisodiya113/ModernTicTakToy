import React, { Component } from 'react'
import { Text, ToastAndroid, TouchableOpacity } from 'react-native';
import { FlatList, View, } from 'react-native';


export class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      statusCount: 0,
      list: [
        { color: 'white', innerColor: "red", status: false, colorStatus: 1 },
        { color: 'white', innerColor: "blue", status: false, colorStatus: 2 },
        { color: 'white', innerColor: "green", status: false, colorStatus: 3 },
        { color: 'white', innerColor: "red", status: false, colorStatus: 1 },
        { color: 'white', innerColor: "blue", status: false, colorStatus: 2 },
        { color: 'white', innerColor: "green", status: false, colorStatus: 3 },
        { color: 'white', innerColor: "red", status: false, colorStatus: 1 },
        { color: 'white', innerColor: "blue", status: false, colorStatus: 2 },
        { color: 'white', innerColor: "green", status: false, colorStatus: 3 },
      ]
    }

  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index lower than the current position
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements i and j
        [array[i], array[j]] = [array[j], array[i]];
    }

    setTimeout(() => {
      console.log("After",this.state.list)
    }, 500);
    
}


  checkRed(index) {

    let statusCount = this.state.statusCount;
    var data = this.state.list;
    if(statusCount<=3){
    data[index].status = true
    statusCount = statusCount + 1
   }
    
    this.setState({ list: data, statusCount: statusCount })

    if (statusCount == 3) {
      var b = 0
      var r = 0
      var g = 0
      for (let i = 0; i < data.length; i++) {
        if (data[i].status == true) {
          if (data[i].innerColor == 'red') {
            r = r + 1
          }
          if (data[i].innerColor == 'green') {
            g = g + 1
          }
          if (data[i].innerColor == 'blue') {
            b = b + 1
          }
        }

      }
      if (r == 3 || g == 3 || b == 3) {
        ToastAndroid.show("You Won :)", 4)
      } else {
        ToastAndroid.show("You lost :(", 4)
      }

      setTimeout(() => {
        this.setState({ list: data, statusCount: 0 })
      }, 500);


      setTimeout(() => {

        for (let i = 0; i < data.length; i++) {
          data[i].status = false
        }


        this.setState({ list: data })

       
        this.shuffleArray(data);
      }, 1000);
    }


  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 40, color: 'pink', textAlign: 'center' }}>
            Good Luck Games!
          </Text>
        </View>
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 40, color: 'purple', textAlign: 'center' }}>
            Hello Gamer!
          </Text>
        </View>
        <View style={{ paddingHorizontal: 30, marginBottom: 30 }}>
          <Text style={{ lineHeight: 30, fontSize: 20, color: 'purple', textAlign: 'center' }}>
            There are three color combination block Tap on Block and find similar color block
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <FlatList
            numColumns={3}
            data={this.state.list}
            renderItem={({ item, index }) =>
              <TouchableOpacity

                activeOpacity={0.9}
                onPress={() => {
                  this.checkRed(index)
                }}

                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  backgroundColor: item.status == true ? item.innerColor : item.color,
                  width: 142,
                  height: 142
                }}>

              </TouchableOpacity>
            }

          >


          </FlatList>
        </View>
      </View>
    )
  }
}

export default App