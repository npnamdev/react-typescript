import Box from "./components/context/Box";
import { ThemeContextProvider } from "./components/context/ThemeContext";

const App = () => {
  return (
    <main className="">
      <ThemeContextProvider>
        <Box />
      </ThemeContextProvider> 
    </main>
  )
}

export default App;