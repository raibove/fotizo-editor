import { Flex } from "@aws-amplify/ui-react";
import './styles.css';
import { useNavigate } from "react-router-dom";

const Header = ()=> {
    const navigate=useNavigate();

    return (
        <Flex  direction={{ base: 'column', large: 'row' }} justifyContent="space-between" className="header-con">
            <h3 className="header-title" onClick={()=> navigate('/')}>Fotizo</h3>
        </Flex>
    )
}

export default Header;