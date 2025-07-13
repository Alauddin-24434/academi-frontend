import React from 'react';
import { SidebarHeader, SidebarTrigger } from '../ui/sidebar';

const DashboardHeader = () => {
    return (
        <header className='h-4 bg-background'>
            <SidebarTrigger />
            <SidebarHeader>
                
            </SidebarHeader>
        </header>
    );
};

export default DashboardHeader;