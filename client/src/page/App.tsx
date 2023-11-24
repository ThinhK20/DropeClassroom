import { User } from "../models/User";
import Home from "./home/home";

function App() {

  const user: User = {
    fullName: "Minh An",
  };

  return <Home />;
}

export default App;
