import * as React from 'react';

import './App.css';

export interface AppProps {
  name : string;
  company ?: string;
}
interface AppState {
  age:number
}

class App extends React.Component< AppProps, AppState> {
  // public state:{age:number}={
  //   age : 30
  // } state 방법 1 : state선언만 하기
  static defaultProps = {
    company:'Default'
  };
  constructor(props:AppProps){
    console.log('App constructor')
    super(props);
    this._rollback = this._rollback.bind(this);
    this.state={
      age:30
    }
    setInterval(()=>{
      this.setState({
        age:this.state.age +1
      })
    },2000);
  } // state 방법2 : constructor 사용하고 props바인딩
  componentWillMount(){
    console.log('App componentwillMount');
  }
  componentDidMount(){
    // 이 부분에서 api 불러옴
    console.log('App componentDidMount');
  }
  componentWillUnmount(){
    console.log("App componentWillUnmount");
    // clearInterval(this._interval);
  }


  render(){
    console.log('App rendering')
    return (
      <div className="App">
        {this.props.name}, {this.props.company}, {this.state.age}
        <button onClick={this._rollback}>회춘</button>
        <StatelessComponent name="Anna">나는 자식이다.</StatelessComponent>
        <StatelessComponent1 name="Anna">나는 자식이다.</StatelessComponent1>
      </div>
    );
  }
  private _rollback():void{
    this.setState({
      age: 25
    });
  }
}


//stateless component (functinal component)
const StatelessComponent:React.SFC<AppProps> = (props) =>{
  return(
    <h2>{props.name}, {props.company}, {props.children}</h2>
  );
};

StatelessComponent.defaultProps={
  company:'home'
}

//stateless component (functinal component)
const StatelessComponent1:React.SFC<AppProps> = ({name, company='home2', children}) =>{
  return(
    <h2>{name}, {company}, {children}</h2>
  );
};

StatelessComponent.defaultProps={
  company:'home'
}


export default App;
