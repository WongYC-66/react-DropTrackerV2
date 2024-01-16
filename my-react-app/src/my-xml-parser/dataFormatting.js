import util from 'util'
import { parseItemJSON } from './utility.js';
var inspect = util.inspect;


export function legacyTextCheck(str) {
    // check for '
    str = str.replaceAll("&apos;", "'")

    // check for #c
    str = str.replaceAll(/#c(.+)#/g, "<b>$1</b>")

    return str
}

export function MBdataFormatting(obj) {
    // for MonsterBook.img.xml ONLY
    // Create better data-structure
    const simpleData = {}
    const arrayData = obj.root.children

    arrayData.forEach(x => {
        // if(x.attributes.name === "9420518") console.log(inspect(x, { colors: true, depth: Infinity }));
        let mobId = x.attributes.name
        let dropData = x.children.filter(y => y.attributes.name === "reward")[0].children
        let dropArray = dropData.map(obj => obj.attributes.value)

        //write to main
        simpleData[mobId] = dropArray
    })

    return simpleData
}

export function MBdataFormatting_MapOnly(obj) {
    // for MonsterBook.img.xml ONLY
    // Create better data-structure
    const simpleData = {}
    const arrayData = obj.root.children

    // const lookingObj = arrayData[0]
    // console.log(inspect(lookingObj, { colors: true, depth: Infinity }));
    arrayData.forEach(x => {
        let mobId = x.attributes.name
        let mapData = x.children.filter(obj => obj.attributes.name === 'map')[0].children.map(y => y.attributes.value)
        //write to main
        simpleData[mobId] = mapData
    })
    return simpleData
}


export function MobIdDataFormatting(obj) {
    // for Mob.img.xml ONLY
    // Create better data-structure
    const simpleData = {}
    const arrayData = obj.root.children

    arrayData.forEach(x => {
        let mobId = x.attributes.name
        let mobName = x.children[0].attributes.value
        mobName = legacyTextCheck(mobName)
        //write to main
        simpleData[mobId] = mobName
    })

    return simpleData
}

export function ConsumeItemIdDataFormatting(obj) {
    // for Consume.img.xml ONLY
    // Create better data-structure
    const simpleData = {}

    const arrayData = obj.root.children

    arrayData.forEach(x => {
        let itemId = x.attributes.name

        //write to main
        let resultObj = parseItemJSON(x)
        simpleData[itemId] = resultObj
    })
    return simpleData
}

export function EtcItemIdDataFormatting(obj) {
    // for Etc.img.xml ONLY
    // Create better data-structure
    const simpleData = {}

    const arrayData = obj.root.children[0].children
    arrayData.forEach(x => {
        let itemId = x.attributes.name

        //write to main
        let resultObj = parseItemJSON(x)
        simpleData[itemId] = resultObj
    })
    return simpleData
}

export function EqpItemIdDataFormatting(obj) {
    // for Eqp.img.xml ONLY
    // Create better data-structure
    const simpleData = {}
    const arrayData = obj.root.children[0].children
    arrayData.forEach(categoryArr => {
        categoryArr.children.forEach(x => {
            let itemId = x.attributes.name
            let itemName = x.children[0].attributes.value
            itemName = legacyTextCheck(itemName)
            //write to main
            simpleData[itemId] = itemName
        })
    })

    // console.log(simpleData)
    return simpleData
}

export function InsItemIdDataFormatting(obj) {
    // for Ins.img.xml ONLY
    // Create better data-structure
    const simpleData = {}

    const arrayData = obj.root.children
    // console.log(arrayData)
    arrayData.forEach(x => {
        let itemId = x.attributes.name

        //write to main
        let resultObj = parseItemJSON(x)
        simpleData[itemId] = resultObj
    })
    return simpleData
}

export function MapIdDataFormatting(obj) {
    // for Map.img.xml ONLY
    // Create better data-structure
    const simpleData = {}
    const arrayData = obj.root.children // array of 15 types map "victoria, ossyria, elin, weddingGL, MasteriaGL, HalloweenGL, jp, etc, singapore, event, Episode1GL, maple, CN, china, thai"

    // const lookingObj = arrayData //
    // console.log(lookingObj)
    // console.log(inspect(lookingObj, { colors: true, depth: Infinity }));

    arrayData.forEach(x => {                    // category
        // console.log(x.attributes.name)
        let mapCategory = x.attributes.name
        x.children.forEach(y => {                // map id
            let mapId = y.attributes.name
            let newObj = { mapCategory }

            y.children.forEach(z => {            // streetName, mapName, mapDesc
                let property = z.attributes.name
                if(property !== "streetName" && property !== "mapName") return // stops if not
                let propertyValue = legacyTextCheck(z.attributes.value)
                newObj[property] = propertyValue
            })
            simpleData[mapId] = newObj
        })
    })
    // console.log(simpleData)
    return simpleData
}

// module.exports = {
//     MBdataFormatting,
//     MobIdDataFormatting,
//     ConsumeItemIdDataFormatting,
//     EtcItemIdDataFormatting,
//     EqpItemIdDataFormatting,
// };