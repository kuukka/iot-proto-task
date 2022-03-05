import {Routes, Route} from "react-router-dom";

import App from './App';
import Test1 from './Pages/Test1';
import Test2 from './Pages/Test2';
import Login from './Pages/Login';

import useToken from './Auth/useToken';

const Router = () => {
    
    const {token, setToken} = useToken();

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/link" element={<Test1/>} />
            <Route path="/action" element={<Test2/>} />
        </Routes>
    )
}

export default Router;