import { useEffect, useState } from "react";
import Header from "./components/header";
import { Flex, useAuthenticator } from "@aws-amplify/ui-react";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";

// const client = generateClient<Schema>();

function App() {
  const authData = useAuthenticator((context) => [context.user]);

  if(authData.authStatus === 'configuring'){
    return <div>Loading...</div>
  }
  // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  // useEffect(() => {
  //   client.models.Todo.observeQuery().subscribe({
  //     next: (data) => setTodos([...data.items]),
  //   });
  // }, []);

  // function createTodo() {
  //   client.models.Todo.create({ content: window.prompt("Todo content") });
  // }

  return (
    <Flex direction='column' height='100vh' padding='0.5rem'>
      <Header/>
      <Routes>
        <Route path='/' element={<Landing/>} />
      </Routes>
    </Flex>
  );
}

export default App;
