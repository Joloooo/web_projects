import './Navbar.css';


const Navbar = () => {
    return (
        <div id="navBarDiv">
            <img id="colaID" src={`${process.env.PUBLIC_URL}/cocaCola.png`} alt="Coca Cola Logo" />
            <button className="navButton">Menu</button>
            <button className="navButton">News</button>
            <a
                href="https://github.com/Joloooo/comparison_project"
                target="_blank"
                rel="noopener noreferrer"
                className="navButton"
                id="documentationLink"
            >
                Documentation
            </a>
        </div>
    );
};

export default Navbar;
