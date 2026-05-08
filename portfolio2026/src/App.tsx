import './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from './pages/NotFound';
import { LanguageProvider } from './i18n/LanguageProvider';
import { Toaster } from './components/ui/toaster';

const queryClient = new QueryClient;

const App = () => (
  <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster/>
          <Sonner/>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Index />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
  </QueryClientProvider>
);

export default App;
