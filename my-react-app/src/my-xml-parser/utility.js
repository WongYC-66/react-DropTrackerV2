import * as fs from 'fs';
import util from 'util'

// import * as parse from 'xml-parser';
import parse from 'xml-parser'
import { legacyTextCheck } from './dataFormatting.js'


export function diskWriter(path, simpleData) {
    try {
        fs.writeFileSync(path, JSON.stringify(simpleData));
        console.log("Writing" + path)

        // file written successfully
    } catch (err) {
        console.error(err);
    }
}

export async function parseXML(FilePath) {
    console.log("Reading" + FilePath)
    // read and parsing xml file from e.g. MonsterBook.img.xml 
    var xml = fs.readFileSync(FilePath, 'utf8');
    var inspect = util.inspect;
    var obj = parse(xml);
    // console.log(inspect(obj, { colors: true, depth: Infinity }));
    return obj
}

export function parseItemJSON(x){
        let property1
        let property1Value 
        let property2
        let property2Value 

        // console.log(x)
        try{
            property1 = x.children[0].attributes.name
            property1Value = x.children[0].attributes.value
            property1Value = legacyTextCheck(property1Value)
        } catch {
            property1Value = ''
        }

        try{
            property2 = x.children[1].attributes.name
            property2Value = x.children[1].attributes.value
            property2Value = legacyTextCheck(property2Value)
        } catch {
            property2Value = ''
        }
        // console.log({property1, property1Value, property2, property2Value})
        let newObj = {}
        newObj[property1] = property1Value
        newObj[property2] = property2Value

        return newObj // {"name":"Red Potion","desc":"A potion made out of red herbs.\\nRecovers 50 HP."}
}

// module.exports = {
//     diskWriter,
//     parseXML,
// };