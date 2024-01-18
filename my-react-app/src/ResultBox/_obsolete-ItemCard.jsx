import { useContext } from 'react'
// 
import { itemIdToImgUrl } from '../myUtility.js'
import { TargetContext } from '../App.jsx';
import EqpUI from '../EqpUI/EqpUI.jsx';

function ItemCard({ data }) {
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

function handleIconClick(data, type, setTarget) {
  setTarget({ id: data.id, name: data.name, desc: data.desc, type })
}

export default ItemCard
