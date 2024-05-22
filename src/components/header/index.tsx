import { Button, Flex } from "@aws-amplify/ui-react";
import './styles.css';

const Header = ()=> {
    return (
        <Flex  direction={{ base: 'column', large: 'row' }} justifyContent="space-between" className="header-con">
            <h3 className="header-title">Fotizo</h3>
            <Flex >
                <Button size="small" isFullWidth={false}>Download</Button>
                <Button variation="primary" size="small" isFullWidth={false}>Share</Button>
            </Flex>
        </Flex>
    )
}

export default Header;