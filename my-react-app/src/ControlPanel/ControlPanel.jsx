import Button from 'react-bootstrap/Button';
// 
import { GrRevert } from "react-icons/gr";
// 
function ControlPanel() {
    return (
        <>
            <div className='buttonSetting'>
                <Button href="https://royals-droppy-v2-mobile.netlify.app/">
                    <GrRevert />
                </Button>
            </div>
        </>
    );
}

export default ControlPanel