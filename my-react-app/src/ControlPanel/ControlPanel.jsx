import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Row'
import ReactAudioPlayer from 'react-audio-player';
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
    // console.log(audioRef)

    return (
        <>
            <ReactAudioPlayer
                src="/maple-bgm.mp3"
                autoPlay
                loop
                volume={0.5}
                ref = {audioRef}
            />

            <div className='position-fixed top-0 end-0 m-3'>
                <Button onClick={handleShow} className="mx-2 px-2 d-flex bg-maple-bg-1 border border-maple-border-1">
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
                            <Badge pill bg="secondary">Music</Badge>
                            <IoIosMusicalNote />
                            <input type="range" 
                                min="0" 
                                max="1" 
                                step="0.1" 
                                defaultValue={0.5}
                                className='form-range w-50' 
                                onChange={handleInputBarChange}/>
                            <FaPlay onClick={playAudio}/>
                            <FaPauseCircle onClick={pauseAudio}/>
                        </div>
                        <div className='d-flex column-gap-3 align-items-center m-1 mt-3 p-1'>
                            <Badge pill bg="secondary">Theme</Badge>
                            <ButtonGroup className='w-75' >
                                <Button variant="secondary"><TbCircleNumber1 /></Button>
                                <Button variant="secondary"><TbCircleNumber2 /></Button>
                                <Button variant="secondary"><TbCircleNumber3 /></Button>
                            </ButtonGroup>
                        </div>
                    </div>

                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default ControlPanel