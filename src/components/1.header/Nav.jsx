import "./style.css";
import {logo} from "../../assets";
const Nav = () => {
    return (
        <header className="header-class ">
            <nav className="flex justify-between pt-2">
                <img className="" src={logo} />
                <button className="black_btn"
                onClick={()=> window.open("https://github.com/mo634")}
                >GitHub</button>
            </nav>
        </header>
    );
};

export default Nav;
