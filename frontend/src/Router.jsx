import {Routes, Route, useLocation, Navigate} from "react-router-dom";

import Home from './Pages/Home';
import Devices from './Pages/Devices';
import Test2 from './Pages/Test2';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import useToken from './Auth/useToken';
import useUsername from './Auth/useUsername';
import './App.css';

const Router = () => {
    const location = useLocation();
    const {token, setToken} = useToken();
    const {setUsername} = useUsername();

    if(location.pathname === '/logout') {
        if(token) {
            setToken("");
        }
    } else if(!token && location.pathname !== "/signup" ) {
        return <Login setToken={setToken} setUsername={setUsername} />
    }

    return (
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/signup" element={            
                token 
                    ? <Navigate  to="/" />
                    : <Signup setToken={setToken} setUsername={setUsername} />
            }/>        
            <Route path="/devices" element={<Devices/>}>
                <Route path=":device" element={<Devices/>} />                
            </Route>
            <Route path="/action" element={<Test2/>} />
            <Route path="/logout" element={<Navigate to="/" />} /> 
        </Routes>
    )
}

export default Router;