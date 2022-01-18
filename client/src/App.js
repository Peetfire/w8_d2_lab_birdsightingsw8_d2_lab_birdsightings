import { useState, useEffect } from "react";

import './App.css';

import SightingsForm from "./components/SightingsForm";
import SightingsGrid from "./components/SightingsGrid";
import {getSightings, deleteSighting as apiRemoveSighting} from "./services/SightingService";
import {addSighting} from "./services/SightingService";

function App() {

  const [birdSightings, setBirdSightings] = useState([]);

  useEffect(()=>{
    getSightings().then((allSightings)=>{
      setBirdSightings(allSightings);
    })
  }, []);

  const addSighting = (sighting) =>{
    const temp = birdSightings.map(s =>s);
    temp.push(sighting);
    setBirdSightings(temp);
  }

  const removeSighting = (id) => {
    apiRemoveSighting(id).then(() => {
      const temp = birdSightings.map(s =>s);
      const indexToDel = temp.map(s => s._id).indexOf(id);
      console.log(indexToDel);

      temp.splice(indexToDel, 1);
      setBirdSightings(temp);
    })
  }

  return (
    <>
      <SightingsForm addSighting={addSighting}/>
      <SightingsGrid sightings={birdSightings} removeSighting={removeSighting} />
    </>
  );
}

export default App;
