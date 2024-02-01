import { useState, useEffect, createContext } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// 
import MyContainer from './Container/MyContainer.jsx';
import Header from './Header/Header.jsx'
import SearchBox from './SearchBox/SearchBox.jsx'
import TargetBox from './TargetBox/TargetBox.jsx'
import ResultBox from './ResultBox/ResultBox.jsx'
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
export const ColorThemeContext = createContext(null)
let data = {}

function App() {
  const [target, setTarget] = useState({})
  const [searchResult, setSearchResult] = useState({})
  const [colorTheme, setColorTheme] = useState("default")

  const hasTarget = Object.keys(target).length >= 1
  const hasSearchResult = Object.keys(target).length >= 1

  useEffect(() => {
    const data_item = { ...data_Consume, ...data_Eqp, ...data_Etc, ...data_Ins }
    data = { data_MB, data_Mob, data_item, data_MobMap, data_Map, data_GearStats, data_MobStats }

    localStorage.setItem("data", JSON.stringify(data));
  }, []);

  // console.log(target)

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      <TargetContext.Provider value={{ target, setTarget }}>
        <SearchResultContext.Provider value={{ searchResult, setSearchResult }}>
            <Container fluid className='mt-5 '>
              <Row className='justify-content-center'>
                <Col sm={4} className='m-1 p-0'>   <MyContainer content={<SearchBox />} />   </Col>
                <Col sm={4} className='m-1 p-0'>   <MyContainer content={<Header />} />   </Col>
              </Row>
              <Row className='justify-content-center'>
                {hasTarget && <TargetBox />}
                <Col sm={8} className='m-1 p-0'>   {hasSearchResult && <MyContainer content={<ResultBox />} />}   </Col>
              </Row>
            </Container>
            <ControlPanel />
        </SearchResultContext.Provider>
      </TargetContext.Provider>
    </ColorThemeContext.Provider>
  )
}

export default App
