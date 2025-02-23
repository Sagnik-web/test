import Navber from "./component/Navber"
import {Switch,BrowserRouter, Route} from 'react-router-dom'
import Post from "./pages/Post/Post"
import Signup from "./pages/signup/Signup"
import Login from "./pages/Login/Login"
import CreatePost from "./pages/CreatePost/CreatePost"
import { ToastContainer } from 'react-toastify';

function App() {


  return (
    <>
      <BrowserRouter>
        <ToastContainer/>
        <Navber/>
        <Switch>
            <Route path="/" exact><Post/></Route>
            <Route path="/signup"><Signup/></Route>
            <Route path="/login"><Login/></Route>  
            <Route path="/create"><CreatePost/></Route>  
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
