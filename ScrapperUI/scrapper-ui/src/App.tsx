import { Provider } from "react-redux"
import store from "./redux/store"
import AuthWrapper from "./pages/appWrapper/AuthWrapper"
import { BrowserRouter as Router } from "react-router-dom"

function App() {
  return (
    <Provider store={store}>
      <Router>
      <AuthWrapper/>
      </Router>
    </Provider>
  )
}

export default App
