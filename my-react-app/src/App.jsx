import { useState, useEffect, createContext, useMemo } from 'react'

import Header from './Header.jsx'
import SearchBox from './SearchBox.jsx'
import TargetBox from './TargetBox.jsx'
import ResultBox from './ResultBox.jsx'
import ControlPanel from './ControlPanel/ControlPanel.jsx'
// 
import data_MB from '../data/data_MB.json'
import data_Mob from '../data/data_Mob.json'
import data_Consume from '../data/data_Consume.json'
import data_Eqp from '../data/data_Eqp.json'
import data_Etc from '../data/data_Etc.json'
import data_Ins from '../data/data_Ins.json'
import data_MobMap from '../data/data_Mob_MapOnly.json'
import data_Map from '../data/data_Map.json'
import data_GearStats from '../data/data_GearStats.json'
import data_MobStats from '../data/data_MobStats.json'


export const TargetContext = createContext(null)
export const SearchResultContext = createContext(null)
let data = {}

function App() {

  const [target, setTarget] = useState({})
  const [searchResult, setSearchResult] = useState({})

  useEffect(() => {
    const data_item = { ...data_Consume, ...data_Eqp, ...data_Etc, ...data_Ins }
    data = { data_MB, data_Mob, data_item, data_MobMap, data_Map, data_GearStats, data_MobStats }

    localStorage.setItem("data", JSON.stringify(data));
  }, []);

  return (
    <div id="container" className='grid-container'>
      <TargetContext.Provider value={{ target, setTarget }}>
        <SearchResultContext.Provider value={{ searchResult, setSearchResult }}>
          <Header />
          <SearchBox />
          <TargetBox />
          <ResultBox />
          <ControlPanel />
        </SearchResultContext.Provider>
      </TargetContext.Provider>
    </div>
  )
}

export default App
