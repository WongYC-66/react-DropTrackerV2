import Image from 'react-bootstrap/Image';
import { useContext } from 'react';
// 
import { TargetContext } from '../App';
import TargetBoxHeader from '../TargetBox/TargetBoxHeader.jsx';

function Header() {
  const { target } = useContext(TargetContext)
  const hasTarget = Object.keys(target).length >= 1
  // console.log(hasTarget)
  // return (<div className="header grid-item item-a">im header box</div>)

  return (
    <>
      {hasTarget &&
        <div className="d-flex flex-column justify-content-between h-100">
          <h1 className='h5 bg-light m-2 p-2 rounded'>{target.name}</h1>
          <hr></hr>
          <div className="bg-light mx-2 mb-2 p-0 rounded flex-grow-1">
            <TargetBoxHeader/>
          </div>
          <Image src="./owl.png" className='d-block mx-auto rounded w-100' alt="image not found" fluid ></Image>
        </div>
      }

      {!hasTarget &&
        <div className="d-flex flex-column justify-content-between h-100">
          <h1 className='h5 bg-light m-2 p-2 rounded'>SCOTTY's DROP TRACKER</h1>
          <hr></hr>
          <div className="bg-light m-2 p-2 rounded">
            <p>This website not affiliated, associated, authorized, endorsed by, or in any way officially connected with MapleRoyals.</p>
            <p>The drop data used for this website was taken from the Monster Book data in the Data folder of the MapleRoyals</p>
            <p>Images were taken from <a href="https://maplestory.io/">maplestory.io</a></p>
            <p>Inspired by and Credited to : <a href="https://royals-drops.herokuapp.com/#/search/mobs/100100">Shanmango</a></p>
            <p>Created by: ScottY5C</p>
            <p>Designed by: NerZu</p>
          </div>
          <Image src="./owl.png" className='d-block mx-auto rounded w-100' alt="image not found" fluid ></Image>
        </div>
      }
    </>

  )
}

export default Header
