import data_fixMobImg from './data_fixMobImg.json'
import data_fixItemImg from './data_fixItemImg.json'
const data_MobIdImg = Object.fromEntries(data_fixMobImg.map(x => [Object.keys(x), Object.values(x)]))
const data_ItemIdImg = Object.fromEntries(data_fixItemImg.map(x => [Object.keys(x), Object.values(x)]))
let data = JSON.parse(localStorage.getItem("data"));

// ---------------- utility-funciton -----------------------
export function queryMaps(id) {
    // to return Array of map name [["streetName : mapName"], ["Maple Road : Snail Hunting Ground I"] ]
    // console.log("running queryMaps")
    let mapList = data.data_MobMap[id]
    // console.log(mapList)
    mapList = mapList.map(mapId => {
        let mapInfo = data.data_Map[mapId]
        if (mapInfo === undefined) return ""// if undefined , format to empty string
        let streetName = mapInfo.streetName
        let mapName = mapInfo.mapName
        return `${streetName} : ${mapName}`
    }).filter(x => x) // filter out empty string
    // console.log(mapList)
    return mapList
}


export function queryItems(id, setSearchResult) {
    // const data = JSON.parse(localStorage.getItem("data"));
    if (!data.data_item[id]) return alert("id not found") // end if not tound

    // let name = data.data_item[id].name   // is Consume/Etc/Ins
    // if (!name) name = data.data_item[id] // is Eqp.

    // let desc = data.data_item[id].desc
    let dropTable = Object.entries(data.data_MB)
    dropTable = dropTable.filter(x => x[1].includes(id))

    dropTable = dropTable.map(x => {
        // x[0] = id of mob
        return {
            id: x[0],
            name: data.data_Mob[parseInt(x[0])]
        }
    })
    // console.log({ id, name, desc, dropTable })
    setSearchResult({ dropTable, type: "mobList"})
}


export const queryMobs = (id, setSearchResult) => {
    // const data = JSON.parse(localStorage.getItem("data"));
    // console.log(id)
    if (!data.data_Mob[id]) return alert("id not found") // end if not tound
    // let name = data.data_Mob[id]
    let dropTable = data.data_MB[id]
    dropTable = dropTable.map(x => {
        let result = data.data_item[x]
        if (typeof result === "string") {
            // item isEqp, without description
            return {
                id: x,
                name: result
            }
        }
        else {
            // item is Use/Consume/Etc with desciption
            return {
                id: x,
                name: result.name,
                desc: result.desc
            }
        }
    })
    // console.log({ id, dropTable })
    setSearchResult({ dropTable, type: "itemList" })
}

export function mobIdToImgUrl(id) {
    // console.log(data_MobIdImg)
    // console.log("running MobIdToImgUrl()")
    // console.log(id)
    let d = data_MobIdImg[id]
    if (d === undefined) return `https://maplestory.io/api/SEA/198/mob/${id}/render/stand`
    d = d[0]
    // console.log(d)
    return `https://maplestory.io/api/${d.region}/${d.version}/mob/${id}/render/${d.animation}`
}

export function itemIdToImgUrl(id) {
    // console.log("running itemIdToImgUrl()")
    // console.log(id)
    // if(!data || Object.keys(data).length <= 0) data = JSON.parse(localStorage.getItem("data")); // to fix first-loading bug
    if (!data) data = JSON.parse(localStorage.getItem("data")); // to fix first-loading bug
    // console.log(data)
    let name = data.data_item[id].name // check if scroll 
    if (name && name.includes("Scroll")) {
        let returnId = null
        Object.entries({
            "100%": "2041300",
            "70%": "2040814",
            "60%": "2044501",
            "30%": "2040108",
            "10%": "2040200",
            "1%": "2049000",
            "Chaos": "2049100", // chaos scroll
            "Miracle": "2040037", // miracle auf
            "Auf": "2040037", // auf
            "to Lion King": "2030056", //
            "Fragment": "4001533" // white scroll fragment 
        })
            .forEach(x => name.includes(x[0]) ? returnId = x[1] : null) // if match text, use that id
        // console.log(returnId)
        return `https://maplestory.io/api/SEA/198/item/${returnId}/icon?resize=1.5`
    }

    // if not scroll, check against data_fixItemImg
    let d = data_ItemIdImg[id]
    if (d === undefined) return `https://maplestory.io/api/SEA/198/item/${id}/icon?resize=1.5` // not in data list, use default.
    return `https://maplestory.io/api/${d[0].region}/${d[0].version}/item/${d[0].id || id}/icon?resize=1.5` // in data list, use that
}

export function attkSpeedToText(x) {
    let text = "not found"
    const lib = {
        2: "FASTER",
        3: "FASTER",
        4: "FAST",
        5: "FAST",
        6: "NORMAL",
        7: "SLOW",
        8: "SLOW",
        9: "SLOWER",
    }
    text = lib[x] || text
    return text;
}

// ---------------- utility-funciton -----------------------