import TestCallAPI from "./components/TestCallAPI";
import TreeExample from "./components/TreeExample";
import Box from "./components/context/Box";
import { ThemeContextProvider } from "./components/context/ThemeContext";

const App = () => {
  return (
    <main className="">
      {/* <ThemeContextProvider>
        <Box />
      </ThemeContextProvider>  */}
      {/* <TreeExample/> */}
      <TestCallAPI/>
    </main>
  )
}

export default App;