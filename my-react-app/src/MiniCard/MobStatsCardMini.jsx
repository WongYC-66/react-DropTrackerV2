import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
// 
import { mobIdToMobStats, decodeElemAttr } from "../myUtility.js"

function MobStatsCardMini({ data, isTarget }) {
    const [mobData, setMobData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    // console.log(isTarget)

    useEffect(() => {
        const fetchMobData = () => {
            let x = mobIdToMobStats(data.id)
            let nextObj = {
                level: x.level || null,
                maxHP: x.maxHP || null,
                maxMP: x.maxMP || null,
                WDEF: x.PDDamage || null,
                WDMG: x.PADamage || null,
                MDMG: x.MADamage || null,
                MDEF: x.MDDamage || null,
                accuracy: x.acc || null,
                evasion: x.eva || null,
                exp: x.exp || null,
                isUndead: x.undead === "1",
                isBoss: x.boss === "1",
                knockBack: x.pushed || null,
                elemAttr: x.elemAttr || ""
            }
            if (x.elemAttr) nextObj.elemAttr = decodeElemAttr(x.elemAttr)
            setIsLoading(false)
            setMobData(nextObj)
        }

        fetchMobData()
    }, [data])

    return (
        <>
            <Card className={`border-0 my-1 lh-1 ${isTarget && `bg-maple-bg-2 text-light `}`}>
                <Card.Body className="p-0">
                    <Card.Title className="h5 m-0 p-0">{data.name}</Card.Title>
                    <Card.Text className="d-flex m-0 p-0 fs-xsm fw-lightjustify-content-start">
                        {`Level   :      ${numToString(!isLoading && mobData.level)}   `}
                    </Card.Text>
                    <Card.Text className="d-flex  m-0 p-0 fw-lightjustify-content-start">
                        {`HP   :      ${numToString(!isLoading && mobData.maxHP)}   `}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

function numToString(x) {
    return parseInt(x).toLocaleString("en-US");
}

export default MobStatsCardMini