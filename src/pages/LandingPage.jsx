import React, { useEffect, useState } from 'react';
// import MaterialsSection from '@components/Landing/MaterialsSection';
import ContactsSection from '@components/Landing/ContactsSection';
import ProcessSection from '@components/Landing/ProcessSection';
import HeroSection from '@components/Landing/HeroSection';
import FAQSection from '@components/Landing/FAQSection';
import ContactModal from '@components/common/ContactModal';
import Header from '@components/Header';
import Footer from '@components/Footer';
import '@styles/Landing.scss';


export default function LandingPage() {
    const [modalOpened, setModalOpened] = useState(false);

    useEffect(() => {
        document.title = "7CUT - Производство, доступное каждому";
    });

    return (<>
        <Header onOpenModalClick={() => setModalOpened(true)} />
        <HeroSection />
        <ProcessSection />
        <FAQSection />
        <ContactsSection onOpenModalClick={() => setModalOpened(true)} />
        <Footer />
        { modalOpened ? <ContactModal onClose={() => setModalOpened(false)} /> : "" }
    </>);
}
