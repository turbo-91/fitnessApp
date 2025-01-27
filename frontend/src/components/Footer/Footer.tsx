import { Link } from "react-router-dom";
import {FooterContainer} from "./Footer.styles.ts";


function Footer() {


    return (
        <FooterContainer>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <p>workout</p>
            </Link>
            <Link to="/history" style={{ textDecoration: "none", color: "white" }}>
                <p>workout history</p>
            </Link>
        </FooterContainer>
    );
}

export default Footer
