import { useState, useRef, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Badge from 'react-bootstrap/Badge';
import ReactAudioPlayer from 'react-audio-player';
// 
// import { ColorThemeContext } from '../App.jsx'
import ColorToggler from './ColorToggler.jsx'
// 
import { IoMdSettings } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { IoIosMusicalNote } from "react-icons/io";
import { TbCircleNumber1 } from "react-icons/tb";
import { TbCircleNumber2 } from "react-icons/tb";
import { TbCircleNumber3 } from "react-icons/tb"
// 
function ControlPanel() {
    const [show, setShow] = useState(false);
    const audioRef = useRef(null)
    // const { colorTheme, setColorTheme } = useContext(ColorThemeContext)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputBarChange = (e) => {
        audioRef.current.audioEl.current.volume = e.target.value
    }
    const playAudio = (e) => {
        audioRef.current.audioEl.current.play()
    }
    const pauseAudio = (e) => {
        audioRef.current.audioEl.current.pause()
    }
    const handleThemeChange = (value) => {
            //
        alert("color theme disabled. Author headache of this~")
        return
            //
        switch (value) {
            case 2:
                setColorTheme("dark")
                break
            case 3:
                setColorTheme("pink")
                break
            case 1:
            default:
                setColorTheme("default")
        }
    }

    // console.log(colorTheme)

    return (
        <>
            {/* <ColorToggler colorTheme={colorTheme} /> */}
            <ReactAudioPlayer
                src="/maple-bgm.mp3"
                autoPlay
                loop
                volume={0.5}
                ref={audioRef}
            />

            <div className='position-fixed top-0 end-0 m-3'>
                <Button onClick={handleShow} variant="secondary" className="mx-2 px-2 d-flex ">
                    <IoMdSettings />
                </Button>
            </div>

            <Offcanvas show={show} onHide={handleClose} placement={"top"} className="h-50">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className=''>
                        <div className='d-flex column-gap-3 align-items-center m-1 p-1'>
                            <Badge pill bg="secondary" className='px-2'>Music</Badge>
                            <IoIosMusicalNote />
                            <input type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                defaultValue={0.5}
                                className='form-range w-50'
                                onChange={handleInputBarChange} />
                            <Button variant="secondary" className="mx-2 px-2 d-flex " onClick={playAudio}> <FaPlay /> </Button>
                            <Button variant="secondary" className="mx-2 px-2 d-flex " onClick={pauseAudio}> <FaPauseCircle /> </Button>
                        </div>

                        <div className='d-flex column-gap-3 align-items-center m-1 mt-3 p-1'>
                            <Badge pill bg="secondary" className='px-2'>Theme</Badge>
                            <ButtonGroup className='w-75' >
                                <Button variant="secondary" onClick={() => handleThemeChange(1)} ><TbCircleNumber1 /></Button>
                                <Button variant="secondary" onClick={() => handleThemeChange(2)} ><TbCircleNumber2 /></Button>
                                <Button variant="secondary" onClick={() => handleThemeChange(3)} ><TbCircleNumber3 /></Button>
                            </ButtonGroup>
                        </div>

                        <div className='d-flex column-gap-3 align-items-center m-1 mt-3 p-1'>
                            <Badge pill bg="secondary" className='px-2'>Style</Badge>
                            <ButtonGroup className='w-75 ps-2 ms-1' >
                                <Button variant="secondary" href="#">Mobile</Button>
                                <Button variant="secondary" href="https://royals-droppy-v2.netlify.app/">PC</Button>
                            </ButtonGroup>
                        </div>
                    </div>

                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default ControlPanel