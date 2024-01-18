import { useContext, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// 
import { mobIdToImgUrl, itemIdToImgUrl, queryMaps } from '../myUtility.js'
import { TargetContext, SearchResultContext } from '../App.jsx';
import EqpUI from '../EqpUI/EqpUI.jsx';
import MiniCard from "../MiniCard/MiniCard.jsx";

import "./ResultBox.css";

function ResultBox() {
  const [selectedTab, setSelectedTab] = useState('DROPS')
  const { searchResult } = useContext(SearchResultContext)
  const { target } = useContext(TargetContext)

  const hasResult = Object.keys(searchResult).length >= 1
  const listType = hasResult && searchResult.type
  const isItemList = listType === "itemList"
  const isMobList = listType === "mobList"

  const hasTarget = Object.keys(target).length >= 1
  const isMob = hasTarget && target.type === 'mob'
  const mobMapList = isMob && queryMaps(target.id)

  // console.log(searchResult)
  // console.log({hasResult, listType, isItemList, isMobList})

  // return(<div className="resultBox grid-item item-d">im result box</div>)

  return (
    <>
      {hasResult && <>
        <h2 className='h5 m-2 ps-2 bg-light'>{target.name}</h2>
        <hr></hr>

        {/* Result of mob search */}
        {isItemList && < Tabs
          id="controlled-tab"
          activeKey={selectedTab}
          onSelect={value => setSelectedTab(value)}
          className="m-3 me-5 flex-grow-1 rounded"
        >
          <Tab eventKey="DROPS" title="DROPS" className="bg-light mx-1 rounded border border-2 border-danger">
            {/* display Result of Mob Drops List */}
            {searchResult.dropTable.map(x => <MiniCard key={x.id} data={x} />)}

          </Tab>

          <Tab eventKey="LOCATIONS" title="LOCATIONS" className="bg-light mx-1 rounded border border-2 border-danger ">
            {/* display Result of Mob Location List */}
            {isMob && mobMapList.map((x, i) => <a href={"https://bbb.hidden-street.net/map/mini-map/" + x.toLowerCase().replaceAll(/ :? */g, '-')}
              key={i}
              target="_blank"
              dangerouslySetInnerHTML={{ __html: x }}
              className='d-block p-1 ps-3 m-1 '
            ></a>)}
          </Tab>
        </Tabs>}

        {/* Result of item search */}
        {isMobList && < Tabs
          id="controlled-tab2"
          activeKey="DROPPED BY"
          className="m-3 me-5 flex-grow-1 rounded"
        >
          <Tab eventKey="DROPPED BY" title="DROPPED BY" className="bg-light mx-1 rounded border border-2 border-danger">
            {/* display Result of Item dropped by List */}
            {searchResult.dropTable.map(x => <MiniCard key={x.id} data={x} />)}
          </Tab>
        </Tabs>}

      </>}
    </>
  )
}


function ItemCard({ data, handleItemIconClick }) {
  // console.log(data)

  const { setTarget } = useContext(TargetContext);

  let strArr = [data.desc]
  if (data.desc) {
    strArr = data.desc.split("\\n")
  }

  return (
    <div className="card">
      <div className="left">
        <img src={itemIdToImgUrl(data.id)}
          alt="No image found"
          onClick={() => handleIconClick(data, 'item', setTarget)}
        ></img>
        <EqpUI location={"inDisplayList"} data={data} />
      </div>
      <div className="right">
        <h3>{data.name}</h3>
        {strArr.map((x, i) => <p key={i} dangerouslySetInnerHTML={{ __html: x }}></p>)}
      </div>
    </div>
  )
}

function MobCard({ data, handleItemIconClick }) {
  // console.log(data)
  const { setTarget } = useContext(TargetContext);

  return (
    <div className="card">
      <div className="left">
        <img src={mobIdToImgUrl(data.id)}
          alt="No image found"
          onClick={() => handleIconClick(data, 'mob', setTarget)}
        ></img>
      </div>
      <div className="right">
        <h3>{data.name}</h3>
      </div>
    </div>
  )
}

function handleIconClick(data, type, setTarget) {
  setTarget({ id: data.id, name: data.name, desc: data.desc, type })
}

export default ResultBox
