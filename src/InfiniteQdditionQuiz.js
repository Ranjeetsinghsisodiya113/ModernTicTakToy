import React, { Component } from 'react'
import { Button, Keyboard, Text, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';
import { FlatList, View, } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      Number1: 0,
      Number2: 0,
      Answers: [],
      correctAnswer: '',
      myAnswer: '',
      ButtonText: '',
    }

  }

  componentDidMount() {
    this.generateQuestionAndAnswers(this.state.list)
  }

  generateQuestionAndAnswers(numbers) {

    if (numbers.length < 2) {
      throw new Error('At least two distinct numbers are required');
    }

    // Function to get a random integer between 0 and max - 1
    const getRandomIndex = (max) => Math.floor(Math.random() * max);

    // Ensure that Number1 and Number2 are distinct by picking two different indices
    let index1 = getRandomIndex(numbers.length);
    let index2 = getRandomIndex(numbers.length);

    // Keep rerolling index2 until it's different from index1
    while (index1 === index2) {
      index2 = getRandomIndex(numbers.length);
    }

    const Number1 = numbers[index1];
    const Number2 = numbers[index2];

    console.log(Number1, Number2)

    // Calculate the correct answer
    const correctAnswer = Number1 + Number2;

    // Generate three wrong answers
    const wrongAnswers = new Set();
    while (wrongAnswers.size < 3) {
      const perturbation = [-1, 1, -2, 2, -3, 3][getRandomIndex(6)];
      const wrongAnswer = correctAnswer + perturbation;
      // Make sure the wrong answer is unique and not the correct answer
      if (wrongAnswer !== correctAnswer) {
        wrongAnswers.add(wrongAnswer);
      }
    }

    // Combine the correct answer with wrong answers
    var answers = [...wrongAnswers, correctAnswer];

    // Shuffle the answers array
    for (let i = answers.length - 1; i > 0; i--) {
      const j = getRandomIndex(i + 1);
      const temp = answers[i];
      answers[i] = answers[j];
      answers[j] = temp;
    }
let anser_real=[]
var obj={answer:'',status:false}

answers.forEach((Element)=>{

       obj={answer:Element,status:false}
       anser_real.push(obj)
      
  })



    console.log("anser_real",anser_real)
    // Set state if used within a React component
    this.setState({
      Number1: Number1,
      Number2: Number2,
      Answers: anser_real,
      correctAnswer: correctAnswer

    });


  }

  CheckMyAnwser(index) {
    var my_answer_list=this.state.Answers;

my_answer_list[index].status=true

this.setState({Answers:my_answer_list})
 

    let correctAnswer = this.state.correctAnswer;
    let myAnswer = this.state.myAnswer
    if (myAnswer == correctAnswer) {
      ToastAndroid.show('Good!', 5)


      this.setState({ ButtonText: 'Next >' })

    } else {

     
      ToastAndroid.show('wrong!', 6)
      this.setState({ ButtonText: 'Retry Again!', })
    }

  }

  retryFun(){

    var my_answer_list=this.state.Answers;
    my_answer_list.forEach((Element)=>{

      Element.status=false
     this.setState({Answers:my_answer_list})
     
 })

  }

  render() {
    return (
      <View style={{ flex: 1, }}>

        <Text style={{ lineHeight: 100, textAlign: 'center', fontSize: 25, color: 'purple' }}>
          {'Perform Addition'}
        </Text>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 25, color: 'purple' }}>
            {this.state.Number1}
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ lineHeight: 100, fontSize: 25, color: 'purple' }}>
            {this.state.Number2}
          </Text>
        </View>


        <View style={{
          alignItems: 'center'

        }}>

          <Text style={{ textAlignVertical: 'center', lineHeight: 100, fontSize: 25, color: 'purple' }}>
            {'Options :'}
          </Text>
        </View>
        <View style={{ width: '100%', alignItems: 'center', marginBottom: 20 }}>
          <FlatList

            data={this.state.Answers}
            renderItem={({ item, index }) =>
              <TouchableOpacity 
              activeOpacity={0.9}
              onPress={()=>{

                this.state.ButtonText=='' &&

               (
                 this.setState({ myAnswer:item.answer }),
                
                setTimeout(() => {
                  this.CheckMyAnwser(index)
                }, 500)
                )
              }}
              
              style={{
                height: 50,
                borderRadius: 5,
                flexDirection: 'row',
                paddingHorizontal: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
                backgroundColor:item.status==true? (this.state.correctAnswer==this.state.myAnswer?("green"): "red"): 'lightgreen',
                width: 300,
              }}>
                <Text style={{ fontSize: 25, color: 'white' }}>
                  {String.fromCharCode(65 + index) + ". "}
                </Text>
                <Text style={{ width: 250, fontSize: 25, color: 'white' }}>
                  {item.answer}
                </Text>
              </TouchableOpacity>
            }
          >

          </FlatList>
        </View>
       
        <View style={{ marginTop: 30, width: 250, alignSelf: 'center' }}>


          {
            this.state.ButtonText != '' &&
            (this.state.ButtonText == 'Next >'
              ?
              <Button color={'green'} title={this.state.ButtonText} onPress={() => {
                this.setState({ ButtonText: "", myAnswer: '' })

                this.generateQuestionAndAnswers(this.state.list)
              }}></Button>
              :
              <Button color={'red'}  title={this.state.ButtonText} onPress={() => {
                this.retryFun()
                this.setState({ ButtonText: "", myAnswer: '', })
                


              }}></Button>
            )

          }
        </View>
      </View>
    )
  }
}

export default App