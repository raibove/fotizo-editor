import { Button, Flex, Heading, Text } from "@aws-amplify/ui-react";

const Landing = ()=> {
    return (
        <Flex alignItems='center' marginTop='25vh' direction='column' style={{flexGrow: 1}}>
            <Heading level={2} color='white' fontStyle='italic'>Edit. Enhance. Share.</Heading>
            <Text as='p' variation='primary' color='white' fontSize={20}>Simplicity at your fingertips</Text>
            <Button variation="primary" size="small" isFullWidth={false}>Get Started</Button>
        </Flex>
    )
}

export default Landing;