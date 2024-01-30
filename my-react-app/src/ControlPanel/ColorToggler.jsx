import { useEffect, useContext } from "react"
// 
import { TargetContext, SearchResultContext } from "../App.jsx"
// 

function ColorToggler({ colorTheme }) {
  const { target } = useContext(TargetContext)
  const { searchResult } = useContext(SearchResultContext)

  console.log(colorTheme)
  // console.log(colorTheme)

  useEffect(() => {
    return // NOT WORKING AT THE MOMENT.

    let d = document
    if(colorTheme === "default"){


    } else if(colorTheme === "dark"){
        // dark mode
      let color1 = `rgb(21,32,43)`
      let color2 = `rgb(25,39,52)`
      let color3 = `rgb(34,48,60)`
      let color4 = `rgba(245,245,245, 0.75)`
      let color5 = `rgba(136,153,172)`
      
      
      d.querySelector("body").style.background = color3
      d.querySelectorAll("div").forEach(x => {
        x.style.background = color3
      })
      d.querySelectorAll("p").forEach(x => {
        x.style.background = color3
      })
      d.querySelectorAll("div.bg-light").forEach(x => {
        x.style.background = color3
      })

      d.querySelectorAll("div[role='tabpanel']").forEach(x => {
        x.style.background = "#FF00FF"
      })



    } else if(colorTheme === "pink"){




    }

  }, [colorTheme, target, searchResult])
  return (<></>)
}
export default ColorToggler
