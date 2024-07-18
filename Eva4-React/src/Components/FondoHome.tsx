import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import Lala from '../assets/bboyhome.jpg';

export default function Bboy() {
    return (
        <div className='Bboycover'>
            <img src={Lala} alt="imagen bboy" />
        </div> 
        
    )
}