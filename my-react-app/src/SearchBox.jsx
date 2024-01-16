import { GiDiceTarget } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
// 
import MiniCard from "./MiniCard.jsx";

function SearchBox() {
  const [selectedTab, setSelectedTab] = useState('Mob')
  const [input, setInput] = useState('')
  const [displayList, setDisplayList] = useState([])
  const [scrollY, setScrollY] = useState(0)

  const data = JSON.parse(localStorage.getItem("data"));
  // console.log(data)

  useEffect(() => {
    if(!data) return
    let max = scrollY <= 1000 ? 200 : 9999 

    let a = (selectedTab === "Mob") ? filterMob(input, max)
      : (selectedTab === "Item") ? filterItem(input, max)
        : alert('error')
    setDisplayList(() => a)
  }, [selectedTab, input, scrollY])

  // console.log(displayList)

  return (
    <div className="searchBox grid-item item-b">
      <div className="typeSelectBar">
        <div onClick={() => setSelectedTab('Mob')} className={`tab ${selectedTab === 'Mob' ? "selected" : ""}`}>MOB</div>
        <div onClick={() => setSelectedTab('Item')} className={`tab ${selectedTab === 'Item' ? "selected" : ""}`} >ITEM</div>
      </div>

      <div className="searchSelectBar">
        <GiDiceTarget />
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="search for..." />
        <div className="searchBtn"><FaSearch /> SEARCH</div>
      </div>

      <div id="searchBoxResult" onScroll={(e) => setScrollY(e.target.scrollTop)}>
        {displayList.map(x => <MiniCard key={x.id} data={x} />)}
      </div>
    </div>
  )
}


function filterMob(input, n) {
  const data = JSON.parse(localStorage.getItem("data"));
  if (!data) return
  // console.log(data)
  input = input.toLowerCase()
  const mobDataArr = Object.entries(data.data_MB)
    // .map(x => [...x, data.data_Mob[x[0]]])
    .map(x => [x[0], data.data_Mob[x[0]]])
    .filter(x => `${x[0]} ${x[1]}`.toLowerCase().includes(input))
    .map(x => {
      return {
        id: x[0],
        name: x[1],
        type: 'mob',
      }
    }).slice(0, n)
  // console.log(mobDataArr)
  return mobDataArr  // array of obj .eg. {id: '100100', name: 'Snail', type: 'mob'} , {}, {}....
}

function filterItem(input, n) {
  const data = JSON.parse(localStorage.getItem("data"));
  if (!data) return

  input = input.toLowerCase()
  const dropItemsList = Object.values(data.data_MB)
  const dropItemSet = new Set()
  dropItemsList.forEach(x => {
    x.forEach(y => dropItemSet.add(y)) // add all Item from MonsterBook, each as unique to Set
  })
  const dropIdNameArr = [...dropItemSet].map(x => [x, data.data_item[x]]) // each unique item : ["4000019", {name: "xxx" , desc: "xxx"}]}
    // .filter(x => x[0] !== undefined && x[1] !== undefined) // data cleansing (MUST), undefined in raw data
    .map(x => [x[0], x[1].name || x[1], x[1].desc || null])
    // .filter(x => (`${x[0]} ${x[1]}`).toLowerCase().includes(input)) // filter  ID & NAME
    .filter(x => (`${x[0]} ${x[1]} ${x[2]}`).toLowerCase().includes(input)) //  filter  ID & NAME & DESC
    .map(x => {
      return {
        id: x[0],
        name: x[1],
        desc: x[2] || null,
        type: 'item',
      }
    }).slice(0, n)
  //  consume/etc/Ins   {id: '4000019', name: 'Snail Shell', desc: 'Shell removed from a snail', type: 'item'}
  //  Eqp               {id: '1332029', name: 'Liu Bei Dagger', desc: null, type: 'item'}       
  // console.log(dropIdNameArr)
  return dropIdNameArr
}

export default SearchBox
