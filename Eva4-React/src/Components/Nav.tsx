import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"

export default function Nav() {
    return (
        <div className="flex-container fixed-top">
        <div className="Nav">
            <header className="showcase">
                <nav role="nav">
                    <ul>
                        <li><a href="#home"> Home </a></li>
                        <li><a href="#about"> Quienes somos </a></li>
                        <li><a href="#contactForm">¡Inscríbete ahora!</a></li>
                    </ul>
                </nav>
            </header>
        </div>
    </div>
    )
}