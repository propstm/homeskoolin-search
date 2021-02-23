import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SearchBar inputValue="racecar"/>
        <SearchResultSet />
      </header>
    </div>
  );
}

function SearchBar(props) {
  // TODO NEED TO SETUP ONCHANGE AND STATE
  return (
    <div class="searchBar">
      <label htmlFor="search">Search Query:</label>
      <input type="text" value={props.inputValue} onChange={(e) => {}} />
    </div>
  );
}

function SearchResultSet(props) {
  //TODO MAKE ThiS COME FROM THE PROPS
  let results = [
    {
      "content": "result item1",
      "mins": "1",
      "seconds": "33"
    },
    {
      "content": "result item2",
      "mins": "8",
      "seconds": "36"
    },
    {
      "content": "result item2",
      "mins": "13",
      "seconds":"00"
    },

  ]
  return (
    <div class="searchBar">
      <ul>
      {results.map(result => (
        <SearchResult content={result.content} minutes={result.mins} seconds={result.seconds} />
      ))}
      </ul>
    </div>
  );
}

function SearchResult(props) {
  return (
    <li>
       <p>"{props.content} @ {props.minutes}:{props.seconds}"</p>
    </li>
  );
}

export default App;
