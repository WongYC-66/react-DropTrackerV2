import Image from 'react-bootstrap/Image';

function Header() {

  // return (<div className="header grid-item item-a">im header box</div>)

  return (
    <>
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
      <Image src="./owl.png" fluid className='mx-auto'></Image>
    </>
  )
}

export default Header
