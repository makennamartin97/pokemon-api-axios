import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [pokelist, setpokelist] = useState([]);
  const [search, setsearch] = useState("");
  const [display, setdisplay] = useState([]);
  const [details, setdetails] = useState({name: "Select a Pokemon!", sprites: []});

  const getpokemon = e => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000")
      .then(response => {
        setpokelist(response.data.results);
        setdisplay(response.data.results);
        //console.log(response.data.results);
        //setpokelist(response.data.results);
        //return response.json();
    })
    .catch(err => console.log(err));
  }
  const getdetails = poke => {
    axios.get(poke.url)
    //console.log(poke);
      .then(response => {
        console.log(response.data)
        setdetails(response.data)
      })
      .catch(err => console.log(err));
  }

  useEffect( () => {
    getpokemon();
  }, []);

  useEffect( () => {
    setdisplay(pokelist.filter(a => a.name.includes(search)))
  }, [search]);

  return (
    <div className="container-fluid">
      <div className="jumbotron"></div>
        {/*<button className="btn btn-primary btn-lg " onClick={getpokemon}>Fetch Pokemon</button>*/}
        <div className="row ml-4">
          <div className="col-sm-8">
            <div className="form-group">
              <label forHtml="searchpoke" className="text-dark lead mt-3">Search here or click a Pokemon below:</label>
              <input type="text" name="searchpoke" className="form-control " onChange={e => setsearch(e.target.value)}/>
            </div>

            <ul className="list-group text-center text-primary mt-5">
              { display.map((poke, i) => 
                <li key={i} className="list-group-item" onClick={e => getdetails(poke)}>{poke.name}</li>
        
              )}
            </ul>
          </div>
          <div className="col-sm-4">
            <div className="card ml-5 mt-5">
              <div className="card-header bg-primary text-light lead text-center">{details.name}</div>
              <div className="card-body">
                <img src={details.sprites.front_default} style={{width:"288px", imageRendering:"pixelated"}} />

              </div>
            </div>



          </div>
        </div>
      </div>

      
 
  );
}

export default App;