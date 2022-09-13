import MyEditor from "./components/organisms/CustomEditor";
import { theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import './CustomEditor.css';


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MyEditor />
    </ThemeProvider>
  );
}

export default App;
