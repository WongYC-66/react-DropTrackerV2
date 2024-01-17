import { useState, useEffect } from "react";

function MobStatsCard({ data }) {
    const [mobData, setMobData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

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
                        version : `${fetchParameter[i][0]}  v${fetchParameter[i][1]}`,
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
        <div className='stats'>
            <div className="stat-row">
                <p>Level : </p>
                <p>{numToString(mobData.level)}</p>
            </div>

            <div className="stat-row">
                <p>HP : </p>
                <p>{numToString(mobData.maxHP)}</p>
            </div>
            
            {/* <div className="stat-row">
                <p>Exp : </p>
                <p>{numToString(mobData.exp)}</p>
            </div> */}

            <div className="stat-row">
                <p>is Undead  : </p>
                <p>{mobData.isUndead ? "Yes" : "No"}</p>
            </div>

            <div className="stat-row">
                <p>Info-version: </p>
                <p>{mobData.version}</p>
            </div>

        </div>
    )
}

function numToString(x){
    return parseInt(x).toLocaleString("en-US");
}

export default MobStatsCard