import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// 
import { mobIdToMobStats, decodeElemAttr } from "../myUtility.js"
import styles from './MobStatsCard.module.css'

function MobStatsCard({ data }) {
    const [mobData, setMobData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

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

    // console.log(typeof mobData.level)

    return (
        <>
            {isLoading ? <span className={`${styles.loader} d-block text-center mx-auto`}></span>
                : (typeof mobData.level !== "string") ? <span>No Info</span>
                    :
                    <div className='stats'>
                        {mobData.isBoss && <h1 className="h-6 fs-2 text-danger text-center">BOSS</h1>}
                        <Container>
                            <Row>
                                <Col xs={5}>Level</Col>
                                <Col xs={1}>:</Col>
                                <Col>{numToString(mobData.level)}</Col>
                            </Row>
                            <Row>
                                <Col xs={5}>HP</Col>
                                <Col xs={1}>:</Col>
                                <Col>{numToString(mobData.maxHP)}</Col>
                            </Row>
                            <Row>
                                <Col xs={5}>is Undead </Col>
                                <Col xs={1}>:</Col>
                                <Col>{mobData.isUndead ? "Yes" : "No"}</Col>
                            </Row>
                            <Row>
                                <Col xs={5}>Exp </Col>
                                <Col xs={1}>:</Col>
                                <Col>{numToString(mobData.exp * 3.2)}</Col>
                            </Row>
                            {/* <Row>
                                <Col xs={5}>Info-version</Col>
                                <Col xs={1}>:</Col>
                                <Col>{mobData.version}</Col>
                            </Row> */}
                        </Container>

                    </div>
            }
        </>
    )
}

function numToString(x) {
    return parseInt(x).toLocaleString("en-US");
}

export default MobStatsCard