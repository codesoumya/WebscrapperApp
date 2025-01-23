import { Route, Routes } from "react-router-dom"
import LoginPage from "../LoginPage"
import Signup from "../Signup"

const PublicRoutes = ()=>{

    return(<>
        <Routes>
          <Route path="*" element={<LoginPage/>} />
          <Route path="/sign-up" element={<Signup/>} />
        </Routes>
    </>)
}

export default PublicRoutes;