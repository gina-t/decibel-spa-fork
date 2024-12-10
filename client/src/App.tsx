import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;