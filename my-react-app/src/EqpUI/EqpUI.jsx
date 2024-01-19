import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsDot } from "react-icons/bs";
// 
import { itemIdToImgUrl, attkSpeedToText } from '../myUtility.js'
import styles from './EqpUI.module.css'

function EqpUI({ location = "", data }) {
    // console.log(data)
    const [eqpData, setEqpData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const isEquip = !data.desc
    const toHideDefault = location === "inDisplayList" // only for ResultBox usage
    // console.log(data.desc)
    // console.log(isEquip)

    useEffect(() => {
        if (!isEquip) return  // only fetch info data if is Eqp

        const fetchEqpData = async () => {

            const fetchParameter = [
                ['GMS', 64],
                ['EMS', 82],
                ['GMS', 107],
                ['SEA', 198]
            ]
            // fetch api for eqp data for at least 3 times if fail
            for (let i = 0; i < fetchParameter.length; i++) {

                let x = {};
                try {
                    x = await fetch(`https://maplestory.io/api/${fetchParameter[i][0]}/${fetchParameter[i][1]}/item/${data.id}`)
                    x = await (x.json())
                    // return setEqpData(x)
                    let nextObj = {
                        name: data.name,
                        id: data.id,
                        overallCategory: x.typeInfo.overallCategory.toUpperCase(),
                        subCategory: x.typeInfo.subCategory.toUpperCase(),
                        reqLevel: x.metaInfo.reqLevelEquip || 0,
                        reqSTR: x.metaInfo.reqSTR || 0,
                        reqDEX: x.metaInfo.reqDEX || 0,
                        reqINT: x.metaInfo.reqINT || 0,
                        reqLUK: x.metaInfo.reqLUK || 0,
                        reqFAME: x.metaInfo.reqPOP || 0,
                        reqJob: x.metaInfo.reqJob || 0,
                        //
                        slot: x.metaInfo.tuc || 0,
                        attackSpeed: x.metaInfo.attackSpeed || 0,
                        incWATT: x.metaInfo.incPAD || 0,
                        incMATT: x.metaInfo.incMAD || 0,
                        incACC: x.metaInfo.incACC || 0,
                        incEVA: x.metaInfo.incEVA || 0,
                        incSpeed: x.metaInfo.incSpeed || 0,
                        incJUMP: x.metaInfo.incJUMP || 0,
                        incWDEF: x.metaInfo.incPDD || 0,
                        incMDEF: x.metaInfo.incMDD || 0,
                        incHP: x.metaInfo.incMHP || 0,
                        incMP: x.metaInfo.incMMP || 0,
                        //
                        incSTR: x.metaInfo.incSTR || 0,
                        incDEX: x.metaInfo.incDEX || 0,
                        incINT: x.metaInfo.incINT || 0,
                        incLUK: x.metaInfo.incLUK || 0,
                        //

                    }
                    // console.log(nextObj)
                    setEqpData(nextObj)
                    setIsLoading(false)
                    return;  // no error then end.
                } catch (err) {
                    setEqpData({})
                    continue // re-fetch if error
                }

            }
            setIsLoading(false) // loading fail. done with fetch.
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
                        <Container sm={12}>
                            <Row>
                                <Col className='h6'>{eqpData.name} </Col>
                            </Row>
                            <Row>
                                {/* Eqp Image and Requirements */}
                                <Col xs={3}><img  className='d-block m-2 m-auto mh-50 mw-50' src={itemIdToImgUrl(data.id)} alt="No image found"></img></Col>
                                <Col className='lh-sm ms-2 p-0'>
                                    <Row>
                                        <Col xs={6}>REQ LEV</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={3}>{eqpData.reqLevel}</Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}>REQ STR</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={3}>{eqpData.reqSTR}</Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}>REQ DEX</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={3}>{eqpData.reqDEX}</Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}>REQ INT</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={3}>{eqpData.reqINT}</Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}>REQ LUK</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={3}>{eqpData.reqLUK}</Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}>REQ FAME</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={3}> {eqpData.reqFAME}</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                {/* beginner / warrior / magician / boman / thief / pirate */}
                                <Col className='d-flex flex-wrap column-gap-1'>{jobReqToHtmlElem(eqpData.reqJob)}</Col>
                            </Row>
                            <Row>
                                {/* horizontal line */}
                                <Col><hr className='border border-2 border-warning'></hr></Col>
                            </Row>
                            <Row>
                                {/* stats */}
                                <Row>
                                    <Col xs={7}><BsDot />ATTACK SPEED</Col>
                                    <Col xs={1}>:</Col>
                                    <Col xs={4}>: {eqpData.subCategory}</Col>
                                </Row>

                                {!!eqpData.attackSpeed &&
                                    <Row>
                                        <Col xs={7}><BsDot />ATTACK SPEED</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={4}>: {attkSpeedToText(eqpData.attackSpeed)} ({eqpData.attackSpeed})</Col>
                                    </Row>}

                                {!!eqpData.incSTR &&
                                    <Row>
                                        <Col xs={7}><BsDot />STR</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={4} className='fw-bold'>: +{rangeCalculator(eqpData.incSTR, "")}</Col>
                                    </Row>}

                                {!!eqpData.incDEX &&
                                    <Row>
                                        <Col xs={7}><BsDot />DEX</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={4} className='fw-bold'>: +{rangeCalculator(eqpData.incDEX, "")}</Col>
                                    </Row>}

                                {!!eqpData.incINT &&
                                    <Row>
                                        <Col xs={7}><BsDot />INT</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={4} className='fw-bold'>: +{rangeCalculator(eqpData.incINT, "")}</Col>
                                    </Row>}

                                {!!eqpData.incLUK &&
                                    <Row>
                                        <Col xs={7}><BsDot />LUK</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={4} className='fw-bold'>: +{rangeCalculator(eqpData.incLUK, "")}</Col>
                                    </Row>}

                                {!!eqpData.incHP &&
                                    <Row>
                                        <Col xs={7}><BsDot />HP</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={4} className='fw-bold'>: +{rangeCalculator(eqpData.incHP, "", 10)}</Col>
                                    </Row>}

                                {!!eqpData.incMP &&
                                    <Row>
                                        <Col xs={7}><BsDot />MP</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={4} className='fw-bold'>: +{rangeCalculator(eqpData.incMP, "", 10)}</Col>
                                    </Row>}

                                {!!eqpData.incWATT &&
                                    <Row>
                                        <Col xs={7}><BsDot />WEAPON ATTACK</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={4} className='fw-bold'>: +{rangeCalculator(eqpData.incWATT, "showGodly")}</Col>
                                    </Row>}

                                {!!eqpData.incMATT &&
                                    <Row>
                                        <Col xs={7}><BsDot />MAGIC ATTACK</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={4} className='fw-bold'>: +{rangeCalculator(eqpData.incMATT, "showGodly")}</Col>
                                    </Row>}

                                {!!eqpData.incWDEF &&
                                    <Row>
                                        <Col xs={7}><BsDot />WEAPON DEF</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={4} className='fw-bold'>: +{rangeCalculator(eqpData.incWDEF, "", 10)}</Col>
                                    </Row>}

                                {!!eqpData.incMDEF &&
                                    <Row>
                                        <Col xs={7}><BsDot />MAGIC DEF</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={4} className='fw-bold'>: +{rangeCalculator(eqpData.incMDEF, "", 10)}</Col>
                                    </Row>}

                                {!!eqpData.incAcc &&
                                    <Row>
                                        <Col xs={7}><BsDot />ACCURACY</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={4} className='fw-bold'>: +{rangeCalculator(eqpData.incACC, "")}</Col>
                                    </Row>}

                                {!!eqpData.incEVA &&
                                    <Row>
                                        <Col xs={7}><BsDot />AVOIDABILITY</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={4} className='fw-bold'>: +{rangeCalculator(eqpData.incEVA, "")}</Col>
                                    </Row>}

                                {!!eqpData.incSpeed &&
                                    <Row>
                                        <Col xs={7}><BsDot />SPEED</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={4} className='fw-bold'>: +{rangeCalculator(eqpData.incSpeed, "")}</Col>
                                    </Row>}

                                {!!eqpData.incJUMP &&
                                    <Row>
                                        <Col xs={7}><BsDot />JUMP</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={4} className='fw-bold'>: +{rangeCalculator(eqpData.incJUMP, "")}</Col>
                                    </Row>}

                                <Row>
                                    <Col xs={7}><BsDot />NUMBER OF UPGRADES AVAILABLE</Col>
                                    <Col xs={1}>:</Col>
                                    <Col xs={4} className='fw-bold'>: {eqpData.slot}</Col>
                                </Row>

                            </Row>
                        </Container>

                // <div className={``}>
                //     <h3>{eqpData.name}</h3>
                //     <div className={styles.imgNReq}>
                //         <div className={styles.col_1}><img src={itemIdToImgUrl(data.id)} alt="No image found"></img></div>
                //         <div className={styles.col_2}>
                //             <p>REQ LEV : {eqpData.reqLevel}</p>
                //             <p>REQ STR : {eqpData.reqSTR}</p>
                //             <p>REQ DEX : {eqpData.reqDEX}</p>
                //             <p>REQ INT : {eqpData.reqINT}</p>
                //             <p>REQ LUK : {eqpData.reqLUK}</p>
                //             <p>REQ FAM : {eqpData.reqFAME || '-'}</p>
                //         </div>
                //     </div>
                //     <div className={styles.jobReq}>
                //         {jobReqToHtmlElem(eqpData.reqJob)}
                //     </div>
                //     <li>CATEGORY: {eqpData.subCategory}</li>
                //     {!!eqpData.attackSpeed && <li>ATTACK SPEED: {attkSpeedToText(eqpData.attackSpeed)} ({eqpData.attackSpeed})</li>}
                //     {!!eqpData.incSTR && <li>STR: <b>+{rangeCalculator(eqpData.incSTR, "")}</b></li>}
                //     {!!eqpData.incDEX && <li>DEX: <b>+{rangeCalculator(eqpData.incDEX, "")}</b></li>}
                //     {!!eqpData.incINT && <li>INT: <b>+{rangeCalculator(eqpData.incINT, "")}</b></li>}
                //     {!!eqpData.incLUK && <li>LUK: <b>+{rangeCalculator(eqpData.incLUK, "")}</b></li>}

                //     {!!eqpData.incHP && <li>HP: <b>+{rangeCalculator(eqpData.incHP, "", 10)}</b></li>}
                //     {!!eqpData.incMP && <li>MP: <b>+{rangeCalculator(eqpData.incMP, "", 10)}</b></li>}
                //     {!!eqpData.incWATT && <li>WEAPON ATTACK: <b>{rangeCalculator(eqpData.incWATT, "showGodly")}</b></li>}
                //     {!!eqpData.incMATT && <li>MAGIC ATTACK: <b>{rangeCalculator(eqpData.incMATT, "showGodly")}</b></li>}

                //     {!!eqpData.incWDEF && <li>WEAPON DEF: <b>{rangeCalculator(eqpData.incWDEF, "", 10)}</b></li>}
                //     {!!eqpData.incMDEF && <li>MAGIC DEF: <b>{rangeCalculator(eqpData.incMDEF, "", 10)}</b></li>}

                //     {!!eqpData.incACC && <li>ACCURACY: <b>{rangeCalculator(eqpData.incACC, "")}</b></li>}
                //     {!!eqpData.incEVA && <li>AVOIDABILITY: <b>{rangeCalculator(eqpData.incEVA, "")}</b></li>}
                //     {!!eqpData.incSpeed && <li>SPEED: {rangeCalculator(eqpData.incSpeed, "")}</li>}
                //     {!!eqpData.incJUMP && <li>JUMP: {rangeCalculator(eqpData.incJUMP, "")}</li>}

                //     <li>NUMBER OF UPGRADES AVAILABLE : <b>{eqpData.slot}</b></li>

                // </div>
            }
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
    console.log(`${x} after lib`)

    return (<>
        {
            <>
                <p className={`px-1 mb-1 bg-dark ${x.includes("-1") ? "text-warning" : "text-light"}`}>BEGINNER</p>
                <p className={`px-1 mb-1 bg-dark ${x.includes(1) ? "text-warning" : "text-light"}`}>WARRIOR</p>
                <p className={`px-1 mb-1 bg-dark ${x.includes(2) ? "text-warning" : "text-light"}`}>MAGICIAN</p>
                <p className={`px-1 mb-1 bg-dark ${x.includes(4) ? "text-warning" : "text-light"}`}>BOWMAN</p>
                <p className={`px-1 mb-1 bg-dark ${x.includes(8) ? "text-warning" : "text-light"}`}>THIEF</p>
                <p className={`px-1 mb-1 bg-dark ${x.includes(16) ? "text-warning" : "text-light"}`}>PIRATE</p>
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
    const min = Math.max(base - M, 0)
    const max = base + M

    const maxWithGodlyBonus = max + godlyBonus

    let returnString = ""
    type === "showGodly" ?
        returnString = (`${min} ~ ${max} or ${maxWithGodlyBonus} (godly)`) :
        returnString = (`${min} ~ ${max} or ${maxWithGodlyBonus}`)
    return returnString
}

export default EqpUI