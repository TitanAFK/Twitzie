import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@repo/ui";
import { DashboardAppBar } from "../../components/dashboard/DashboardAppBar";
import { prisma } from "@repo/db/client";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
  
    if (!session || !session.user) {
      redirect("/auth");
    }

    const userId = session.user.id;
    const tweets = await prisma.tweet.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
  
    return (
      <div className="dashboard-page">
        <DashboardAppBar />
        
        <div className="dashboard-content container">
            {/* Welcome Section */}
            <div className="dashboard-header">
                <h1 className="dashboard-title">
                    Dashboard
                </h1>
                <p className="dashboard-subtitle">
                    Welcome back, <span className="highlight">{session.user?.name || session.user?.email}</span>. 
                    Ready to create some viral content?
                </p>
            </div>

            {/* Main Grid */}
            <div className="dashboard-grid">
                
                {/* Create New Tweet Card / Enhanced Tweets Card */}
                <div className="dashboard-card create-tweet-card glass group">
                    <div className="card-glow-effect blue" />
                    
                    <div className="card-header-flex">
                      <h2 className="card-title">Enhanced Tweets</h2>
                      <Link href="/create" className="card-header-action">
                          <Button className="btn btn-primary btn-sm">
                              Create New
                          </Button>
                      </Link>
                    </div>

                    {tweets.length === 0 ? (
                      <div className="empty-state">
                          <div className="empty-icon-wrapper">
                              <svg className="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                          </div>
                          <p className="empty-text">You haven't enhanced any tweets yet.</p>
                          <Link href="/create">
                              <Button className="btn btn-primary">
                                  Create New Tweet
                              </Button>
                          </Link>
                      </div>
                    ) : (
                      <div className="tweets-list custom-scrollbar">
                        {tweets.map((tweet) => (
                           <div key={tweet.id} className="tweet-item">
                               <div className="tweet-header">
                                   <span className="tweet-date">
                                       {new Date(tweet.createdAt).toLocaleDateString(undefined, {
                                           year: 'numeric', month: 'short', day: 'numeric',
                                           hour: '2-digit', minute: '2-digit'
                                       })}
                                   </span>
                                   <div className="tweet-badges">
                                       <span className="tweet-badge tone">{tweet.tone.toLowerCase()}</span>
                                       <span className="tweet-badge length">{tweet.length.toLowerCase()}</span>
                                   </div>
                               </div>
                               <div className="tweet-content">
                                   <p className="original-text">"{tweet.originalText}"</p>
                                   <div className="arrow-down">
                                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                                   </div>
                                   <p className="improved-text">{tweet.improvedText}</p>
                               </div>
                           </div>
                        ))}
                      </div>
                    )}
                </div>

                {/* Stats / Quick Info Card */}
                <div className="dashboard-card stats-card glass">
                     <div className="card-glow-effect purple" />
                     <h2 className="card-title">Quick Stats</h2>
                     
                     <div className="stats-list">
                        <div className="stat-item">
                            <p className="stat-label">Total Enhancements</p>
                            <p className="stat-value">{tweets.length}</p>
                        </div>
                        <div className="stat-item">
                            <p className="stat-label">Credits Remaining</p>
                            <p className="stat-value">Infinite</p>
                        </div>
                     </div>
                </div>
            </div>
        </div>
      </div>
    );
}
