import { useContext, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// 
import { TargetContext, SearchResultContext } from '../App.jsx';
import MiniCard from "../MiniCard/MiniCard.jsx";
import MobMapListCard from "../MobStatsCard/MobMapListCard.jsx";

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
      {hasResult &&
        <div>
          <h2 className='h5 bg-light m-2 p-2 border border-2 border-maple-border-1 rounded-2'>{target.name}</h2>
          {/* Result of mob search */}
          <div className='m-0 p-0 border-top border-2 border-maple-border-1'></div>

          {isItemList && < Tabs
            id="controlled-tab"
            activeKey={selectedTab}
            onSelect={value => setSelectedTab(value)}
            className="ms-4 mt-3 me-5 border-bottom-0 column-gap-1">

            <Tab eventKey="DROPS" title="DROPS" className="bg-light mx-1 border border-3 border-maple-pink rounded">
              {/* display Result of Mob Drops List */}
              {searchResult.dropTable.map(x => <MiniCard key={x.id} data={x} />)}
            </Tab>

            <Tab eventKey="LOCATIONS" title="LOCATIONS" className="bg-light mx-1 border border-3 border-maple-pink rounded">
              {/* display Result of Mob Location List */}
              {isMob && <MobMapListCard data={target} />}
            </Tab>
          </Tabs>}

          {/* Result of item search */}
          {isMobList && < Tabs
            id="controlled-tab2"
            activeKey="DROPPED BY"
            className="ms-4 mt-3 me-5 border-bottom-0 column-gap-1">

            <Tab eventKey="DROPPED BY" title="DROPPED BY" className="bg-light mx-1 border border-3 border-maple-pink rounded">
              {/* display Result of Item dropped by List */}
              {searchResult.dropTable.map(x => <MiniCard key={x.id} data={x} />)}
            </Tab>
          </Tabs>}

        </div>
      }
    </>
  )
}

export default ResultBox
