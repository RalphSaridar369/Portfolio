import Contact from "./components/contact/Contact";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <Header />
        <div className="body-wrapper">
          <Contact />
        </div>
    </div>
  );
}

export default App;
