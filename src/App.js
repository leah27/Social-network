import React from 'react'
import './App.css';
import Nav from './components/Nav/Nav';
//import News from './components/News/News';
//import Music from './components/Music/Music';
//import Settings from './components/Settings/Settings';
//import DialogsContainer from './components/Dialogs/DialogsContainer';
//import UsersContainer from './components/Users/UsersContainer'
import { BrowserRouter, Route } from 'react-router-dom';
//import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
//import Login from './components/Login/Login'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Redirect, Switch } from 'react-router';
import { initializeApp } from './redux/appReducer';
import Preloader from './components/Common/Preloader/Preloader';
import store from './redux/redux-store';
import { Provider } from 'react-redux';
const News = React.lazy(() => import('./components/News/News'))
const Music = React.lazy(() => import('./components/Music/Music'))
const Settings = React.lazy(() => import('./components/Settings/Settings'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const Login = React.lazy(() => import('./components/Login/Login'))

class App extends React.Component {
  catchAllUnhandledErrors = (reason, promise) => {
    alert("Some error occured");
    //console.log(promiseRejectionEvent);
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.promiseRejectionEvent);
  }
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.promiseRejectionEvent);
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (

      <div className='app-wrapper'>
        <HeaderContainer />
        <Nav />
        <div className='content'>
          <React.Suspense fallback={<Preloader />}>
            <Switch>
              <Route path='/' exact><Redirect to='/profile' /></Route>
              <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
              <Route path='/dialogs' render={() => <DialogsContainer />} />
              <Route path='/users' render={() => <UsersContainer pageTitle={"Samurai"} />} />
              <Route path='/news' render={() => <News />} />
              <Route path='/music' render={() => <Music />} />
              <Route path='/settings' render={() => <Settings />} />
              <Route path='/login' render={() => <Login />} />
              <Route path='*' render={() => <div>404 NOT FOUND</div>} />
            </Switch>
          </React.Suspense>
        </div>

      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

const MainApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer
      // state={store.getState()} dispatch={store.dispatch.bind(store)} store={store}
      />
    </Provider>
  </BrowserRouter>
}

export default MainApp;