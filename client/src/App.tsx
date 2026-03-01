import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Domains from "./pages/Domains";
import DomainDetail from "./pages/DomainDetail";
import Overview from "./pages/Overview";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/domains"} component={Domains} />
      <Route path={"/domain/:domainId"} component={DomainDetail} />
      <Route path={"/domains/:domainId"} component={DomainDetail} />
      <Route path={"/overview"} component={Overview} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
