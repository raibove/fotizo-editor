import { Button, Flex, Heading, Text } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

const Landing = ()=> {
    const navigate = useNavigate();

    return (
        <Flex alignItems='center' marginTop='25vh' direction='column' style={{flexGrow: 1}}>
            <Heading level={2} color='white' fontStyle='italic'>Edit. Enhance. Share.</Heading>
            <Text as='p' variation='primary' color='white' fontSize={20}>Simplicity at your fingertips</Text>
            <Button variation="primary" size="small" isFullWidth={false} onClick={()=>{navigate('/upload')}}>Get Started</Button>
        </Flex>
    )
}

export default Landing;