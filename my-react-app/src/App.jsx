import { useState, useEffect, createContext, useMemo } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// 

import Header from './Header/Header.jsx'
import SearchBox from './SearchBox/SearchBox.jsx'
import TargetBox from './TargetBox/TargetBox.jsx'
import ResultBox from './ResultBox/ResultBox.jsx'
// 
import data_MB from '../data/data_MB.json'
import data_Mob from '../data/data_Mob.json'
import data_Consume from '../data/data_Consume.json'
import data_Eqp from '../data/data_Eqp.json'
import data_Etc from '../data/data_Etc.json'
import data_Ins from '../data/data_Ins.json'
import data_MobMap from '../data/data_Mob_MapOnly.json'
import data_Map from '../data/data_Map.json'

export const TargetContext = createContext(null)
export const SearchResultContext = createContext(null)
let data = {}

function App() {
  const [target, setTarget] = useState({})
  const [searchResult, setSearchResult] = useState({})

  const hasTarget = Object.keys(target).length >= 1
  const hasSearchResult = Object.keys(target).length >= 1

  useEffect(() => {
    const data_item = { ...data_Consume, ...data_Eqp, ...data_Etc, ...data_Ins }
    data = { data_MB, data_Mob, data_item, data_MobMap, data_Map }

    localStorage.setItem("data", JSON.stringify(data));
  }, []);

  return (
    // <div id="container" className='grid-container'>
    <TargetContext.Provider value={{ target, setTarget }}>
      <SearchResultContext.Provider value={{ searchResult, setSearchResult }}>
        <Container fluid className='mt-5 '>
          <Row className='justify-content-center'>
            <Col sm={4} className='m-1 bg-primary p-0 rounded'>   <SearchBox />    </Col>
            <Col sm={4} className='m-1 bg-primary p-0 rounded'>  <Header /> </Col>
          </Row>
          <Row className='justify-content-center'>
            {hasTarget && <TargetBox />} 
            <Col sm={8} className='m-1 bg-primary rounded'>   {hasSearchResult && <ResultBox />}   </Col>
          </Row>
        </Container>
      </SearchResultContext.Provider>
    </TargetContext.Provider>
    // {/* </div> */ }
  )
}

export default App
