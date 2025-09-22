import React, { useState } from 'react';

function DashboardPage() {
  const [user] = useState({
    name: "CyberCreator",
    email: "creator@example.com",
    joinDate: "January 2024",
    level: "Pro Developer",
    avatar: null
  });

  const [stats] = useState({
    modsPublished: 12,
    totalDownloads: "2.4M",
    rating: 4.8,
    followers: "15.7K",
    revenue: "$3,240"
  });

  const [projects] = useState([
    {
      id: 1,
      name: "Neon Horizons",
      status: "published",
      downloads: "890K",
      rating: 4.9,
      lastUpdate: "2 days ago",
      revenue: "$1,240"
    },
    {
      id: 2,
      name: "Cyber Interface",
      status: "in_review",
      downloads: "0",
      rating: 0,
      lastUpdate: "5 days ago",
      revenue: "$0"
    },
    {
      id: 3,
      name: "Data Stream Pro",
      status: "draft",
      downloads: "0",
      rating: 0,
      lastUpdate: "1 week ago",
      revenue: "$0"
    }
  ]);

  const [notifications] = useState([
    {
      id: 1,
      type: "revenue",
      message: "You earned $45.20 from mod downloads",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      type: "review",
      message: "New 5-star review on Neon Horizons",
      time: "6 hours ago",
      unread: true
    },
    {
      id: 3,
      type: "follower",
      message: "10 new followers this week",
      time: "1 day ago",
      unread: false
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'text-green-400 bg-green-900';
      case 'in_review': return 'text-yellow-400 bg-yellow-900';
      case 'draft': return 'text-gray-400 bg-gray-800';
      default: return 'text-gray-400 bg-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'published': return 'Published';
      case 'in_review': return 'In Review';
      case 'draft': return 'Draft';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Creator Dashboard
          </h1>
          <p className="text-gray-300">
            Manage your mods, track performance, and grow your creator profile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                  👤
                </div>
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-gray-400 text-sm">{user.level}</p>
                <p className="text-gray-500 text-xs">Member since {user.joinDate}</p>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors">
                  Edit Profile
                </button>
                <button className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition-colors">
                  View Public Profile
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h4 className="font-bold mb-4">Quick Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Mods</span>
                  <span className="font-bold">{stats.modsPublished}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Downloads</span>
                  <span className="font-bold text-blue-400">{stats.totalDownloads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rating</span>
                  <span className="font-bold text-yellow-400">⭐ {stats.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Followers</span>
                  <span className="font-bold text-green-400">{stats.followers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Revenue</span>
                  <span className="font-bold text-purple-400">{stats.revenue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="text-2xl font-bold text-blue-400">{stats.totalDownloads}</div>
                <div className="text-sm text-gray-400">Total Downloads</div>
                <div className="text-xs text-green-400 mt-1">+12.5% this month</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="text-2xl font-bold text-green-400">{stats.revenue}</div>
                <div className="text-sm text-gray-400">Total Revenue</div>
                <div className="text-xs text-green-400 mt-1">+8.3% this month</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="text-2xl font-bold text-yellow-400">{stats.rating}</div>
                <div className="text-sm text-gray-400">Average Rating</div>
                <div className="text-xs text-yellow-400 mt-1">Based on 1.2K reviews</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="text-2xl font-bold text-purple-400">{stats.followers}</div>
                <div className="text-sm text-gray-400">Followers</div>
                <div className="text-xs text-green-400 mt-1">+156 this week</div>
              </div>
            </div>

            {/* Your Projects */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Your Projects</h2>
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors">
                  + New Project
                </button>
              </div>

              <div className="space-y-4">
                {projects.map(project => (
                  <div key={project.id} className="bg-gray-900 border border-gray-600 rounded-lg p-4 hover:border-gray-500 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded"></div>
                        <div>
                          <h3 className="font-semibold">{project.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-1 rounded ${getStatusColor(project.status)}`}>
                              {getStatusText(project.status)}
                            </span>
                            <span className="text-xs text-gray-400">Updated {project.lastUpdate}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <div className="font-bold">{project.downloads}</div>
                          <div className="text-gray-400">Downloads</div>
                        </div>
                        {project.rating > 0 && (
                          <div className="text-center">
                            <div className="font-bold text-yellow-400">⭐ {project.rating}</div>
                            <div className="text-gray-400">Rating</div>
                          </div>
                        )}
                        <div className="text-center">
                          <div className="font-bold text-green-400">{project.revenue}</div>
                          <div className="text-gray-400">Revenue</div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors">
                          Edit
                        </button>
                        <button className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm transition-colors">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity & Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Notifications */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Notifications</h3>
                <div className="space-y-3">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border-l-4 ${
                        notification.unread
                          ? 'bg-gray-900 border-blue-500'
                          : 'bg-gray-900/50 border-gray-600'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  View All Notifications
                </button>
              </div>

              {/* Analytics Preview */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Analytics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Downloads this month</span>
                      <span className="text-blue-400">+12.5%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Revenue growth</span>
                      <span className="text-green-400">+8.3%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Community engagement</span>
                      <span className="text-purple-400">+15.7%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm transition-colors">
                  View Detailed Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;