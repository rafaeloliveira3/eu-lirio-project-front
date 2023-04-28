import { Link } from "react-router-dom"
import { Container, NavBar } from "./styles"

export const Content = (props) => {

    return (
        <Container>
            <NavBar>
                <Link to={`/app/profile/${props?.author?.id_usuario}`} className="author">
                    <img src={props?.author?.foto} alt="" />
                    <span className="author-name">por <span>@{props?.author?.user_name}</span></span>
                </Link>
                <ul className="nav-bar">
                    <li>
                        <Link to="/app/feed">
                            <i className="fa-solid fa-spa"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/app/me">
                            <i className="fa-solid fa-user"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/app/favorites">
                            <i className="fa-solid fa-bookmark"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/app/read">
                            <i className="fa-solid fa-check-circle"></i>

                        </Link>
                    </li>
                    <li>   
                        <Link>
                            <i className="fa-solid fa-swatchbook"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/app/my-publications">
                            <i className="fa-solid fa-pen"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/app/cart">
                            <i className="fa-solid fa-shopping-cart"></i>
                        </Link>
                    </li>
                    <li>
                        <Link>
                            <i className="fa-solid fa-crown"></i>
                        </Link>
                    </li>
                </ul>
            </NavBar>
        </Container>
    )
}