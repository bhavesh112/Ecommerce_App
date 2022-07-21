import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllRoutes from "./routes/AllRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  },
});
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <AllRoutes />
        <ToastContainer theme='colored' />
      </QueryClientProvider>
    </>
  );
}

export default App;
