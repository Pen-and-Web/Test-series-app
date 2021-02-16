import './App.css';
import Register from './components/register';
import Navbar from './components/common/navbar';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/common/login';
import Home from './components/home';
import Test from './components/Test';
import Profile from './components/profile';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './App/reducer';
import { createStore, applyMiddleware } from 'redux';
import { initialState } from './App/reducer';
import createSagaMiddleware from 'redux-saga';
import { ProductProvider } from './context';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(sagaMiddleware),
);
// const store = createStore(reducer, initialState);
function App() {
  return (
    <ProductProvider>
      <div className="App">
        {/* <Provider store={store}> */}

        <Navbar />
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/test" component={Test} />
          <Route path="/logout" component={Login} />
          <Route path="/profile" component={Profile} />
        </Switch>
        {/* </Provider> */}
      </div>
    </ProductProvider>
  );
}

export default App;
