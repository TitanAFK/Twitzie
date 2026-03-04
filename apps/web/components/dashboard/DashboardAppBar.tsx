"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export const DashboardAppBar = () => {
    const { data: session } = useSession();
    const [showSidebar, setShowSidebar] = useState(false);
  
    const userName = session?.user?.name || session?.user?.email || "User";
    const userEmail = session?.user?.email;
    // Use session image or fallback to DiceBear initial avatar
    const userImage = session?.user?.image || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(userName)}`;
  
    const handleSignOut = async () => {
      try {
        await signOut({ callbackUrl: "/" });
      } catch (error) {
        console.error("SignOut error:", error);
        // Fallback force redirect if API fails
        window.location.href = "/";
      }
    };
  
    return (
      <>
        <nav className="navbar glass">
          <div className="container navbar-content">
            <Link href="/" className="logo">
                twitzie<span>.</span>
            </Link>
  
            {/* Profile Trigger */}
            <button
                onClick={() => setShowSidebar(true)}
                className="profile-btn"
                aria-label="Open profile sidebar"
            >
                <div className="profile-info-desktop">
                    <span className="profile-name">{userName}</span>
                </div>
                
                <div className="profile-avatar-wrapper">
                    <img
                        src={userImage}
                        alt={userName}
                        className="profile-avatar"
                    />
                    <div className="status-dot"></div>
                </div>
            </button>
          </div>
        </nav>
  
        {/* Sidebar Overlay */}
        <div 
          className={`sidebar-overlay ${showSidebar ? "active" : ""}`}
          onClick={() => setShowSidebar(false)}
        />
  
        {/* Sidebar */}
        <div 
          className={`sidebar ${showSidebar ? "active" : ""}`}
        >
            <div className="sidebar-header">
                <h2 className="sidebar-title">Profile</h2>
                <button 
                    onClick={() => setShowSidebar(false)}
                    className="sidebar-close-btn"
                    aria-label="Close sidebar"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
            
            <div className="sidebar-user-section">
                <div className="sidebar-avatar-wrapper">
                    <img
                        src={userImage}
                        alt={userName}
                        className="sidebar-avatar"
                    />
                </div>
                <h3 className="sidebar-username">{userName}</h3>
                {userEmail && <p className="sidebar-email">{userEmail}</p>}
                
                <div className="sidebar-badges">
                    <span className="badge-pro">
                        Pro Plan
                    </span>
                </div>
            </div>
  
            <div className="sidebar-nav">
                <Link
                    href="/dashboard"
                    className="sidebar-link group"
                    onClick={() => setShowSidebar(false)}
                >
                    <div className="sidebar-link-icon">
                        <User className="w-4 h-4" />
                    </div>
                    Account Settings
                </Link>
                {/* Additional Sidebar Links could go here */}
            </div>
  
            <div className="sidebar-footer">
                <button
                    onClick={handleSignOut}
                    className="sidebar-logout"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </div>
      </>
    );
  };
