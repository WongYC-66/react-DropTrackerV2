import Button from 'react-bootstrap/Button';
// 
import { GrRevert } from "react-icons/gr";
// 
function ControlPanel() {
    return (
        <>
            <div className='buttonSetting'>
                <a href="https://royals-droppy-v2-mobile.netlify.app/">
                    <Button>
                        <GrRevert />
                    </Button>
                </a>
            </div>
        </>
    );
}

export default ControlPanel