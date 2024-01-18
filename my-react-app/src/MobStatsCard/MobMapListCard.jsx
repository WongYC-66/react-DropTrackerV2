import { queryMaps } from '../myUtility.js'

function MobMapListCard({ data }) {
    // console.log(data)
    const mobMapList = data.type === "mob" && queryMaps(data.id)

    return (<>
        {mobMapList.map((x, i) => <a href={"https://bbb.hidden-street.net/map/mini-map/" + x.toLowerCase().replaceAll(/ :? */g, '-')}
            key={i}
            target="_blank"
            dangerouslySetInnerHTML={{ __html: x }}
            className='d-block p-1 ps-3 m-1 '
        ></a>)}
    </>)
}

export default MobMapListCard