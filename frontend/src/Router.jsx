import {Routes, Route, useLocation, Navigate} from "react-router-dom";

import App from './App';
import Test1 from './Pages/Test1';
import Test2 from './Pages/Test2';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

import useToken from './Auth/useToken';

const Router = () => {
    const location = useLocation();
    const {token, setToken} = useToken();

    if(!token && location.pathname !== "/signup") {
        return <Login setToken={setToken} />
    }

    return (
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/signup" element={            
                token ? <Navigate  to="/" /> : <Signup setToken={setToken}/>            
            }/>        
            <Route path="/link" element={<Test1/>} />
            <Route path="/action" element={<Test2/>} />
        </Routes>
    )
}

export default Router;