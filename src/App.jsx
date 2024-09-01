import "./App.css";
import Navbar from "./components/navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-[81.76vh]">
        <Manager />
      </div>
      <Footer />
    </>
  );
}

export default App;
