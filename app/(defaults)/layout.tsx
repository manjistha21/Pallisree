'use client';
import { useEffect, useState } from 'react';
import ContentAnimation from '@/components/layouts/content-animation';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import MainContainer from '@/components/layouts/main-container';
import Overlay from '@/components/layouts/overlay';
import ScrollToTop from '@/components/layouts/scroll-to-top';
import Setting from '@/components/layouts/setting';
import Sidebar from '@/components/layouts/sidebar';
import Portals from '@/components/portals';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    const [isLoginPage, setIsLoginPage] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const currentPath = window.location.pathname;
            console.log("Current pathname:", currentPath);
            setIsLoginPage(currentPath === "/login");
            setIsLoggedIn(currentPath !== "/login" && currentPath !== "/");
        }
    }, []);
    return (
        <>
            {/* BEGIN MAIN CONTAINER */}
            <div className="relative">
                <Overlay />
                <ScrollToTop />

                {/* BEGIN APP SETTING LAUNCHER */}
                <Setting />
                {/* END APP SETTING LAUNCHER */}

                <MainContainer>
                    {/* BEGIN SIDEBAR */}
                    {!isLoginPage && isLoggedIn && <Sidebar />}
                    {/* END SIDEBAR */}
                    <div className="main-content flex min-h-screen flex-col">
                        {/* BEGIN TOP NAVBAR */}
                        {!isLoginPage && isLoggedIn && <Header />}
                        {/* END TOP NAVBAR */}

                        {/* BEGIN CONTENT AREA */}
                        <ContentAnimation>{children}</ContentAnimation>
                        {/* END CONTENT AREA */}

                        {/* BEGIN FOOTER */}
                    
                        {/* END FOOTER */}
                        <Portals />
                    </div>
                </MainContainer>
            </div>
        </>
    );
}
