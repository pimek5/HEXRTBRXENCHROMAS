import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function AdminPanel({ onNavigate, userMods = [], allMods = [] }) {
  const { currentUser, users, updateUserRole, addUser, deleteUser, getRoleBadge, USER_ROLES, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedMods, setSelectedMods] = useState([]);
  const [modFilter, setModFilter] = useState('all'); // all, pending, approved, featured
  const [newUserData, setNewUserData] = useState({
    username: '',
    displayName: '',
    role: USER_ROLES.USER,
    avatar: '👤'
  });

  // Default mods from ExploreMods
  const defaultMods = [
    {
      id: 1,
      title: "Holy Rengar",
      author: "@Frog",
      category: "Rengar",
      description: "Custom Holy Rengar skin mod",
      views: 1,
      downloads: 1,
      likes: 0,
      image: "https://imgur.com/AOfBnKv.png",
      tags: ["Rengar", "Holy", "Custom Skin"],
      price: "Free",
      champion: "Rengar",
      status: "approved",
      featured: false,
      uploadDate: "2025-01-15",
      authorRole: USER_ROLES.SKIN_MAKER
    },
    {
      id: 2,
      title: "Gojo Lulu",
      author: "@Frog", 
      category: "Lulu",
      description: "Gojo Satoru themed Lulu skin",
      views: 1,
      downloads: 1,
      likes: 0,
      image: "https://imgur.com/yVd5O7C.png",
      tags: ["Lulu", "Gojo", "Anime", "JJK"],
      price: "Free",
      champion: "Lulu",
      status: "approved",
      featured: true,
      uploadDate: "2025-01-14",
      authorRole: USER_ROLES.SKIN_MAKER
    },
    {
      id: 3,
      title: "Blue Archives BGM",
      author: "@aureusil",
      category: "Sound Effects",
      description: "Blue Archive background music mod",
      views: 1,
      downloads: 1,
      likes: 1,
      image: "https://imgur.com/t4Qrca4.png",
      tags: ["BGM", "Blue Archive", "Music", "Sound"],
      price: "Free",
      champion: "Global",
      status: "approved",
      featured: false,
      uploadDate: "2025-01-13",
      authorRole: USER_ROLES.USER
    },
    {
      id: 4,
      title: "Smaller Minimap Icons",
      author: "@Moga",
      category: "HUD/UI",
      description: "Reduces the size of minimap icons for better visibility",
      views: 3,
      downloads: 2,
      likes: 2,
      image: "https://imgur.com/wPO8AkO.png",
      tags: ["Minimap", "UI", "Icons", "Visibility"],
      price: "Free",
      champion: "Global",
      status: "approved",
      featured: false,
      uploadDate: "2025-01-12",
      authorRole: USER_ROLES.USER
    }
  ];

  // Combine all mods with user-posted mods
  const combinedMods = [
    ...defaultMods,
    ...userMods.map(mod => ({
      ...mod,
      status: mod.status || 'pending',
      featured: mod.featured || false,
      uploadDate: mod.uploadDate || new Date().toISOString().split('T')[0],
      authorRole: USER_ROLES.USER
    }))
  ];

  // Filter mods based on selected filter
  const filteredMods = combinedMods.filter(mod => {
    switch (modFilter) {
      case 'pending':
        return mod.status === 'pending';
      case 'approved':
        return mod.status === 'approved';
      case 'featured':
        return mod.featured;
      default:
        return true;
    }
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (addUser(newUserData)) {
      setNewUserData({
        username: '',
        displayName: '',
        role: USER_ROLES.USER,
        avatar: '👤'
      });
      setShowAddUser(false);
    }
  };

  const handleRoleChange = (userId, newRole) => {
    updateUserRole(userId, newRole);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
    }
  };

  // Mod management functions
  const handleModAction = (modId, action) => {
    // In a real app, this would update the mod in a database
    console.log(`${action} mod ${modId}`);
    
    // For now, we'll just show feedback
    const mod = combinedMods.find(m => m.id === modId);
    if (mod) {
      switch (action) {
        case 'approve':
          alert(`✅ Approved mod: ${mod.title}`);
          break;
        case 'reject':
          alert(`❌ Rejected mod: ${mod.title}`);
          break;
        case 'feature':
          alert(`⭐ Featured mod: ${mod.title}`);
          break;
        case 'unfeature':
          alert(`📌 Unfeatured mod: ${mod.title}`);
          break;
        case 'delete':
          if (window.confirm(`Are you sure you want to delete "${mod.title}"?`)) {
            alert(`🗑️ Deleted mod: ${mod.title}`);
          }
          break;
        default:
          break;
      }
    }
  };

  const handleBulkAction = (action) => {
    if (selectedMods.length === 0) {
      alert('Please select mods first');
      return;
    }
    
    const confirmMessage = `Are you sure you want to ${action} ${selectedMods.length} mod(s)?`;
    if (window.confirm(confirmMessage)) {
      selectedMods.forEach(modId => handleModAction(modId, action));
      setSelectedMods([]);
    }
  };

  const toggleModSelection = (modId) => {
    setSelectedMods(prev => 
      prev.includes(modId) 
        ? prev.filter(id => id !== modId)
        : [...prev, modId]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-500';
      case 'pending': return 'text-yellow-500';
      case 'rejected': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const availableAvatars = ['👤', '🎮', '👑', '🎨', '⚡', '🔥', '💎', '🌟', '🎯', '🚀'];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f0f0f',
      color: 'white',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid #2a2d35',
        backgroundColor: '#141518',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <button
              onClick={() => onNavigate('home')}
              style={{
                background: 'none',
                border: 'none',
                color: '#9CA3AF',
                fontSize: '1rem',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              ← Back to Home
            </button>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'white',
              margin: 0
            }}>
              🛡️ Admin Panel
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#1a1d24',
              borderRadius: '8px',
              border: '1px solid #2a2d35'
            }}>
              <span style={{ fontSize: '1.2rem' }}>{currentUser.avatar}</span>
              <span style={{ fontWeight: '600' }}>{currentUser.displayName}</span>
              <span style={{
                backgroundColor: getRoleBadge(currentUser.role).bgColor,
                color: getRoleBadge(currentUser.role).color,
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                {getRoleBadge(currentUser.role).icon} {getRoleBadge(currentUser.role).text}
              </span>
            </div>
            <button
              onClick={logout}
              style={{
                backgroundColor: '#EF4444',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div style={{
        backgroundColor: '#141518',
        borderBottom: '1px solid #2a2d35'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 1.5rem'
        }}>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            {[
              { key: 'users', label: '👥 User Management', icon: '👥' },
              { key: 'mods', label: '🎮 Mod Management', icon: '🎮' },
              { key: 'analytics', label: '📊 Analytics', icon: '📊' },
              { key: 'settings', label: '⚙️ Settings', icon: '⚙️' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeTab === tab.key ? '#3B82F6' : '#9CA3AF',
                  fontWeight: '600',
                  cursor: 'pointer',
                  padding: '1rem 1.5rem',
                  borderBottom: activeTab === tab.key ? '2px solid #3B82F6' : '2px solid transparent'
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem 1.5rem'
      }}>
        {activeTab === 'users' && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: 'white',
                margin: 0
              }}>
                User Management
              </h2>
              <button
                onClick={() => setShowAddUser(true)}
                style={{
                  backgroundColor: '#10B981',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                ➕ Add User
              </button>
            </div>

            {/* Users Table */}
            <div style={{
              backgroundColor: '#1a1d24',
              borderRadius: '12px',
              border: '1px solid #2a2d35',
              overflow: 'hidden'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 150px',
                padding: '1rem 1.5rem',
                backgroundColor: '#2a2d35',
                fontWeight: '600',
                color: '#E5E7EB',
                gap: '1rem'
              }}>
                <div>User</div>
                <div>Role</div>
                <div>Status</div>
                <div>Join Date</div>
                <div>Activity</div>
                <div>Actions</div>
              </div>
              
              {users.map(user => (
                <div
                  key={user.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 150px',
                    padding: '1.5rem 1.5rem',
                    borderBottom: '1px solid #2a2d35',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>{user.avatar}</span>
                    <div>
                      <div style={{ fontWeight: '600', color: 'white' }}>{user.displayName}</div>
                      <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>@{user.username}</div>
                    </div>
                  </div>
                  
                  <div>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      disabled={user.id === currentUser.id}
                      style={{
                        backgroundColor: getRoleBadge(user.role).bgColor,
                        color: getRoleBadge(user.role).color,
                        border: `1px solid ${getRoleBadge(user.role).color}`,
                        borderRadius: '12px',
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        cursor: user.id === currentUser.id ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {Object.values(USER_ROLES).map(role => (
                        <option key={role} value={role} style={{ backgroundColor: '#1a1d24', color: 'white' }}>
                          {getRoleBadge(role).icon} {role}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: user.isOnline ? '#10B981' : '#6B7280'
                    }} />
                    <span style={{ color: user.isOnline ? '#10B981' : '#9CA3AF' }}>
                      {user.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  
                  <div style={{ color: '#9CA3AF' }}>{user.joinDate}</div>
                  
                  <div style={{ color: '#9CA3AF' }}>
                    {user.isOnline ? 'Active now' : 'Last seen 2h ago'}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {user.id !== currentUser.id && (
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        style={{
                          backgroundColor: '#EF4444',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'mods' && (
          <div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: 'white',
              marginBottom: '2rem'
            }}>
              Mod Management
            </h2>

            {/* Mod Filters and Bulk Actions */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <select
                  value={modFilter}
                  onChange={(e) => setModFilter(e.target.value)}
                  style={{
                    backgroundColor: '#1a1d24',
                    border: '1px solid #2a2d35',
                    borderRadius: '8px',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="all">All Mods ({combinedMods.length})</option>
                  <option value="pending">Pending ({combinedMods.filter(m => m.status === 'pending').length})</option>
                  <option value="approved">Approved ({combinedMods.filter(m => m.status === 'approved').length})</option>
                  <option value="featured">Featured ({combinedMods.filter(m => m.featured).length})</option>
                </select>

                <span style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>
                  Showing {filteredMods.length} mod{filteredMods.length !== 1 ? 's' : ''}
                </span>
              </div>

              {selectedMods.length > 0 && (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>
                    {selectedMods.length} selected
                  </span>
                  <button
                    onClick={() => handleBulkAction('approve')}
                    style={{
                      backgroundColor: '#10B981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.5rem 1rem',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    ✅ Approve All
                  </button>
                  <button
                    onClick={() => handleBulkAction('reject')}
                    style={{
                      backgroundColor: '#EF4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.5rem 1rem',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    ❌ Reject All
                  </button>
                  <button
                    onClick={() => setSelectedMods([])}
                    style={{
                      backgroundColor: '#6B7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.5rem 1rem',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* Mods Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {filteredMods.map(mod => (
                <div
                  key={mod.id}
                  style={{
                    backgroundColor: '#1a1d24',
                    borderRadius: '12px',
                    border: '1px solid #2a2d35',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  {/* Selection Checkbox */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    zIndex: 10
                  }}>
                    <input
                      type="checkbox"
                      checked={selectedMods.includes(mod.id)}
                      onChange={() => toggleModSelection(mod.id)}
                      style={{
                        width: '16px',
                        height: '16px',
                        cursor: 'pointer'
                      }}
                    />
                  </div>

                  {/* Featured Badge */}
                  {mod.featured && (
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      backgroundColor: '#F59E0B',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      zIndex: 10
                    }}>
                      ⭐ FEATURED
                    </div>
                  )}

                  {/* Mod Image */}
                  <div style={{
                    height: '200px',
                    backgroundImage: `url(${mod.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      bottom: '0.5rem',
                      right: '0.5rem',
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      color: 'white'
                    }}>
                      {mod.champion}
                    </div>
                  </div>

                  {/* Mod Content */}
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <h3 style={{
                          color: 'white',
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          margin: '0 0 0.25rem 0'
                        }}>
                          {mod.title}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <span style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>
                            by {mod.author}
                          </span>
                          {getRoleBadge(mod.authorRole)}
                        </div>
                      </div>
                      <span style={{
                        color: getStatusColor(mod.status).replace('text-', ''),
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        backgroundColor: `${getStatusColor(mod.status).replace('text-', '')}20`,
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px'
                      }}>
                        {mod.status}
                      </span>
                    </div>

                    <p style={{
                      color: '#9CA3AF',
                      fontSize: '0.9rem',
                      marginBottom: '1rem',
                      lineHeight: '1.4'
                    }}>
                      {mod.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem',
                      fontSize: '0.8rem',
                      color: '#9CA3AF'
                    }}>
                      <span>📅 {mod.uploadDate}</span>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <span>👀 {mod.views}</span>
                        <span>⬇️ {mod.downloads}</span>
                        <span>❤️ {mod.likes}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.25rem',
                      marginBottom: '1rem'
                    }}>
                      {mod.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          style={{
                            backgroundColor: '#374151',
                            color: '#D1D5DB',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.7rem'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                      {mod.tags.length > 3 && (
                        <span style={{
                          color: '#9CA3AF',
                          fontSize: '0.7rem',
                          padding: '0.25rem 0.5rem'
                        }}>
                          +{mod.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      flexWrap: 'wrap'
                    }}>
                      {mod.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleModAction(mod.id, 'approve')}
                            style={{
                              backgroundColor: '#10B981',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '0.5rem 1rem',
                              fontSize: '0.8rem',
                              cursor: 'pointer',
                              flex: 1
                            }}
                          >
                            ✅ Approve
                          </button>
                          <button
                            onClick={() => handleModAction(mod.id, 'reject')}
                            style={{
                              backgroundColor: '#EF4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '0.5rem 1rem',
                              fontSize: '0.8rem',
                              cursor: 'pointer',
                              flex: 1
                            }}
                          >
                            ❌ Reject
                          </button>
                        </>
                      )}
                      
                      {mod.status === 'approved' && (
                        <button
                          onClick={() => handleModAction(mod.id, mod.featured ? 'unfeature' : 'feature')}
                          style={{
                            backgroundColor: mod.featured ? '#6B7280' : '#F59E0B',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '0.5rem 1rem',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            flex: 1
                          }}
                        >
                          {mod.featured ? '📌 Unfeature' : '⭐ Feature'}
                        </button>
                      )}

                      <button
                        onClick={() => handleModAction(mod.id, 'delete')}
                        style={{
                          backgroundColor: '#DC2626',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.5rem 1rem',
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredMods.length === 0 && (
              <div style={{
                backgroundColor: '#1a1d24',
                borderRadius: '12px',
                padding: '3rem',
                border: '1px solid #2a2d35',
                textAlign: 'center',
                color: '#9CA3AF'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎮</div>
                <h3 style={{ color: 'white', marginBottom: '1rem' }}>No Mods Found</h3>
                <p>No mods match the current filter criteria.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: 'white',
              marginBottom: '2rem'
            }}>
              Analytics Dashboard
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              {[
                { title: 'Total Users', value: users.length, icon: '👥', color: '#3B82F6' },
                { title: 'Online Users', value: users.filter(u => u.isOnline).length, icon: '🟢', color: '#10B981' },
                { title: 'Total Mods', value: combinedMods.length, icon: '🎮', color: '#8B5CF6' },
                { title: 'Pending Mods', value: combinedMods.filter(m => m.status === 'pending').length, icon: '⏳', color: '#F59E0B' }
              ].map(stat => (
                <div
                  key={stat.title}
                  style={{
                    backgroundColor: '#1a1d24',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    border: '1px solid #2a2d35'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '2rem' }}>{stat.icon}</span>
                    <span style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      color: stat.color
                    }}>
                      {stat.value}
                    </span>
                  </div>
                  <h3 style={{
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    margin: 0
                  }}>
                    {stat.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: 'white',
              marginBottom: '2rem'
            }}>
              System Settings
            </h2>
            <div style={{
              backgroundColor: '#1a1d24',
              borderRadius: '12px',
              padding: '3rem',
              border: '1px solid #2a2d35',
              textAlign: 'center',
              color: '#9CA3AF'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
              <h3 style={{ color: 'white', marginBottom: '1rem' }}>System Configuration</h3>
              <p>Feature coming soon - Configure site settings, security options, and system preferences.</p>
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#1a1d24',
            borderRadius: '16px',
            padding: '2rem',
            border: '1px solid #2a2d35',
            width: '500px',
            maxWidth: '90vw'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'white',
                margin: 0
              }}>
                Add New User
              </h3>
              <button
                onClick={() => setShowAddUser(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9CA3AF',
                  fontSize: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddUser}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  color: '#B3B3B3',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem'
                }}>
                  Username
                </label>
                <input
                  type="text"
                  value={newUserData.username}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, username: e.target.value }))}
                  style={{
                    width: '100%',
                    backgroundColor: '#374151',
                    border: '1px solid #4B5563',
                    borderRadius: '8px',
                    color: 'white',
                    padding: '0.75rem',
                    fontSize: '1rem'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  color: '#B3B3B3',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem'
                }}>
                  Display Name
                </label>
                <input
                  type="text"
                  value={newUserData.displayName}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, displayName: e.target.value }))}
                  style={{
                    width: '100%',
                    backgroundColor: '#374151',
                    border: '1px solid #4B5563',
                    borderRadius: '8px',
                    color: 'white',
                    padding: '0.75rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  color: '#B3B3B3',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem'
                }}>
                  Role
                </label>
                <select
                  value={newUserData.role}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, role: e.target.value }))}
                  style={{
                    width: '100%',
                    backgroundColor: '#374151',
                    border: '1px solid #4B5563',
                    borderRadius: '8px',
                    color: 'white',
                    padding: '0.75rem',
                    fontSize: '1rem'
                  }}
                >
                  {Object.values(USER_ROLES).map(role => (
                    <option key={role} value={role}>
                      {getRoleBadge(role).icon} {role}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  color: '#B3B3B3',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem'
                }}>
                  Avatar
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '0.5rem'
                }}>
                  {availableAvatars.map(avatar => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => setNewUserData(prev => ({ ...prev, avatar }))}
                      style={{
                        backgroundColor: newUserData.avatar === avatar ? '#3B82F6' : '#374151',
                        border: '1px solid #4B5563',
                        borderRadius: '8px',
                        padding: '0.75rem',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        aspectRatio: '1'
                      }}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end'
              }}>
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  style={{
                    backgroundColor: '#374151',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#10B981',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;