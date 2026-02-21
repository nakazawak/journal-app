import React from 'react';
// This layout wraps everything inside /calendar
// It defines where the main page and modal will render

export default function CalendarLayout({
    children, // The main calendar page
    modal,    // The parallel modal route
  }: {
    children: React.ReactNode;
    modal: React.ReactNode;
  }) {
  
    return (
      <>
        {/* 
          children = normal page content
          This will be your Calendar page
        */}
        <div>
          {children}
        </div>
  
        {/* 
          modal = content from app/@modal
          This only renders when a modal route is active
        */}
        {modal}
      </>
    );
  }