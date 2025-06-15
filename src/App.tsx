
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Categories from './pages/Categories';
import ToolDetail from './pages/ToolDetail';
import SubmitTool from './pages/SubmitTool';
import Compare from './pages/Compare';
import Pricing from './pages/Pricing';
import ToolRecommender from './pages/ToolRecommender';
import { ThemeProvider } from 'next-themes';
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
                    <Route path="/" element={<Index />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/categories/:categoryName" element={<ToolDetail />} />
                    <Route path="/tool/:toolId/:toolName" element={<ToolDetail />} />
                    <Route path="/submit-tool" element={<SubmitTool />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/recommend" element={<ToolRecommender />} />
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
