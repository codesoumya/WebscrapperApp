import { Route, Routes } from "react-router-dom"
import HomeDetails from "../HomeDetails";

const PrivateRoutes = ()=>{

    return(<>
        <Routes>
          <Route path="*" element={<HomeDetails/>} />
        </Routes>
    </>)
}

export default PrivateRoutes;