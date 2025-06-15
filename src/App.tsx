import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import ToolPage from './pages/ToolPage';
import SubmitTool from './pages/SubmitTool';
import CompareTools from './pages/CompareTools';
import Pricing from './pages/Pricing';
import Recommendation from './pages/Recommendation';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async';
import NotFound from './pages/NotFound';
import { SecurityProvider } from '@/components/common/SecurityProvider';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SecurityProvider>
          <HelmetProvider>
            <ThemeProvider defaultTheme="light" storageKey="allaitools-theme">
              <BrowserRouter>
                <div className="min-h-screen bg-background text-foreground">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/categories/:categoryName" element={<CategoryPage />} />
                    <Route path="/tool/:toolId/:toolName" element={<ToolPage />} />
                    <Route path="/submit-tool" element={<SubmitTool />} />
                    <Route path="/compare" element={<CompareTools />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/recommend" element={<Recommendation />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Toaster />
                </div>
              </BrowserRouter>
            </ThemeProvider>
          </HelmetProvider>
        </SecurityProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
