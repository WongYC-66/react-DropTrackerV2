import { useState, useEffect } from "react";
import { mobIdToMobStats, decodeElemAttr } from "./myUtility.js"

function MobStatsCard({ data, showMobDetail }) {
    const [mobData, setMobData] = useState({})

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
            setMobData(nextObj)
        }

        fetchMobData()
    }, [data])

    return (
        <>
            {mobData.isBoss && <span className="stats"><h1>BOSS</h1></span>}

            <div className="statsFlex">
                <div className='stats'>

                    <div className="stat-row">
                        <p>Level : </p>
                        <p>{numToString(mobData.level)}</p>
                    </div>

                    <div className="stat-row">
                        <p>HP : </p>
                        <p>{numToString(mobData.maxHP)}</p>
                    </div>

                    <div className="stat-row">
                        <p>Exp : </p>
                        <p>{numToString(mobData.exp * 3.2)}</p>
                    </div>

                    <div className="stat-row">
                        <p>is Undead  : </p>
                        <p>{mobData.isUndead ? "Yes" : "No"}</p>
                    </div>

                    {/* <div className="stat-row">
                <p>Info-version: </p>
                <p>{mobData.version}</p>
            </div> */}
                </div>
                {showMobDetail && <>
                    <div className="mobElemBox">
                        {mobData.elemAttr && mobData.elemAttr.map((x, i) => {
                            return <p key={i}>{x}</p>
                        })}
                    </div>
                </>}
            </div>
        </>
    )
}

function numToString(x) {
    return parseInt(x).toLocaleString("en-US");
}

export default MobStatsCard