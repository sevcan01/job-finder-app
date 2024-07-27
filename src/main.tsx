
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Modal from 'react-modal';
import App from './App';
import './index.css';

const queryClient = new QueryClient();
const rootElement = document.getElementById('root');


Modal.setAppElement(rootElement!);

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
