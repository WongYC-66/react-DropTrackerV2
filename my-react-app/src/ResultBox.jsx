import { useContext, useEffect } from 'react'
import { mobIdToImgUrl, itemIdToImgUrl } from './myUtility.js'
import { SearchResultContext } from './App.jsx';
import EqpUI from './EqpUI/EqpUI.jsx';

function ResultBox() {
  const { searchResult } = useContext(SearchResultContext)
  const hasResult = Object.keys(searchResult).length >= 1
  const listType = hasResult && searchResult.type
  const isItemList = listType === "itemList"
  const isMobList = listType === "mobList"

  // console.log(searchResult)
  return (
    <div className="resultBox grid-item item-d">
      {hasResult && <>
        <div className='dropOrDroppedByBar'>
          <div className={`tab ${isItemList && "selected"}`}>DROP</div>
          <div className={`tab ${isMobList && "selected"}`}>DROPPED BY</div>
        </div>
        <div className='display'>
          {isItemList && <>
            {searchResult.dropTable.map(x => <ItemCard key={x.id} data={x} />)}
            {searchResult.dropTable.length <= 0 && <h3>This mob doesn't drop anything : (</h3>}
          </>}
          {isMobList && <>
            {searchResult.dropTable.map(x => <MobCard key={x.id} data={x} />)}
            {searchResult.dropTable.length <= 0 && <h3>This mob doesn't drop anything : (</h3>}
          </>}
        </div>
      </>}
    </div>
  )
}

function ItemCard({ data, handleItemIconClick }) {
  // console.log(data)
  let strArr = [data.desc]
  if (data.desc) {
    strArr = data.desc.split("\\n")
  }
  return (
    <div className="card">
      <div className="left">
        <img src={itemIdToImgUrl(data.id)}
          alt="No image found"
          onClick={() => handleItemIconClick(data.id)}
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
  // return 
  return (
    <div className="card">
      <div className="left">
        <img src={mobIdToImgUrl(data.id)}
          alt="No image found"
          onClick={() => handleItemIconClick(data.id)}
        ></img>
      </div>
      <div className="right">
        <h3>{data.name}</h3>
      </div>
    </div>
  )
}

export default ResultBox
