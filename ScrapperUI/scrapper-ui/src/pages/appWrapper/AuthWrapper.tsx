import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/rootReducer"
import PublicRoutes from "./PublicRoutes"
import PrivateRoutes from "./PrivateRoutes"
import { useEffect } from "react"

const AuthWrapper = (): JSX.Element=>{
    const auth = useSelector((state: RootState)=> state.auth)
    const dispatch = useDispatch()
    useEffect(()=>{
        const auth = localStorage.getItem('auth');
        dispatch({
            type: "SET_AUTH_DETAILS",
            payload: {
                authDetails: JSON.parse(auth ?? '{}')
            }
          })
    },[])
    if(auth.isAuthenticated){
        return <><PrivateRoutes/></>
    }
    return <><PublicRoutes/></>
}

export default AuthWrapper;