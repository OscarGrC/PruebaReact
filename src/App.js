import './App.css';
import UnitConverter from './components/unit_converter/UnitConverter';
import Header from './components/header/Header';
import SavedList from './components/savedList/SavedList';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div className="content">
        <UnitConverter />
        <SavedList />
      </div>
      <div className="footer-content">
        <Footer />
      </div>
    </div>
  );
}
export default App;