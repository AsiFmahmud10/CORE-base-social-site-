import { BrowserRouter,Route,Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './Home';
import PostDetails from './PostDetails';
import PostInput from './Postinput';
import Profile from './Profile';
import AuthRoute from './AuthRoute'
function App() {
  return (
    <BrowserRouter>

    <div className="app">
            <Navbar/>
         <Switch>
                <Route  exact path='/'>
                        <Home/>
                </Route>
                
                 <AuthRoute path='/addPost' component={PostInput} exact />
                 <AuthRoute path='/profile' component={Profile} exact />
                
                <Route path='/postDetails/:PostId'  exact>
                      <PostDetails/>
                </Route>
               
                 
         </Switch>
         
    </div>
    </BrowserRouter>
  );
}

export default App;
