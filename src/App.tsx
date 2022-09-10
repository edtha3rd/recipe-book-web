import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Pages from "./pages";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/* <NavBar /> */}
        <Pages />
      </div>
    </QueryClientProvider>
  );
}

export default App;
