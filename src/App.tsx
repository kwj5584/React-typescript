import * as React from 'react';
import './App.css';

export interface AppProps {
}

export interface AppState {
  toGrandChild: string;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    console.log('App constructor');
    super(props);
    this.state = {
      toGrandChild: '아직 안바뀜'
    };
    this._clickToGrandChild = this._clickToGrandChild.bind(this);
  }

  componentWillMount() {
    console.log('App componentWillMount');
  }

  componentDidMount() {
    console.log('App componentDidMount');
  }

  componentWillUnmount() {
    console.log('App componentWillUnmount');
  }

  componentWillReceiveProps(nextProps: AppProps) {
    console.log(`App componentWillReceiveProps : ${JSON.stringify(nextProps)}`);
  }

  shouldComponentUpdate(nextProps: AppProps, nextState: AppState): boolean {
    console.log(`App shouldComponentUpdate : ${JSON.stringify(nextProps)}, ${JSON.stringify(nextState)}`);
    return true;
  }

  componentWillUpdate(nextProps: AppProps, nextState: AppState) {
    console.log(`App componentWillUpdate : ${JSON.stringify(nextProps)}, ${JSON.stringify(nextState)}`);
  }

  componentDidUpdate(prevProps: AppProps, prevState: AppState) {
    console.log(`App componentDidUpdate : ${JSON.stringify(prevProps)}, ${JSON.stringify(prevState)}`);
  }

  render() {
    console.log('App render');
    return (
      <div>
        <Parent {...this.state} />
        <button onClick={this._clickToGrandChild}>GrandChild 의 값을 바꾸기</button>
      </div>
    );
  }

  private _clickToGrandChild(): void {
    this.setState({
      toGrandChild: '그랜드 차일드의 값을 변경'
    });
  }
}

interface ParentProp {
  toGrandChild: string;
}

const Parent: React.SFC<ParentProp> = (props) => {
  return (
    <div>
      <p>여긴 Parent</p>
      <Me {...props} />
    </div>
  );
};

interface MeProp {
  toGrandChild: string;
}

const Me: React.SFC<MeProp> = (props) => {
  return (
    <div>
      <p>여긴 Me</p>
      <Child {...props} />
    </div>
  );
};

interface ChildProp {
  toGrandChild: string;
}

const Child: React.SFC<ChildProp> = (props) => {
  return (
    <div>
      <p>여긴 Child</p>
      <GrandChild {...props} />
    </div>
  );
};

interface GrandChildProp {
  toGrandChild: string;
}

const GrandChild: React.SFC<GrandChildProp> = (props) => {
  return (
    <div>
      <p>여긴 GrandChild</p>
      <h3>{props.toGrandChild}</h3>
    </div>
  );
};

export default App;