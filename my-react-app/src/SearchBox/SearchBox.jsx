import { GiDiceTarget } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState, useContext } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';

// 
import MiniCard from "../MiniCard/MiniCard.jsx";
import { TargetContext } from '../App.jsx';
import "./SearchBox.css"; // abandon Grid first. see how first

function SearchBox() {
  const [selectedTab, setSelectedTab] = useState('Mob')
  const [input, setInput] = useState('')
  const [pageNum, setPageNum] = useState(1)
  const [displayList, setDisplayList] = useState([])
  const { setTarget } = useContext(TargetContext);

  const CARDS_PER_PAGE = 5
  const cardStartIndex = (pageNum - 1) * CARDS_PER_PAGE
  const cardEndIndex = cardStartIndex + CARDS_PER_PAGE
  const reachedLastPage = pageNum === Math.min(pageNum + 1, Math.ceil(displayList.length / CARDS_PER_PAGE))

  useEffect(() => {
    // let data = 
    // if(!data) return
    let a = (selectedTab === "Mob") ? filterMob(input)
      : (selectedTab === "Item") ? filterItem(input)
        : alert('error')
    setPageNum(1)
    setDisplayList(() => a)
  }, [selectedTab, input])

  const handlePaginationClick = (action) => {
    if (action === 'prev') {
      let nextNumber = Math.max(1, pageNum - 1)
      setPageNum(nextNumber)
    }
    if (action === 'next') {
      let nextNumber = Math.min(pageNum + 1, Math.ceil(displayList.length / CARDS_PER_PAGE))
      setPageNum(nextNumber)
    }
  }
  // console.log(displayList)

  return (
    <div className="d-flex flex-column m-0 p-0 h-100 bg-primary">
      <div className="flex-grow-1">
        <Tabs
          id="controlled-tab"
          activeKey={selectedTab}
          onSelect={value => setSelectedTab(value)}
          className="m-3 me-5"
        >
          <Tab eventKey="Mob" title="Mob" className="bg-light mx-1">
            {/* Search Select, input Bar */}
            <div className="d-flex px-3 justify-content-between align-items-center">
              <GiDiceTarget className="col-1 display-1 text-danger py-0 my-0" onClick={() => randomSearch(selectedTab, setTarget)} />
              <input className="col-6 border rounded py-1" value={input} onChange={e => setInput(e.target.value)} placeholder="search for..." />
              <Button className="d-flex col-4 fs-6 py-1 p-1 m-0 text-light text-nowrap justify-content-center a align-items-center column-gap-1" variant="warning">
                <FaSearch className="fs-6" /> Search</Button>
            </div>

            {/* display Result of Mob List */}
            <p className="m-0 p-0 text-end">{`found ${displayList.length} record${displayList.length <= 1 ? '' : 's'}`}</p>
            <div className="">
              {displayList.slice(cardStartIndex, cardEndIndex).map(x => <MiniCard key={x.id} data={x} />)}
            </div>

          </Tab>
          <Tab eventKey="Item" title="Item" className="bg-light mx-1">
            {/* Search Select, input Bar */}
            <div className="d-flex px-3 justify-content-between align-items-center">
              <GiDiceTarget className="col-1 display-1 text-danger" onClick={() => randomSearch(selectedTab, setTarget)} />
              <input className="col-6 border rounded py-1" value={input} onChange={e => setInput(e.target.value)} placeholder="search for..." />
              <Button className="d-flex col-4 fs-6 py-1 p-1 m-0 text-light text-nowrap justify-content-center a align-items-center column-gap-1" variant="warning">
                <FaSearch className="fs-6" /> Search</Button>
            </div>


            {/* display Result of Mob List */}
            <p className="m-0 p-0 text-end">{`found ${displayList.length} record${displayList.length <= 1 ? '' : 's'}`}</p>
            <div className="">
              {displayList.slice(cardStartIndex, cardEndIndex).map(x => <MiniCard key={x.id} data={x} />)}
            </div>
          </Tab>
        </Tabs>
      </div>

      {/* Pagination */}
      <Pagination className="m-2 justify-content-end">
        <Pagination.Prev onClick={() => handlePaginationClick('prev')} disabled={pageNum === 1} />
        <Pagination.Next onClick={() => handlePaginationClick('next')} disabled={reachedLastPage} />
      </Pagination>
    </div>
  )
}


function filterMob(input) {
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
    })
  // console.log(mobDataArr)
  return mobDataArr  // array of obj .eg. {id: '100100', name: 'Snail', type: 'mob'} , {}, {}....
}

function filterItem(input) {
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
    })
  //  consume/etc/Ins   {id: '4000019', name: 'Snail Shell', desc: 'Shell removed from a snail', type: 'item'}
  //  Eqp               {id: '1332029', name: 'Liu Bei Dagger', desc: null, type: 'item'}       
  // console.log(dropIdNameArr)
  return dropIdNameArr
}


function randomSearch(selectedTab, setTarget) {
  console.log('doing random search')
  const data = JSON.parse(localStorage.getItem("data"));
  if (!data) return

  if (selectedTab === 'Mob') {
    const randomId = [...Object.keys(data.data_MB)].sort(() => Math.random() - 0.5).pop()
    setTarget({
      id: randomId,
      name: data.data_Mob[randomId],
      type: 'mob',
    })
  } else if (selectedTab === 'Item') {
    const dropItemSet = new Set()
    Object.values(data.data_MB).forEach(x => { x.forEach(y => dropItemSet.add(y)) })
    const randomId = [...dropItemSet].sort(() => Math.random() - 0.5).pop()
    setTarget({
      id: randomId,
      name: data.data_item[randomId].name || data.data_item[randomId],
      desc: data.data_item[randomId].desc || null,
      type: 'item',
    })
  }
}

export default SearchBox
