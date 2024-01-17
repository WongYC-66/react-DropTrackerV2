import { useContext, useEffect, useState } from 'react'
// 
import EqpUI from './EqpUI/EqpUI.jsx'
import MobStatsCard from './MobStatsCard.jsx'
import { TargetContext, SearchResultContext } from './App.jsx';
import { mobIdToImgUrl, itemIdToImgUrl, queryMaps, queryMobs, queryItems } from './myUtility.js'

function TargetBox() {
  const [showMobDetail, setShowMobDetail] = useState(false)
  const { target } = useContext(TargetContext)
  const { searchResult, setSearchResult } = useContext(SearchResultContext)
  // console.log(target)

  const hasTarget = Object.keys(target).length >= 1
  const isMob = hasTarget && target.type === 'mob'
  const isItem = hasTarget && target.type === 'item'
  const isEquip = isItem && !target.desc

  const imgLink = !hasTarget
    ? ""
    : target.type === 'mob' ?
      mobIdToImgUrl(target.id)
      : target.type === 'item' ?
        itemIdToImgUrl(target.id) :
        ""

  let strArr = [] //for \n of item desc
  if (isItem && !isEquip) {
    strArr = target.desc.split("\\n") // format string
  }
  const mobMapList = isMob && queryMaps(target.id)

  const handleMobImgClick = () => {
    setShowMobDetail(() => !showMobDetail)
  }

  useEffect(() => {
    if (isMob) queryMobs(target.id, setSearchResult)
    else if (isItem) queryItems(target.id, setSearchResult)
  }, [target])

  // console.log(searchResult)


  return (
    <div className="targetBox grid-item item-c">
      {isMob && <>
        <div className='top'>
          <h1>{target.name}</h1>
          <img src={imgLink} alt="no image found" onClick={handleMobImgClick}></img>
          {true && <MobStatsCard data={target} />}
        </div>
        
        {showMobDetail && <div className='mapList'>
          {mobMapList.map((x, i) => <a href={"https://bbb.hidden-street.net/map/mini-map/" + x.toLowerCase().replaceAll(/ :? */g, '-')}
            key={i}
            target="_blank"
            dangerouslySetInnerHTML={{ __html: x }}></a>)}
        </div>}
        

      </>}
      {!isItem ? <></>
        : isEquip ? <EqpUI data={target} />
          : <>
            <div className='top'>
              <h1>{target.name}</h1>
              {strArr.map((x, i) => <p key={i} dangerouslySetInnerHTML={{ __html: x }}></p>)}
              <img src={imgLink} alt="no image found"></img>
            </div>
          </>}

      {!hasTarget && <>
        <img src="./errorMushroom.png"></img>
      </>}

    </div>
  )
}



export default TargetBox
