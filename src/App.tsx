import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MainPage from './page/MainPage';
import MyPage from './page/Mypage';
import ConvertPage from './page/ConvertPage';
import NavBar from './component/base/Navbar';
import { StyledToastConatiner } from './styles/ToastStyle';
import 'react-toastify/dist/ReactToastify.css';
import { ConvertDataProvider } from './context/convertDataContext';
import { MainPageAnimateProvider } from './context/mainAnimationContext';
import { useTokenModal } from './context/tokenModalContext';
import TokenExpireModal from './component/base/TokenExpireModal';

// initialize queryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

const App = () => {
  const { modalIsOpen, closeModal } = useTokenModal();

  return (
    <>
      <MainPageAnimateProvider>
        <ConvertDataProvider>
          <QueryClientProvider client={queryClient}>
            <Router>
              <NavBar />
              <Routes>
                <Route path="/" element={<Navigate to="/main" replace />} />
                <Route path="/main/" element={<MainPage />} />
                <Route path="/mypage/" element={<MyPage />} />
                <Route path="/convert/" element={<ConvertPage />} />
              </Routes>
            </Router>
          </QueryClientProvider>
        </ConvertDataProvider>
      </MainPageAnimateProvider>
      <StyledToastConatiner limit={1} />
      {/* token expire modal */}
      <TokenExpireModal isOpen={modalIsOpen} setModalIsOpen={closeModal} />
    </>
  );
};

export default App;
