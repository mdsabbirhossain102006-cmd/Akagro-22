
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhatWeDo from './components/WhatWeDo';
import StudentSponsorship from './components/StudentSponsorship';
import FinanceSection from './components/FinanceSection';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DonationModal from './components/DonationModal';
import AuthModal from './components/AuthModal';
import UpcomingModal from './components/UpcomingModal';
import KnowledgeModal from './components/KnowledgeModal';
import ScholarshipFormModal from './components/ScholarshipFormModal';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isKnowledgeOpen, setIsKnowledgeOpen] = useState(false);
  const [isScholarshipFormOpen, setIsScholarshipFormOpen] = useState(false);
  const [upcomingType, setUpcomingType] = useState<'impact' | 'audit' | 'project' | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const openDonationModal = () => setIsDonationModalOpen(true);
  const closeDonationModal = () => setIsDonationModalOpen(false);
  
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openKnowledgeModal = () => setIsKnowledgeOpen(true);
  const closeKnowledgeModal = () => setIsKnowledgeOpen(false);

  const openScholarshipForm = () => setIsScholarshipFormOpen(true);
  const closeScholarshipForm = () => setIsScholarshipFormOpen(false);

  const openImpactModal = () => setUpcomingType('impact');
  const openAuditModal = () => setUpcomingType('audit');
  const openProjectUpcomingModal = () => setUpcomingType('project');
  const closeUpcomingModal = () => setUpcomingType(null);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="overflow-hidden"
          >
            <CustomCursor />
            <Navbar onDonateClick={openDonationModal} onAuthClick={openAuthModal} />
            <Hero 
              onDonateClick={openDonationModal} 
              onImpactClick={openImpactModal} 
              onKnowledgeClick={openKnowledgeModal}
            />
            <About />
            <WhatWeDo onScholarshipClick={openScholarshipForm} />
            <StudentSponsorship onSponsorClick={openDonationModal} />
            <FinanceSection onAuditClick={openAuditModal} />
            <Projects onSponsorClick={openDonationModal} onNotifyClick={openProjectUpcomingModal} />
            <Gallery />
            <Team />
            <Contact />
            <Footer />
            
            <AnimatePresence>
              {isDonationModalOpen && (
                <DonationModal onClose={closeDonationModal} />
              )}
              {isAuthModalOpen && (
                <AuthModal onClose={closeAuthModal} />
              )}
              {isKnowledgeOpen && (
                <KnowledgeModal onClose={closeKnowledgeModal} />
              )}
              {isScholarshipFormOpen && (
                <ScholarshipFormModal onClose={closeScholarshipForm} />
              )}
              {upcomingType === 'impact' && (
                <UpcomingModal 
                  onClose={closeUpcomingModal} 
                  title="UPCOMING"
                  subtitle="Impact Report 2026"
                  description="We are currently auditing our 2025 performance data. The full interactive impact visualization will launch in January 2026."
                />
              )}
              {upcomingType === 'audit' && (
                <UpcomingModal 
                  onClose={closeUpcomingModal} 
                  title="UPCOMING"
                  subtitle="Fiscal Audit Access"
                  description="Our third-party financial verification process for Q4 2025 is currently in progress. The downloadable PDF report will be verified and uploaded shortly."
                />
              )}
              {upcomingType === 'project' && (
                <UpcomingModal 
                  onClose={closeUpcomingModal} 
                  title="UPCOMING"
                  subtitle="Project Notification System"
                  description="We are developing a real-time notification system to keep our sponsors updated. This feature will be live soon."
                />
              )}
            </AnimatePresence>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
