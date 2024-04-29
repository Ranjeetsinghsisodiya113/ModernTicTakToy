import React, { Component } from 'react'
import { Alert, SafeAreaView, StatusBar, Text, ToastAndroid, TouchableOpacity } from 'react-native';
import { FlatList, View, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


export class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      turnPlayer: 2,
      statusCount: 0,

      point1: -1,
      point2: -1,
      list: [
        { color: 'black', status: false, colorStatus: 1 },
        { color: 'black', status: false, colorStatus: 1 },
        { color: 'black', status: false, colorStatus: 1 },
        { color: 'grey', status: false, colorStatus: 3 },
        { color: 'grey', status: false, colorStatus: 3 },
        { color: 'grey', status: false, colorStatus: 3 },
        { color: 'red', status: false, colorStatus: 2 },
        { color: 'red', status: false, colorStatus: 2 },
        { color: 'red', status: false, colorStatus: 2 },
      ]
    }

  }

  setpoints(index, item) {
    var my_list = this.state.list;

    if (this.state.point1 == -1 || this.state.point2 == -1) {
      if (this.state.point1 == -1 && item.colorStatus != 3) {

        if (this.state.turnPlayer == item.colorStatus) {
          my_list[index].status = true
          this.setState({ point1: index, list: my_list })
        }
      } else {


        if (this.state.point1 != -1 && item.colorStatus == 3) {


          if (
            (this.state.point1 == 0 && (index == 1 || index == 3 || index == 4)) ||
            (this.state.point1 == 1 && (index == 0 || index == 2 || index == 4)) ||
            (this.state.point1 == 2 && (index == 1 || index == 5 || index == 4)) ||
            (this.state.point1 == 3 && (index == 0 || index == 6 || index == 4)) ||
            (this.state.point1 == 5 && (index == 2 || index == 8 || index == 4)) ||
            (this.state.point1 == 6 && (index == 3 || index == 7 || index == 4)) ||
            (this.state.point1 == 7 && (index == 6 || index == 8 || index == 4)) ||
            (this.state.point1 == 8 && (index == 5 || index == 7 || index == 4)) ||
            (this.state.point1 == 4)

          ) {
            my_list[index].status = true
            this.setState({ point2: index, list: my_list })

            setTimeout(() => {
              this.swipeIndexItem()
            }, 300);
          }
        } else {
          if (this.state.point1 == index)
            my_list[this.state.point1].status = false
          this.setState({ point1: -1, list: my_list })

        }
      }
    }
  }

  swipeIndexItem() {
    var my_list = this.state.list;

    console.log(my_list)
    my_list[this.state.point1].status = false
    my_list[this.state.point2].status = false

    var point11 = my_list[this.state.point1]
    var point22 = my_list[this.state.point2]


    console.log(point11)
    console.log(point22)

    my_list[this.state.point2] = point11
    my_list[this.state.point1] = point22

    console.log(my_list)


    this.setState({ list: my_list, point1: -1, point2: -1 })

    setTimeout(() => {
      this.checkPlayer()
    }, 300);



  }

  checkPlayer() {
    var data = this.state.list;

    console.log("data", data)
    const blackArray1 = []
    const redArray1 = []
    for (let i = 0; i < data.length; i++) {

      if (data[i].colorStatus == 1) {
        console.log('black done')
        blackArray1.push(i)
      }
      if (data[i].colorStatus == 2) {
        console.log('red done')
        redArray1.push(i)
      }

    }


    console.log('array black', blackArray1)
    console.log('array red', redArray1)

    setTimeout(() => {
      if (this.state.turnPlayer == 1) {
        this.checkWinBlack(blackArray1)
      } else {
        this.checkWinRed(redArray1)
      }

    }, 300)


  }

  checkWinBlack(array) {
    console.log('array', array)

    if (
      (array[0] == 0 && ((array[1] == 3 && array[2] == 6) || (array[1] == 4 && array[2] == 8))) ||
      (array[0] == 1 && array[1] == 4 && array[2] == 8) ||
      (array[0] == 2 && ((array[1] == 4 && array[2] == 6) || (array[1] == 5 && array[2] == 8))) ||
      (array[0] == 3 && array[1] == 4 && array[2] == 5) ||
      (array[0] == 6 && array[1] == 7 && array[2] == 8)
    ) {

      Alert.alert('Congratulation!', `
      Black player!\n 
      You won this game ...`)


      this.setState({
        turnPlayer: 2,
        statusCount: 0,

        point1: -1,
        point2: -1,
        list: [
          { color: 'black', status: false, colorStatus: 1 },
          { color: 'black', status: false, colorStatus: 1 },
          { color: 'black', status: false, colorStatus: 1 },
          { color: 'grey', status: false, colorStatus: 3 },
          { color: 'grey', status: false, colorStatus: 3 },
          { color: 'grey', status: false, colorStatus: 3 },
          { color: 'red', status: false, colorStatus: 2 },
          { color: 'red', status: false, colorStatus: 2 },
          { color: 'red', status: false, colorStatus: 2 },
        ]
      })

    }

    this.setState({ turnPlayer: 2 })

  }


  checkWinRed(array) {

    if (
      (array[0] == 0 && ((array[1] == 3 && array[2] == 6) || (array[1] == 4 && array[2] == 8))) ||
      (array[0] == 1 && array[1] == 4 && array[2] == 8) ||
      (array[0] == 2 && ((array[1] == 4 && array[2] == 6) || (array[1] == 5 && array[2] == 8))) ||
      (array[0] == 3 && array[1] == 4 && array[2] == 5) ||
      (array[0] == 0 && array[1] == 1 && array[2] == 2)
    ) {

      Alert.alert('Congratulation!', `
      Red player!\n 
      You won this game ...`)


      this.setState({
        turnPlayer: 2,
        statusCount: 0,

        point1: -1,
        point2: -1,
        list: [
          { color: 'black', status: false, colorStatus: 1 },
          { color: 'black', status: false, colorStatus: 1 },
          { color: 'black', status: false, colorStatus: 1 },
          { color: 'grey', status: false, colorStatus: 3 },
          { color: 'grey', status: false, colorStatus: 3 },
          { color: 'grey', status: false, colorStatus: 3 },
          { color: 'red', status: false, colorStatus: 2 },
          { color: 'red', status: false, colorStatus: 2 },
          { color: 'red', status: false, colorStatus: 2 },
        ]
      })

    }

    this.setState({ turnPlayer: 1 })

  }





  render() {
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.5, 0.6]}
        colors={['#4c669f', '#3b5998', 'purple']}
        style={{ width: '100%', height: '100%', alignItems: "center", justifyContent: "center" }}>
        <SafeAreaView
          style={{
            flex: 0,
            backgroundColor: 'white',
          }}
        />
        <StatusBar
          hidden={false}
          backgroundColor={'white'}
          translucent={false}
          barStyle="dark-content"
          networkActivityIndicatorVisible={true}
        />

        <View>
          <View


            style={{
              borderColor: this.state.turnPlayer == 1 ? 'green' : 'black',
              borderWidth: 4,
              backgroundColor: 'black',
              width: 100,
              alignItems: 'center',
              justifyContent: 'center',
              height: 100,
              margin: 10,
              borderRadius: 50,
            }}>
            <Text style={{
              textAlign: 'center',
              fontSize: 20,
              color: 'white'
            }}>
              {"Player 1"}
            </Text>
          </View>
        </View>

        <View style={{
          width: '99%',
          paddingVertical: 10,
          borderColor: 'blue',
          borderRadius: 50,
          borderWidth:2.5,

          alignItems: 'center'
        }}>
          <FlatList
            numColumns={3}
            data={this.state.list}
            renderItem={({ item, index }) =>
              <TouchableOpacity

                activeOpacity={0.9}
                onPress={() => {
                  this.setpoints(index, item);
                }}

                style={{
                  borderColor: item.status == false ? item.color : 'blue',
                  borderWidth: 4,
                  backgroundColor: item.color,
                  width: 80,
                  height: 80,
                  margin: 3,
                  borderRadius: 40,
                }}>

              </TouchableOpacity>
            }

          >


          </FlatList>
        </View>

        <View>
          <View


            style={{
              borderColor: this.state.turnPlayer == 2 ? 'green' : 'red',
              borderWidth: 4,
              backgroundColor: 'red',
              width: 100,
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 4,
              borderRadius: 50,
            }}>

            <Text style={{
              textAlign: 'center',
              fontSize: 20,
              color: 'white'
            }}>
              {"Player 2"}
            </Text>

          </View>
        </View>
      </LinearGradient>
    )
  }
}

export default App