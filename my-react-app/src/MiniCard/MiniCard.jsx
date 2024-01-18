import { useContext } from 'react'
import styles from './MiniCard.module.css';
// Mob
import MobStatsCardMini from './MobStatsCardMini.jsx'
import ItemStatsCardMini from './ItemStatsCardMini.jsx'
import { mobIdToImgUrl, itemIdToImgUrl } from '../myUtility.js'
import { TargetContext } from '../App.jsx';

function MiniCard({ data }) {
    // console.log(data)
    const { setTarget } = useContext(TargetContext);

    return (
        <div className="d-flex align-items-center" onClick={() => setTarget(data)}>
            {data.type === 'mob' && <img className={`col-3 pe-1 mx-3 ${styles.img}`} src={mobIdToImgUrl(data.id)} alt="no image found" />}
            {data.type === 'mob' && <MobStatsCardMini data={data} />}
            
            {data.type === 'item' && <img className={`col-3 pe-1 mx-3  ${styles.img}`} src={itemIdToImgUrl(data.id)} alt="no image found" />}
            {data.type === 'item' && <ItemStatsCardMini data={data} />}
        </div>
    )
}

export default MiniCard