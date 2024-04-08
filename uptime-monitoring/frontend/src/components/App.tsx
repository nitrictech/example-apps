import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Sites } from "./Sites";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Sites />
    </QueryClientProvider>
  );
};

export default App;
