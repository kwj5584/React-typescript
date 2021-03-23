import * as React from 'react';
import './App.css';
import { BrowserRouter as  Router, Route, Link, RouteComponentProps, Switch, Redirect, NavLink} from 'react-router-dom'
import { Unsubscribe} from 'redux'
import {addAge} from  './index'
import * as PropTypes from 'prop-types';
// export interface AppProps {
// }

// export interface AppState {
//   toGrandChild: string;
// }


const Home = () =>{
  return(
    <h3>Home</h3>
  )
}

// match 객체 : <Route>의 path에 정의한 것과 매치된 정보를 담음
// location 객체 : 브라우저의 window.location 객체와 비슷. URL을 다루기 쉽게 쪼개서 가지고 있음.
// history 객체 : 브라우저의 window.history객체와 비슷. 주소를 임의로 변경하거나 되돌아갈 수 있음. 주소를 변경해도 SPA동작방식에 맞게 일부 페이지만 렌더

const Post = (props: RouteComponentProps<{postId: string}>) =>{
  const goNextPost = () =>{
    const nextPostId = +props.match.params.postId+1;
    props.history.push(`/posts/${nextPostId}`)
  }
  return(
    <div>
      <h3>Post {props.match.params.postId}</h3>
      <button onClick={goNextPost}>nextPost</button>
      <p>{props.location.search}</p>
    </div>
  )
}

const PostList = (props: RouteComponentProps<{}>) =>{
  return(
    <div>
      <Route exact={true} path={`${props.match.url}`} render={()=> <h3>PostList</h3>}/>
      <Route path={`${props.match.url}/:postId`} component={Post} />
    </div>
  )
}

const NotFound = () =>{
  return(
    <h3>Not Found!</h3>
  )
}

const Admin = () =>{
  const isAdmin = false;
  return isAdmin
  ? <h3>Admin</h3>
  : <Redirect to="/"/>;
}

class App extends React.Component<{}, {}> {
  public static contextTypes = {
    store : PropTypes.object
  }
  private _unsubscribe!: Unsubscribe;
  componentDidMount(){
    const store = this.context.store;
    this._unsubscribe = store.subscribe(()=>{
      this.forceUpdate();
    })
  }
  componentWillUnmount(){
    this._unsubscribe();
  }
  // constructor(props: AppProps) {
  //   console.log('App constructor');
  //   super(props);
  //   this.state = {
  //     toGrandChild: '아직 안바뀜'
  //   };
  //   this._clickToGrandChild = this._clickToGrandChild.bind(this);
  // }

  // componentWillMount() {
  //   console.log('App componentWillMount');
  // }

  // componentDidMount() {
  //   console.log('App componentDidMount');
  // }

  // componentWillUnmount() {
  //   console.log('App componentWillUnmount');
  // }

  // componentWillReceiveProps(nextProps: AppProps) {
  //   console.log(`App componentWillReceiveProps : ${JSON.stringify(nextProps)}`);
  // }

  // shouldComponentUpdate(nextProps: AppProps, nextState: AppState): boolean {
  //   console.log(`App shouldComponentUpdate : ${JSON.stringify(nextProps)}, ${JSON.stringify(nextState)}`);
  //   return true;
  // }

  // componentWillUpdate(nextProps: AppProps, nextState: AppState) {
  //   console.log(`App componentWillUpdate : ${JSON.stringify(nextProps)}, ${JSON.stringify(nextState)}`);
  // }

  // componentDidUpdate(prevProps: AppProps, prevState: AppState) {
  //   console.log(`App componentDidUpdate : ${JSON.stringify(prevProps)}, ${JSON.stringify(prevState)}`);
  // }
  
  render() {
    const store = this.context.store;
    const state = store.getState();
    // console.log('App render');
    return (
      
      // <div>
      //   <Parent {...this.state} />
      //   <button onClick={this._clickToGrandChild}>GrandChild 값 바꾸기</button>
      // </div>
        <Router>
          <div>
            <div>
            {state.age} 
            <button onClick={()=>{
              store.dispatch(addAge());
            }}>1년 뒤</button>
            </div>
            <nav>
              <ul>
                <li><NavLink exact activeStyle={ {fontSize:24}} to ="/">홈</NavLink></li>
                <li><NavLink exact activeStyle={ {fontSize:24}} to="/intro">인트로</NavLink></li>
              </ul>
            </nav>
            <Switch>
              <Route exact={true} path="/" component={Home} />
              <Route path='/intro' render={()=><h3>소개</h3>} />
              <Redirect from='/about' to ='/intro'/>
              <Route path='/posts' component={PostList}/>
              <Route path='/admin' component={Admin}/>
              <Route component={NotFound}/>
          </Switch>
          </div>
        </Router>
    );
  }
}
//   private _clickToGrandChild(): void {
//     this.setState({
//       toGrandChild: '그랜드 차일드 값 변경'
//     });
//   }
// }

// interface ParentProp {
//   toGrandChild: string;
// }

// const Parent: React.SFC<ParentProp> = (props) => {
//   return (
//     <div>
//       <p>여긴 Parent</p>
//       <Me {...props} />
//     </div>
//   );
// };

// interface MeProp {
//   toGrandChild: string;
// }

// const Me: React.SFC<MeProp> = (props) => {
//   return (
//     <div>
//       <p>여긴 Me</p>
//       <Child {...props} />
//     </div>
//   );
// };

// interface ChildProp {
//   toGrandChild: string;
// }

// const Child: React.SFC<ChildProp> = (props) => {
//   return (
//     <div>
//       <p>여긴 Child</p>
//       <GrandChild {...props} />
//     </div>
//   );
// };

// interface GrandChildProp {
//   toGrandChild: string;
// }

// const GrandChild: React.SFC<GrandChildProp> = (props) => {
//   return (
//     <div>
//       <p>여긴 GrandChild</p>
//       <h3>{props.toGrandChild}</h3>
//     </div>
//   );
// };

export default App;