import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ReceiptUpload from "./pages/ReceiptUpload";
import Expenses from "./pages/Expenses";
import Documents from "./pages/Documents";

const queryClient = new QueryClient();

const isAuthenticated = () => {
  try {
    const raw = localStorage.getItem("ai-receipt-auth");
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return typeof parsed?.pin === "string" && parsed.pin.length === 6;
  } catch {
    return false;
  }
};

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={isAuthenticated() ? <Index /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/upload"
              element={isAuthenticated() ? <ReceiptUpload /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/expenses"
              element={isAuthenticated() ? <Expenses /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/documents"
              element={isAuthenticated() ? <Documents /> : <Navigate to="/login" replace />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

