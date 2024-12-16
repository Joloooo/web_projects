import './App.css';
import Navbar from './components/navbar/Navbar'
import Main from './components/main/Main'
import Processing from './components/processing/Processing';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Main/>
      <Processing/>
    </div>
  );
}

export default App;
