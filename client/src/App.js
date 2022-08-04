import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllRoutes from "./routes/AllRoutes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Footer from "./components/Footer/Footer";
import "./styles/App.css";
import ScrollToTop from "./hoc/ScrollToTop";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ScrollToTop>
          <>
            <Header />
            <AllRoutes />
            <Footer />
          </>
        </ScrollToTop>
        <ToastContainer theme='colored' />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
