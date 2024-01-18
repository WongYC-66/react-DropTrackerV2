import { useContext, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// 
import { TargetContext, SearchResultContext } from '../App.jsx';
import MiniCard from "../MiniCard/MiniCard.jsx";
import MobMapListCard from "../MobStatsCard/MobMapListCard.jsx";
import "./ResultBox.css";

function ResultBox() {
  const [selectedTab, setSelectedTab] = useState('DROPS')
  const { searchResult } = useContext(SearchResultContext)
  const { target } = useContext(TargetContext)

  const hasResult = Object.keys(searchResult).length >= 1
  const listType = hasResult && searchResult.type
  const isMob = hasResult && target.type === 'mob'
  const isItemList = listType === "itemList"
  const isMobList = listType === "mobList"

  return (
    <>
      {hasResult && <div id="resultBox">
        <h2 className='h5 m-2 ps-2 bg-light rounded'>{target.name}</h2>
        <hr></hr>

        {/* Result of mob search */}
        {isItemList && < Tabs
          id="controlled-tab"
          activeKey={selectedTab}
          onSelect={value => setSelectedTab(value)}
          className="m-3 me-5 flex-grow-1 rounded">

          <Tab eventKey="DROPS" title="DROPS" className="bg-light mb-1 mx-1 rounded border border-2">
            {/* display Result of Mob Drops List */}
            {searchResult.dropTable.map(x => <MiniCard key={x.id} data={x} />)}
          </Tab>

          <Tab eventKey="LOCATIONS" title="LOCATIONS" className="bg-light mb-1 mx-1 rounded border border-2">
            {/* display Result of Mob Location List */}
            {isMob && <MobMapListCard data={target} />}
          </Tab>
        </Tabs>}

        {/* Result of item search */}
        {isMobList && < Tabs
          id="controlled-tab2"
          activeKey="DROPPED BY"
          className="m-3 me-5 flex-grow-1 rounded">

          <Tab eventKey="DROPPED BY" title="DROPPED BY" className="bg-light mb-1 mx-1 rounded border border-2">
            {/* display Result of Item dropped by List */}
            {searchResult.dropTable.map(x => <MiniCard key={x.id} data={x} />)}
          </Tab>
        </Tabs>}

      </div>}
    </>
  )
}

export default ResultBox
