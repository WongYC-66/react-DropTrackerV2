import data_fixMobImg from './fixImgData/data_fixMobImg.json'
import data_fixItemImg from './fixImgData/data_fixItemImg.json'
const data_MobIdImg = Object.fromEntries(data_fixMobImg.map(x => [Object.keys(x), Object.values(x)]))
const data_ItemIdImg = Object.fromEntries(data_fixItemImg.map(x => [Object.keys(x), Object.values(x)]))
let data = JSON.parse(localStorage.getItem("data"));

function reloadData() {
    if (!data || Object.keys(data).length <= 0) data = JSON.parse(localStorage.getItem("data"));
}
// ---------------- utility-funciton -----------------------
export function queryMaps(id) {
    // to return Array of map name [["streetName : mapName"], ["Maple Road : Snail Hunting Ground I"] ]
    // console.log("running queryMaps")
    reloadData()
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
    reloadData()
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
            name: data.data_Mob[parseInt(x[0])],
            type: 'mob',
        }
    })
    // console.log(dropTable)
    // return
    setSearchResult({ dropTable, type: "mobList" })
}


export const queryMobs = (id, setSearchResult) => {
    // const data = JSON.parse(localStorage.getItem("data"));
    // console.log(id)
    reloadData()
    if (!data.data_Mob[id]) return alert("id not found") // end if not tound
    // let name = data.data_Mob[id]
    let dropTable = data.data_MB[id]
    dropTable = dropTable.map(x => {
        let result = data.data_item[x]
        if (typeof result === "string") {
            // item isEqp, without description
            return {
                id: x,
                name: result,
                type: 'item',

            }
        }
        else {
            // item is Use/Consume/Etc with desciption
            return {
                id: x,
                name: result.name,
                desc: result.desc,
                type: 'item',

            }
        }
    })
    // console.log({ id, dropTable })
    // console.log(dropTable)
    setSearchResult({ dropTable, type: "itemList" })
}

export function mobIdToImgUrl(id) {
    // console.log(data_MobIdImg)
    // console.log("running MobIdToImgUrl()")
    // console.log(id)
    reloadData()
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
    reloadData()
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

export function itemIdToGearStats(id){
    if(! data) data = JSON.parse(localStorage.getItem("data")); // to fix first-loading bug
    let obj = data.data_GearStats[id]
    const [overallCategory, category, subCategory] = itemIdToCategory(id)
    obj["overallCategory"] = overallCategory 
    obj["category"] = category 
    obj["subCategory"] = subCategory 

    return obj
}

export function itemIdToCategory(id){
    // info used from https://maplestory.io/api/GMS/64/item/category
    id = parseInt(id)
    let overallCategory = "Equip"
    let category = undefined
    let subCategory = undefined
    const isIDInRange = (min, max) => id >= min && id <= max

    const catogeryRangeList = {
        "Gun" : {min : 1490000, max : 1500000, category: "Two-Handed Weapon"},
        "Knuckle" : {min : 1480000, max : 1490000, category: "Two-Handed Weapon"},
        "Claw" : {min : 1470000, max : 1480000, category: "Two-Handed Weapon"},
        "Dagger" : {min : 1330000, max : 1340000, category: "One-Handed Weapon"},
        "Bow" : {min : 1450000, max : 1460000, category: "Two-Handed Weapon"},
        "CrossBow" : {min : 1460000, max : 1470000, category: "Two-Handed Weapon"},
        "Staff" : {min : 1380000, max : 1390000, category: "One-Handed Weapon"},
        "Wand" : {min : 1370000, max : 1380000, category: "One-Handed Weapon"},
        "One-Handed Sword" : {min : 1300000, max : 1310000, category: "One-Handed Weapon"},
        "Two-Handed Sword" : {min : 1400000, max : 1410000, category: "Two-Handed Weapon"},
        "One-Handed Blunt Weapon" : {min : 1320000, max : 1330000, category: "One-Handed Weapon"},
        "Two-Handed Blunt Weapon" : {min : 1420000, max : 1430000, category: "Two-Handed Weapon"},
        "One-Handed Axe" : {min : 1310000, max : 1320000, category: "One-Handed Weapon"},
        "Two-Handed Axe" : {min : 1410000, max : 1420000, category: "Two-Handed Weapon"},
        "Spear" : {min : 1430000, max : 1440000, category: "Two-Handed Weapon"},
        "Pole Arm" : {min : 1440000, max : 1450000, category: "Two-Handed Weapon"},

        "Hat" : {min : 1000000, max : 1010000, category: "Armor"},
        "Face Accessory" : {min : 1010000, max : 1020000, category: "Accessory"},
        "Eye Decoration" : {min : 1020000, max : 1030000, category: "Accessory"},
        "Glove" : {min : 1080000, max : 1090000, category: "Armor"},
        "Pendant" : {min : 1120000, max : 1130000, category: "Accessory"},
        "Belt" : {min : 1130000, max : 1140000, category: "Accessory"},
        "Medal" : {min : 1140000, max : 1150000, category: "Accessory"},
        "Cape" : {min : 1100000, max : 1110000, category: "Armor"},
        "Earrings" : {min : 1030000, max : 1040000, category: "Accessory"},
        "Ring" : {min : 1110000, max : 1120000, category: "Accessory"},
        "Shield" : {min : 1090000, max : 1100000, category: "Armor"},
        "Overall" : {min : 1050000, max : 1060000, category: "Armor"},
        "Top" : {min : 1040000, max : 1050000, category: "Armor"},
        "Bottom" : {min : 1060000, max : 1070000, category: "Armor"},
        "Shoes" : {min : 1070000, max : 1080000, category: "Armor"},
        "Test Armor" : {min : 1690100, max : 1690200, category: "Armor"},

        "Badge" : {min : 1180000, max : 1190000, category: "Accessory"},
        "Emblem" : {min : 1190000, max : 1190500, category: "Accessory"},
        "Pocket Item" : {min : 1160000, max : 1170000, category: "Accessory"},
        "Power Source" : {min : 1190200, max : 1190300, category: "Accessory"},
        "Shoulder Accessory" : {min : 1150000, max : 1160000, category: "Accessory"},
        "Totem" : {min : 1202000, max : 1202200, category: "Accessory"},
    }

    Object.entries(catogeryRangeList).forEach(x => {
        // console.log(x)
        if(isIDInRange(x[1].min, x[1].max)){
            category = x[1].category
            subCategory = x[0]
            // console.log("found")
        }
    })

    // console.log(Object.entries(catogeryRangeList).length)
    return [overallCategory, category, subCategory]
}

// ---------------- utility-funciton -----------------------