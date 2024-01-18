import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';

function MobStatsCardMini({ data, isTarget }) {
    const [mobData, setMobData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    // console.log(isTarget)

    useEffect(() => {
        const fetchMobData = async () => {
            const fetchParameter = [
                ['GMS', 64],
                ['GMS', 82],
                ['GMS', 107],
                ['EMS', 55],
                ['EMS', 82],
                ['KMST', 1087],
                ['CMST', 172],
                ['CMS', 148],
                ['SEA', 198]
            ]
            // fetch api for eqp data for at least 3 times if fail
            for (let i = 0; i < fetchParameter.length; i++) {
                let x = {};
                try {
                    x = await fetch(`https://maplestory.io/api/${fetchParameter[i][0]}/${fetchParameter[i][1]}/mob/${data.id}`)
                    x = await (x.json())
                    // return setEqpData(x)
                    let nextObj = {
                        name: x.name,
                        id: x.id,
                        level: x.meta.level,
                        maxHP: x.meta.maxHP,
                        maxMP: x.meta.maxMP,
                        WDEF: x.meta.physicalDefense,
                        WDMG: x.meta.physicalDamage,
                        MDMG: x.meta.magicDefense,
                        MDEF: x.meta.magicDamage,
                        accuracy: x.meta.accuracy,
                        exp: x.meta.exp,
                        isUndead: x.meta.isUndead,
                        knockBack: x.meta.minimumPushDamage,
                        version: `${fetchParameter[i][0]}  v${fetchParameter[i][1]}`,
                    }
                    // console.log(nextObj)
                    setMobData(nextObj)
                    setIsLoading(false)
                    // console.log(`${fetchParameter[i][0]}  ${fetchParameter[i][1]}`)
                    return;  // no error then end.
                } catch (err) {
                    setMobData({})
                    continue // re-fetch if error
                }

            }
            setIsLoading(false) // loading fail. done with fetch.
        }
        fetchMobData()
    }, [data])

    return (
        <>
            <Card className={`border-0 my-1 ${isTarget && `bg-secondary text-light `}`}>
                <Card.Body className="p-0">
                    <Card.Title className="h6 m-0 p-0">{data.name}</Card.Title>
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