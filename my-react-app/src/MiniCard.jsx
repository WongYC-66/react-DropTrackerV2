import { useContext } from 'react'
import { mobIdToImgUrl, itemIdToImgUrl } from './myUtility.js'
import { TargetContext } from './App.jsx';

function MiniCard({ data }) {
    // console.log(data)
    const { setTarget } = useContext(TargetContext);

    return (
        <div className="mini-card" onClick={() => setTarget(data)}>
            {data.type === 'mob' && <img src={mobIdToImgUrl(data.id)} alt="no image found"></img>}
            {data.type === 'item' && <img src={itemIdToImgUrl(data.id)} alt="no image found"></img>}
            <p>{data.name}</p>
        </div>
    )
}

export default MiniCard