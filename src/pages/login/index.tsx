import { Authenticator, Flex } from "@aws-amplify/ui-react";
import { Navigate } from "react-router-dom";

interface Props {
    isAuthenticated: boolean;
}

const Login = ({ isAuthenticated }: Props) => {

    if (isAuthenticated) {
        return <Navigate to='/upload' />
    }

    return (
        <Flex style={{ height: '100vh' }} alignContent='center' justifyContent='center'>
            <Authenticator/>
        </Flex>
    )
}

export default Login;