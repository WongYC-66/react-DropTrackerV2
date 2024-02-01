import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsDot } from "react-icons/bs";
// 
import { itemIdToImgUrl, attkSpeedToText, itemIdToGearStats} from '../myUtility.js'
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
                        <Container sm={12} className='fs-6 fw-lighter lh-sm p-1'>
                            <Row>
                                <Col className='h6'>{eqpData.name} </Col>
                            </Row>
                            <Row>
                                {/* Eqp Image and Requirements */}
                                <Col><img className='d-block m-2 m-auto mh-50 mw-50' src={itemIdToImgUrl(data.id)} alt="No image found"></img></Col>
                                <Col xs={8} className='ms-2 p-0'>
                                    <Row>
                                        <Col>REQ LEV</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={3}>{eqpData.reqLevel}</Col>
                                    </Row>
                                    <Row>
                                        <Col>REQ STR</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={3}>{eqpData.reqSTR}</Col>
                                    </Row>
                                    <Row>
                                        <Col>REQ DEX</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={3}>{eqpData.reqDEX}</Col>
                                    </Row>
                                    <Row>
                                        <Col>REQ INT</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={3}>{eqpData.reqINT}</Col>
                                    </Row>
                                    <Row>
                                        <Col>REQ LUK</Col>
                                        <Col xs={1}>:</Col>
                                        <Col xs={3}>{eqpData.reqLUK}</Col>
                                    </Row>
                                    <Row>
                                        <Col>REQ FAME</Col>
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

                                <Col><div className='my-1 p-0 border-top border-2 border-maple-orange-3'></div></Col>
                            </Row>
                            <Row>
                                {/* stats */}
                                <Row>
                                    <Col className='pe-0'><BsDot />CATEGORY</Col>
                                    <Col xs={1} className='p-0'>:</Col>
                                    <Col xs={3} md={4} lg={5} className='p-0 m-0'>{eqpData.subCategory}</Col>
                                </Row>

                                {!!eqpData.attackSpeed &&
                                    <Row>
                                        <Col className='pe-0'><BsDot />ATTACK SPEED</Col>
                                        <Col xs={1} className='p-0'>:</Col>
                                        <Col xs={3} md={4} lg={5} className='p-0'>{attkSpeedToText(eqpData.attackSpeed)} ({eqpData.attackSpeed})</Col>
                                    </Row>}

                                {!!eqpData.incSTR &&
                                    <Row>
                                        <Col className='pe-0'><BsDot />STR</Col>
                                        <Col xs={1} className='p-0'>:</Col>
                                        <Col xs={3} md={4} lg={5} className='p-0 fw-bold'> +{rangeCalculator(eqpData.incSTR, "")}</Col>
                                    </Row>}

                                {!!eqpData.incDEX &&
                                    <Row>
                                        <Col className='pe-0'><BsDot />DEX</Col>
                                        <Col xs={1} className='p-0'>:</Col>
                                        <Col xs={3} md={4} lg={5} className='p-0 fw-bold'>+{rangeCalculator(eqpData.incDEX, "")}</Col>
                                    </Row>}

                                {!!eqpData.incINT &&
                                    <Row>
                                        <Col className='pe-0'><BsDot />INT</Col>
                                        <Col xs={1} className='p-0'>:</Col>
                                        <Col xs={3} md={4} lg={5} className='p-0 fw-bold'>+{rangeCalculator(eqpData.incINT, "")}</Col>
                                    </Row>}

                                {!!eqpData.incLUK &&
                                    <Row>
                                        <Col className='pe-0'><BsDot />LUK</Col>
                                        <Col xs={1} className='p-0'>:</Col>
                                        <Col xs={3} md={4} lg={5} className='p-0 fw-bold'>+{rangeCalculator(eqpData.incLUK, "")}</Col>
                                    </Row>}

                                {!!eqpData.incHP &&
                                    <Row>
                                        <Col className='pe-0'><BsDot />HP</Col>
                                        <Col xs={1} className='p-0'>:</Col>
                                        <Col xs={3} md={4} lg={5} className='p-0 fw-bold'>+{rangeCalculator(eqpData.incHP, "", 10)}</Col>
                                    </Row>}

                                {!!eqpData.incMP &&
                                    <Row>
                                        <Col className='pe-0'><BsDot />MP</Col>
                                        <Col xs={1} className='p-0'>:</Col>
                                        <Col xs={3} md={4} lg={5} className='p-0 fw-bold'>+{rangeCalculator(eqpData.incMP, "", 10)}</Col>
                                    </Row>}

                                {!!eqpData.incWATT &&
                                    <Row>
                                        <Col className='pe-0'><BsDot />WEAPON ATTACK</Col>
                                        <Col xs={1} className='p-0'>:</Col>
                                        <Col xs={3} md={4} lg={5} className='p-0 fw-bold'>+{rangeCalculator(eqpData.incWATT, "showGodly")}</Col>
                                    </Row>}

                                {!!eqpData.incMATT &&
                                    <Row>
                                        <Col className='pe-0'><BsDot />MAGIC ATTACK</Col>
                                        <Col xs={1} className='p-0'>:</Col>
                                        <Col xs={3} md={4} lg={5} className='p-0 fw-bold'>+{rangeCalculator(eqpData.incMATT, "showGodly")}</Col>
                                    </Row>}

                                {!!eqpData.incWDEF &&
                                    <Row>
                                        <Col className='pe-0'><BsDot />WEAPON DEF</Col>
                                        <Col xs={1} className='p-0'>:</Col>
                                        <Col xs={3} md={4} lg={5} className='p-0 fw-bold'>+{rangeCalculator(eqpData.incWDEF, "", 10)}</Col>
                                    </Row>}

                                {!!eqpData.incMDEF &&
                                    <Row>
                                        <Col className='pe-0'><BsDot />MAGIC DEF</Col>
                                        <Col xs={1} className='p-0'>:</Col>
                                        <Col xs={3} md={4} lg={5} className='p-0 fw-bold'>+{rangeCalculator(eqpData.incMDEF, "", 10)}</Col>
                                    </Row>}

                                {!!eqpData.incAcc &&
                                    <Row>
                                        <Col className='pe-0'><BsDot />ACCURACY</Col>
                                        <Col xs={1} className='p-0'>:</Col>
                                        <Col xs={3} md={4} lg={5} className='p-0 fw-bold'>+{rangeCalculator(eqpData.incACC, "")}</Col>
                                    </Row>}

                                {!!eqpData.incEVA &&
                                    <Row>
                                        <Col className='pe-0'><BsDot />AVOIDABILITY</Col>
                                        <Col xs={1} className='p-0'>:</Col>
                                        <Col xs={3} md={4} lg={5} className='p-0 fw-bold'>+{rangeCalculator(eqpData.incEVA, "")}</Col>
                                    </Row>}

                                {!!eqpData.incSpeed &&
                                    <Row>
                                        <Col className='pe-0'><BsDot />SPEED</Col>
                                        <Col xs={1} className='p-0'>:</Col>
                                        <Col xs={3} md={4} lg={5} className='p-0 fw-bold'>+{rangeCalculator(eqpData.incSpeed, "")}</Col>
                                    </Row>}

                                {!!eqpData.incJUMP &&
                                    <Row>
                                        <Col className='pe-0'><BsDot />JUMP</Col>
                                        <Col xs={1} className='p-0'>:</Col>
                                        <Col xs={3} md={4} lg={5} className='p-0 fw-bold'>+{rangeCalculator(eqpData.incJUMP, "")}</Col>
                                    </Row>}

                                <Row>
                                    <Col className='pe-0'><BsDot />NUMBER OF UPGRADES AVAILABLE</Col>
                                    <Col xs={1} className='p-0'>:</Col>
                                    <Col xs={3} className='p-0 fw-bold'>{eqpData.slot}</Col>
                                </Row>

                            </Row>
                        </Container>

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
    // console.log(`${x} after lib`)

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
        // returnString = (`${min} ~ ${max} or ${maxWithGodlyBonus} (godly)`) :
        // returnString = (`${min} ~ ${max} or ${maxWithGodlyBonus}`)
        returnString = (`${min} ~ ${maxWithGodlyBonus}`) :
        returnString = (`${min} ~ ${maxWithGodlyBonus}`)
    return returnString
}

export default EqpUI