import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import Progress from "./pages/Progress/Progress";
import Register from "./pages/Register/Register";
import SignIn from "./pages/SignIn/SignIn";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/signin" component={SignIn} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/progress" component={Progress} />
      </BrowserRouter>
    </div>
  );
}

export default App;
