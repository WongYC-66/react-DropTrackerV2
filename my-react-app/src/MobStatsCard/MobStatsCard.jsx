import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// 
import styles from './MobStatsCard.module.css'

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
                        isBoss: x.meta.isBoss || false,
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

    // console.log(typeof mobData.level)

    return (
        <>
            {isLoading ? <span className={`${styles.loader} d-block text-center mx-auto`}></span>
                : (typeof mobData.level !== "number") ? <span>No Info</span>
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
                                <Col xs={5}>Info-version</Col>
                                <Col xs={1}>:</Col>
                                <Col>{mobData.version}</Col>
                            </Row>
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