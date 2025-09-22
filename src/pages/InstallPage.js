import React, { useState } from 'react';

function InstallPage() {
  const [installedMods, setInstalledMods] = useState([
    {
      id: 1,
      title: "Neon Horizons",
      author: "CyberCrafter",
      version: "1.2.3",
      status: "installed",
      lastUpdated: "2 days ago",
      size: "2.1 GB"
    },
    {
      id: 2,
      title: "Data Stream",
      author: "NetRunner",
      version: "0.9.1",
      status: "update_available",
      lastUpdated: "1 week ago",
      size: "856 MB"
    }
  ]);

  const [recentDownloads] = useState([
    {
      id: 3,
      title: "Ghost Protocol",
      author: "ShadowDev",
      progress: 100,
      status: "completed"
    },
    {
      id: 4,
      title: "Neural Network",
      author: "AICodex",
      progress: 67,
      status: "downloading"
    },
    {
      id: 5,
      title: "Urban Decay",
      author: "CityBuilder",
      progress: 0,
      status: "queued"
    }
  ]);

  const handleUninstall = (modId) => {
    setInstalledMods(prev => prev.filter(mod => mod.id !== modId));
  };

  const handleUpdate = (modId) => {
    setInstalledMods(prev =>
      prev.map(mod =>
        mod.id === modId
          ? { ...mod, status: 'installed', lastUpdated: 'Just now' }
          : mod
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'installed': return 'text-green-400';
      case 'update_available': return 'text-yellow-400';
      case 'downloading': return 'text-blue-400';
      case 'queued': return 'text-gray-400';
      case 'completed': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'installed': return 'Installed';
      case 'update_available': return 'Update Available';
      case 'downloading': return 'Downloading';
      case 'queued': return 'Queued';
      case 'completed': return 'Completed';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Mod Manager
          </h1>
          <p className="text-gray-300">
            Manage your installed mods, check for updates, and monitor downloads.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">
              {installedMods.filter(mod => mod.status === 'installed').length}
            </div>
            <div className="text-sm text-gray-400">Installed Mods</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">
              {installedMods.filter(mod => mod.status === 'update_available').length}
            </div>
            <div className="text-sm text-gray-400">Updates Available</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">
              {recentDownloads.filter(mod => mod.status === 'downloading').length}
            </div>
            <div className="text-sm text-gray-400">Downloading</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-400">
              {installedMods.reduce((total, mod) => total + parseFloat(mod.size), 0).toFixed(1)} GB
            </div>
            <div className="text-sm text-gray-400">Total Size</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Installed Mods */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Installed Mods</h2>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm transition-colors">
                Update All
              </button>
            </div>

            <div className="space-y-3">
              {installedMods.map(mod => (
                <div key={mod.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded"></div>
                        <div>
                          <h3 className="font-semibold">{mod.title}</h3>
                          <p className="text-sm text-gray-400">by {mod.author}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center px-4">
                      <div className="text-sm text-gray-400">Version</div>
                      <div className="font-mono text-sm">{mod.version}</div>
                    </div>
                    
                    <div className="text-center px-4">
                      <div className="text-sm text-gray-400">Status</div>
                      <div className={`text-sm font-semibold ${getStatusColor(mod.status)}`}>
                        {getStatusText(mod.status)}
                      </div>
                    </div>
                    
                    <div className="text-center px-4">
                      <div className="text-sm text-gray-400">Size</div>
                      <div className="text-sm">{mod.size}</div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {mod.status === 'update_available' && (
                        <button
                          onClick={() => handleUpdate(mod.id)}
                          className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-xs transition-colors"
                        >
                          Update
                        </button>
                      )}
                      <button className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-xs transition-colors">
                        Configure
                      </button>
                      <button
                        onClick={() => handleUninstall(mod.id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs transition-colors"
                      >
                        Uninstall
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-400">
                    Last updated: {mod.lastUpdated}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Downloads */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Downloads</h2>
            
            <div className="space-y-3">
              {recentDownloads.map(download => (
                <div key={download.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-teal-600 rounded"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{download.title}</h4>
                      <p className="text-xs text-gray-400">by {download.author}</p>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className={`text-xs font-semibold ${getStatusColor(download.status)}`}>
                      {getStatusText(download.status)}
                    </div>
                  </div>
                  
                  {download.status === 'downloading' && (
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>{download.progress}%</span>
                        <span>2.1 MB/s</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${download.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    {download.status === 'downloading' && (
                      <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs transition-colors">
                        Cancel
                      </button>
                    )}
                    {download.status === 'completed' && (
                      <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs transition-colors">
                        Install
                      </button>
                    )}
                    {download.status === 'queued' && (
                      <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs transition-colors">
                        Start
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-3 text-left transition-colors">
                  <div className="font-semibold text-sm">Install from File</div>
                  <div className="text-xs text-gray-400">Install a mod from a local file</div>
                </button>
                <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-3 text-left transition-colors">
                  <div className="font-semibold text-sm">Verify Integrity</div>
                  <div className="text-xs text-gray-400">Check all mods for corruption</div>
                </button>
                <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-3 text-left transition-colors">
                  <div className="font-semibold text-sm">Clear Cache</div>
                  <div className="text-xs text-gray-400">Free up disk space</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstallPage;