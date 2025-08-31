import React from "react";
import './App.css';

import { ThemeProvider } from "./context/ThemeContext";

import Header from './components/Header';
import Home from './components/Home';
import Work from './components/Work';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AnimatedBackground from "./components/AnimatedBackground";

function App() {
  return (
    <ThemeProvider>
      <Header />
      <main className="pt-16 relative min-h-screen">
        {/* Animated Gradient Background */}
        <AnimatedBackground />

        {/* Page Content */}
        <Home />
        <Work />
        <Projects />
        <Contact />
      </main>
    </ThemeProvider>
  );
}

export default App;
