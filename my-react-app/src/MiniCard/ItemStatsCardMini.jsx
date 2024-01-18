import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';

function MobStatsCardMini({ data, isTarget }) {
    const [itemData, setItemData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchItemData = async () => {
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
                    x = await fetch(`https://maplestory.io/api/${fetchParameter[i][0]}/${fetchParameter[i][1]}/item/${data.id}`)
                    x = await (x.json())
                    // return setEqpData(x)
                    let nextObj = {
                        name: data.name,
                        id: data.id,
                        overallCategory: x.typeInfo.overallCategory.toUpperCase(),
                        category: x.typeInfo.category,
                        subCategory: x.typeInfo.subCategory,
                    }
                    // console.log(nextObj)
                    setItemData(nextObj)
                    setIsLoading(false)
                    return;  // no error then end.
                } catch (err) {
                    setItemData({})
                    continue // re-fetch if error
                }

            }
            setIsLoading(false) // loading fail. done with fetch.
        }
        fetchItemData()
    }, [data])

    return (
        <>
            <Card className={`border-0 my-2 ${isTarget && `bg-secondary text-light `}`}>
                <Card.Body className="p-0">
                    <Card.Title className="h5 m-0 p-0">{data.name}</Card.Title>
                    <Card.Text className="d-flex m-0 p-0 fs-xsm fw-lightjustify-content-start">
                        {!isLoading && `${itemData.overallCategory} / ${itemData.category} - ${itemData.subCategory}`}
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