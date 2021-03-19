import * as React from 'react';

import './App.css';

export interface AppProps {
  name : string
}
interface AppState {
  age:number
}

class App extends React.Component< AppProps, AppState> {
  // public state:{age:number}={
  //   age : 30
  // } state 방법 1 : state선언만 하기
  constructor(props:AppProps){
    super(props);
    this.state={
      age:30
    }
    setInterval(()=>{
      this.setState({
        age:this.state.age +1
      })
    },2000);
  } // state 방법2 : constructor 사용하고 props바인딩
  render(){
  return (
    <div className="App">
      {this.props.name}, {this.state.age}
      <StatelessComponent name="Anna">나는 자식이다.</StatelessComponent>
    </div>
  );
}
}

//stateless component (functinal component)
const StatelessComponent:React.SFC<AppProps> = (props) =>{
  return(
    <h2>{props.name} {props.children}</h2>
  );
}

export default App;
