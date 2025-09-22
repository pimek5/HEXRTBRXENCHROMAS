import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function InstallMods({ onNavigate }) {
  const { isAuthenticated, currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const installerTools = [
    {
      id: 1,
      name: "LoL Skin Installer",
      description: "Easy-to-use skin installer for League of Legends. Supports automatic backup and restoration.",
      version: "v2.1.0",
      downloads: 15420,
      rating: 4.8,
      image: "https://imgur.com/placeholder1.png",
      downloadUrl: "#",
      features: ["Automatic backup", "One-click install", "Skin preview", "Safe uninstall"],
      category: "installer"
    },
    {
      id: 2,
      name: "Universal Mod Manager",
      description: "Advanced mod management tool with conflict detection and mod compatibility checking.",
      version: "v1.8.3",
      downloads: 8750,
      rating: 4.6,
      image: "https://imgur.com/placeholder2.png",
      downloadUrl: "#",
      features: ["Conflict detection", "Batch operations", "Mod profiles", "Auto-updates"],
      category: "manager"
    },
    {
      id: 3,
      name: "Quick Skin Swap",
      description: "Lightweight tool for quickly swapping between different skin configurations.",
      version: "v3.0.1",
      downloads: 12300,
      rating: 4.7,
      image: "https://imgur.com/placeholder3.png",
      downloadUrl: "#",
      features: ["Fast switching", "Minimal resource usage", "Hotkey support", "Preset saves"],
      category: "utility"
    }
  ];

  const guides = [
    {
      id: 1,
      title: "Complete Beginner's Guide to Installing LoL Skins",
      description: "Step-by-step tutorial for installing your first custom skin safely.",
      readTime: "5 min read",
      difficulty: "Beginner",
      thumbnail: "https://imgur.com/guide1.png",
      author: "@ModMaster",
      date: "2025-01-10"
    },
    {
      id: 2,
      title: "Advanced Mod Management Techniques",
      description: "Learn how to manage multiple mods, resolve conflicts, and optimize performance.",
      readTime: "12 min read",
      difficulty: "Advanced",
      thumbnail: "https://imgur.com/guide2.png",
      author: "@TechWiz",
      date: "2025-01-08"
    },
    {
      id: 3,
      title: "Troubleshooting Common Installation Issues",
      description: "Solutions to the most common problems users face when installing mods.",
      readTime: "8 min read",
      difficulty: "Intermediate",
      thumbnail: "https://imgur.com/guide3.png",
      author: "@SupportGuru",
      date: "2025-01-05"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Tools' },
    { value: 'installer', label: 'Installers' },
    { value: 'manager', label: 'Managers' },
    { value: 'utility', label: 'Utilities' }
  ];

  const filteredTools = installerTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }}>
            <button
              onClick={() => onNavigate('home')}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              HEXRTBRXENCHROMAS
            </button>
            <nav style={{ display: 'flex', gap: '2rem' }}>
              <button
                onClick={() => onNavigate('explore')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9CA3AF',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Explore Mods
              </button>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#F59E0B',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Install Mods
              </button>
              <button
                onClick={() => onNavigate('create')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9CA3AF',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Create Mods
              </button>
            </nav>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {isAuthenticated && (
              <button
                onClick={() => onNavigate('admin')}
                style={{
                  backgroundColor: '#8B5CF6',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                🛡️ Admin
              </button>
            )}
            <button
              onClick={() => isAuthenticated ? onNavigate('admin') : onNavigate('home')}
              style={{
                backgroundColor: '#3B82F6',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {isAuthenticated ? `👋 ${currentUser?.displayName || currentUser?.username}` : 'Login'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            ⚡ Install Mods
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#9CA3AF',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Get the tools and guides you need to safely install and manage your League of Legends mods
          </p>
        </div>

        {/* Search and Filter */}
        <div style={{
          backgroundColor: '#1a1d24',
          borderRadius: '12px',
          border: '1px solid #2a2d35',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <input
              type="text"
              placeholder="Search tools and guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                backgroundColor: '#0f0f0f',
                border: '1px solid #2a2d35',
                borderRadius: '8px',
                color: 'white',
                padding: '0.75rem 1rem',
                fontSize: '1rem'
              }}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                backgroundColor: '#0f0f0f',
                border: '1px solid #2a2d35',
                borderRadius: '8px',
                color: 'white',
                padding: '0.75rem 1rem',
                fontSize: '1rem'
              }}
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Installation Tools Section */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: 'white'
          }}>
            🛠️ Installation Tools
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredTools.map(tool => (
              <div
                key={tool.id}
                style={{
                  backgroundColor: '#1a1d24',
                  borderRadius: '12px',
                  border: '1px solid #2a2d35',
                  padding: '1.5rem',
                  transition: 'transform 0.2s'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: 'white',
                      marginBottom: '0.5rem'
                    }}>
                      {tool.name}
                    </h3>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      fontSize: '0.9rem',
                      color: '#9CA3AF'
                    }}>
                      <span>{tool.version}</span>
                      <span>⭐ {tool.rating}</span>
                      <span>⬇️ {tool.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <p style={{
                  color: '#D1D5DB',
                  marginBottom: '1rem',
                  lineHeight: '1.5'
                }}>
                  {tool.description}
                </p>

                <div style={{
                  marginBottom: '1rem'
                }}>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '0.5rem'
                  }}>
                    Features:
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {tool.features.map(feature => (
                      <span
                        key={feature}
                        style={{
                          backgroundColor: '#374151',
                          color: '#D1D5DB',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.8rem'
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  style={{
                    width: '100%',
                    backgroundColor: '#F59E0B',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  ⬇️ Download {tool.name}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Installation Guides Section */}
        <section>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: 'white'
          }}>
            📚 Installation Guides
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {guides.map(guide => (
              <div
                key={guide.id}
                style={{
                  backgroundColor: '#1a1d24',
                  borderRadius: '12px',
                  border: '1px solid #2a2d35',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
              >
                <div style={{
                  height: '160px',
                  backgroundColor: '#2a2d35',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9CA3AF'
                }}>
                  📖 Guide Preview
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{
                      backgroundColor: guide.difficulty === 'Beginner' ? '#10B981' : guide.difficulty === 'Advanced' ? '#EF4444' : '#F59E0B',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {guide.difficulty}
                    </span>
                    <span style={{
                      color: '#9CA3AF',
                      fontSize: '0.8rem'
                    }}>
                      {guide.readTime}
                    </span>
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '0.5rem'
                  }}>
                    {guide.title}
                  </h3>
                  
                  <p style={{
                    color: '#D1D5DB',
                    marginBottom: '1rem',
                    lineHeight: '1.4',
                    fontSize: '0.9rem'
                  }}>
                    {guide.description}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    color: '#9CA3AF'
                  }}>
                    <span>by {guide.author}</span>
                    <span>{guide.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Safety Notice */}
        <div style={{
          backgroundColor: '#1F2937',
          border: '1px solid #F59E0B',
          borderRadius: '12px',
          padding: '1.5rem',
          marginTop: '3rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>⚠️</span>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#F59E0B',
              margin: 0
            }}>
              Important Safety Notice
            </h3>
          </div>
          <p style={{
            color: '#D1D5DB',
            marginBottom: '1rem',
            lineHeight: '1.5'
          }}>
            Always backup your original game files before installing any mods. Use only trusted tools and sources. 
            Riot Games does not officially support mods, so use at your own risk.
          </p>
          <ul style={{
            color: '#D1D5DB',
            paddingLeft: '1.5rem',
            lineHeight: '1.5'
          }}>
            <li>Create backups before installing mods</li>
            <li>Only download from trusted sources</li>
            <li>Check mod compatibility with your game version</li>
            <li>Disable mods if you experience issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InstallMods;