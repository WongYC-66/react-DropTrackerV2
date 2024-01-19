import { useContext } from 'react'
import Card from 'react-bootstrap/Card';
// 
import EqpUI from '../EqpUI/EqpUI.jsx'
import MobStatsCard from '../MobStatsCard/MobStatsCard.jsx'
import { TargetContext } from '../App.jsx';
import { mobIdToImgUrl, itemIdToImgUrl } from '../myUtility.js'

function TargetBox() {
  const { target } = useContext(TargetContext)
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

  // console.log(searchResult)

  return (
    <div className="p-0 m-0">
      {isMob && <>
        <Card className='bg-light border-0 p-0 m-0'>
          <Card.Img variant="top" src={imgLink} alt="no image found" className='d-block w-50 mw-50 mx-auto my-1' />
          <Card.Body className='p-0'>
            <Card.Title className='display-3 fs-2 fw-medium p-0 text-center'>{target.name}</Card.Title>
            <MobStatsCard data={target} />
          </Card.Body>
        </Card>

      </>}
      {!isItem ? <></>
        : isEquip ? <EqpUI data={target} />
          : <>
            <Card className='bg-light border-0 p-2 m-0'>
              <Card.Img variant="top" src={imgLink} alt="no image found" className='w-25 mx-auto my-1' />
              <Card.Body>
                <Card.Title className='display-4 fs-3 fw-medium p-0 text-center'>{target.name}</Card.Title>
                {strArr.map((x, i) => <Card.Text className='display-5 fs-4 p-0' key={i} dangerouslySetInnerHTML={{ __html: x }}></Card.Text>)}
              </Card.Body>
            </Card>

          </>}

    </div>
  )
}



export default TargetBox
