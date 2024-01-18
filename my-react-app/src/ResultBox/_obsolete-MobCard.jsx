import { useContext } from 'react'
// 
import { mobIdToImgUrl } from '../myUtility.js'
import { TargetContext } from '../App.jsx';

function MobCard({ data }) {
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

export default MobCard
