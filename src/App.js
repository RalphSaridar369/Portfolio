import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Team from "./components/team/Team";

function App() {
  return (
    <div className="App">
      <Header />
        <div className="body-wrapper">
          <About />
          <Team />
        </div>
          <Footer />
    </div>
  );
}

export default App;
