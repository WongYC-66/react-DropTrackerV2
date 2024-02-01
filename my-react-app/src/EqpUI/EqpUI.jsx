import { useState, useEffect } from 'react'
import { itemIdToImgUrl, attkSpeedToText, itemIdToGearStats } from '../myUtility.js'
import styles from "./EqpUI.module.css";

function EqpUI({ location="", data }) {
    // console.log(data)
    const [eqpData, setEqpData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const isEquip = !data.desc
    const toHideDefault = location === "inDisplayList" // only for ResultBox usage
    // console.log(data.desc)
    // console.log(isEquip)

    useEffect(() => {
        if (!isEquip) return  // only fetch info data if is Eqp
        
        const fetchEqpData = () => {
            let x = itemIdToGearStats(data.id)
            // console.log(x)
            let nextObj = {
                name: data.name,
                id: data.id,
                overallCategory: x.overallCategory.toUpperCase(),
                category: x.category.toUpperCase(),
                subCategory: x.subCategory.toUpperCase(),
                reqLevel: parseInt(x.reqLevel) || 0,
                reqSTR: parseInt(x.reqSTR) || 0,
                reqDEX: parseInt(x.reqDEX) || 0,
                reqINT: parseInt(x.reqINT) || 0,
                reqLUK: parseInt(x.reqLUK) || 0,
                reqFAME: parseInt(x.reqPOP) || 0,
                reqJob: parseInt(x.reqJob) || 0,
                //
                slot: parseInt(x.tuc) || 0,
                attackSpeed: parseInt(x.attackSpeed) || 0,
                incWATT: parseInt(x.incPAD) || 0,
                incMATT: parseInt(x.incMAD) || 0,
                incACC: parseInt(x.incACC) || 0,
                incEVA: parseInt(x.incEVA) || 0,
                incSpeed: parseInt(x.incSpeed) || 0,
                incJUMP: parseInt(x.incJump) || 0,
                incWDEF: parseInt(x.incPDD) || 0,
                incMDEF: parseInt(x.incMDD) || 0,
                incHP: parseInt(x.incMHP) || 0,
                incMP: parseInt(x.incMMP) || 0,
                //
                incSTR: parseInt(x.incSTR) || 0,
                incDEX: parseInt(x.incDEX) || 0,
                incINT: parseInt(x.incINT) || 0,
                incLUK: parseInt(x.incLUK) || 0,
                //
            }
            // console.log(nextObj)
            setEqpData(nextObj)
            if(x) setIsLoading(false)
        }

        fetchEqpData()
    }, [data])

    // console.log(data)
    // console.log(eqpData)

    return (
        <>
            {!isEquip ? <></> :
                isLoading ? <span className={styles.loader}></span> :
                    eqpData.overallCategory !== "EQUIP" ? <span>no info</span> :

                    <div className={`${toHideDefault && "inListItemDetail"} ${styles.itemDetail}`}>
                        <h3>{eqpData.name}</h3>
                        <div className={styles.imgNReq}>
                            <div className={styles.col_1}><img src={itemIdToImgUrl(data.id)} alt="No image found"></img></div>
                            <div className={styles.col_2}>
                                <p>REQ LEV : {eqpData.reqLevel}</p>
                                <p>REQ STR : {eqpData.reqSTR}</p>
                                <p>REQ DEX : {eqpData.reqDEX}</p>
                                <p>REQ INT : {eqpData.reqINT}</p>
                                <p>REQ LUK : {eqpData.reqLUK}</p>
                                <p>REQ FAM : {eqpData.reqFAME || '-'}</p>
                            </div>
                        </div>
                        <div className={styles.jobReq}>
                            {jobReqToHtmlElem(eqpData.reqJob)}
                        </div>
                        <li>CATEGORY: {eqpData.subCategory}</li>
                        {!!eqpData.attackSpeed && <li>ATTACK SPEED: {attkSpeedToText(eqpData.attackSpeed)} ({eqpData.attackSpeed})</li>}
                        {!!eqpData.incSTR && <li>STR: <b>+{rangeCalculator(eqpData.incSTR, "")}</b></li>}
                        {!!eqpData.incDEX && <li>DEX: <b>+{rangeCalculator(eqpData.incDEX, "")}</b></li>}
                        {!!eqpData.incINT && <li>INT: <b>+{rangeCalculator(eqpData.incINT, "")}</b></li>}
                        {!!eqpData.incLUK && <li>LUK: <b>+{rangeCalculator(eqpData.incLUK, "")}</b></li>}

                        {!!eqpData.incHP && <li>HP: <b>+{rangeCalculator(eqpData.incHP, "", 10)}</b></li>}
                        {!!eqpData.incMP && <li>MP: <b>+{rangeCalculator(eqpData.incMP, "", 10)}</b></li>}
                        {!!eqpData.incWATT && <li>WEAPON ATTACK: <b>{rangeCalculator(eqpData.incWATT, "showGodly")}</b></li>}
                        {!!eqpData.incMATT && <li>MAGIC ATTACK: <b>{rangeCalculator(eqpData.incMATT, "showGodly")}</b></li>}

                        {!!eqpData.incWDEF && <li>WEAPON DEF: <b>{rangeCalculator(eqpData.incWDEF, "", 10)}</b></li>}
                        {!!eqpData.incMDEF && <li>MAGIC DEF: <b>{rangeCalculator(eqpData.incMDEF, "", 10)}</b></li>}

                        {!!eqpData.incACC && <li>ACCURACY: <b>{rangeCalculator(eqpData.incACC, "")}</b></li>}
                        {!!eqpData.incEVA && <li>AVOIDABILITY: <b>{rangeCalculator(eqpData.incEVA, "")}</b></li>}
                        {!!eqpData.incSpeed && <li>SPEED: {rangeCalculator(eqpData.incSpeed, "")}</li>}
                        {!!eqpData.incJUMP && <li>SPEED: {rangeCalculator(eqpData.incJUMP, "")}</li>}

                        <li>NUMBER OF UPGRADES AVAILABLE : <b>{eqpData.slot}</b></li>

                    </div>}
        </>
    )
}

function jobReqToHtmlElem(x) {
    // console.log(x)
    const lib = {
        "-1": [-1],   //'BEGINNER',
        0: ["-1", 1, 2, 4, 8, 16],    // 'ALL',
        1: [1],       // 'WARRIOR'
        2: [2],       // 'MAGICIAN'
        3: [1, 2],                   // ['WARRIOR','MAGICIAN'],
        4: [4],       // 'BOWMAN'
        8: [8],       // 'THIEF',
        9: [1, 8],                 // ['WARRIOR','THIEF'],
        13: [1, 4, 8],             // ['WARRIOR','BOWMAN', 'THIEF'],
        16: [16]      // 'PIRATE',
    }

    x = lib[x] || [16]
    // console.log(`${x} after lib`)

    return (<>
        {
            <>
                <p className={x.includes("-1") ? styles.highlight : null}>BEGINNER</p>
                <p className={x.includes(1) ? styles.highlight  : null}>WARRIOR</p>
                <p className={x.includes(2) ? styles.highlight  : null}>MAGICIAN</p>
                <p className={x.includes(4) ? styles.highlight  : null}>BOWMAN</p>
                <p className={x.includes(8) ? styles.highlight  : null}>THIEF</p>
                <p className={x.includes(16) ? styles.highlight  : null}>PIRATE</p>
            </>
        }
    </>)
    // <p>BEGINNER</p><p>WARRIOR</p><p>MAGICIAN</p><p>BOWMAN</p><p>THIEF</p><p>PIRATE</p>

}

function rangeCalculator(x, type = "", hardCap = 5) {
    // data from https://mapleroyals.com/forum/threads/staff-blog-september-2022.209642/
    let base = x
    let M = parseInt(0.10 * base) + 1
    M = Math.min(M, hardCap)

    const godlyBonus = 5
    const min = base - M
    const max = base + M

    const maxWithGodlyBonus = max + godlyBonus

    let returnString = ""
    type === "showGodly" ?
        returnString = (`${min} ~ ${max} or ${maxWithGodlyBonus} (godly)`) :
        returnString = (`${min} ~ ${max} or ${maxWithGodlyBonus}`)
    return returnString
}

export default EqpUI