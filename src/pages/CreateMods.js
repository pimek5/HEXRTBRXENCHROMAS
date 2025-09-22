import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function CreateMods({ onNavigate }) {
  const { isAuthenticated, currentUser } = useAuth();
  const [selectedTool, setSelectedTool] = useState(null);

  const creationTools = [
    {
      id: 1,
      name: "LoL Skin Creator Studio",
      description: "Professional skin creation tool with advanced texture editing and real-time preview.",
      difficulty: "Advanced",
      category: "skins",
      features: ["3D Model Editor", "Texture Painter", "Real-time Preview", "Export Tools"],
      downloadUrl: "#",
      tutorials: 15,
      rating: 4.9,
      image: "https://imgur.com/tool1.png"
    },
    {
      id: 2,
      name: "Champion FX Editor",
      description: "Create custom visual effects and particles for champion abilities.",
      difficulty: "Expert",
      category: "effects",
      features: ["Particle System", "Animation Timeline", "Effect Library", "VFX Templates"],
      downloadUrl: "#",
      tutorials: 8,
      rating: 4.7,
      image: "https://imgur.com/tool2.png"
    },
    {
      id: 3,
      name: "Audio Mod Toolkit",
      description: "Replace and customize champion voices, sound effects, and background music.",
      difficulty: "Intermediate",
      category: "audio",
      features: ["Audio Converter", "Voice Replacer", "Music Editor", "Sound Banks"],
      downloadUrl: "#",
      tutorials: 12,
      rating: 4.6,
      image: "https://imgur.com/tool3.png"
    },
    {
      id: 4,
      name: "UI Theme Designer",
      description: "Design custom HUD themes and interface modifications.",
      difficulty: "Beginner",
      category: "ui",
      features: ["UI Templates", "Color Schemes", "Layout Editor", "Preview Mode"],
      downloadUrl: "#",
      tutorials: 20,
      rating: 4.8,
      image: "https://imgur.com/tool4.png"
    }
  ];

  const tutorials = [
    {
      id: 1,
      title: "Your First Custom Skin: Complete Beginner Tutorial",
      description: "Learn the basics of skin creation from concept to implementation.",
      duration: "45 min",
      difficulty: "Beginner",
      category: "skins",
      author: "@SkinMaster",
      views: 25400,
      likes: 1200,
      thumbnail: "https://imgur.com/tut1.png"
    },
    {
      id: 2,
      title: "Advanced Texture Techniques for Realistic Skins",
      description: "Master professional texturing methods used by top skin creators.",
      duration: "1h 20min",
      difficulty: "Advanced",
      category: "skins",
      author: "@ProArtist",
      views: 18200,
      likes: 890,
      thumbnail: "https://imgur.com/tut2.png"
    },
    {
      id: 3,
      title: "Creating Custom Champion Voice Packs",
      description: "Step-by-step guide to replacing champion voices with custom audio.",
      duration: "30 min",
      difficulty: "Intermediate",
      category: "audio",
      author: "@VoiceWizard",
      views: 12800,
      likes: 650,
      thumbnail: "https://imgur.com/tut3.png"
    },
    {
      id: 4,
      title: "Building Epic Visual Effects",
      description: "Learn to create stunning particle effects and spell animations.",
      duration: "2h 15min",
      difficulty: "Expert",
      category: "effects",
      author: "@FXGuru",
      views: 9500,
      likes: 420,
      thumbnail: "https://imgur.com/tut4.png"
    }
  ];

  const resources = [
    {
      id: 1,
      title: "Free Texture Pack Collection",
      description: "High-quality textures for skin creation",
      type: "textures",
      size: "450 MB",
      downloads: 8900,
      rating: 4.7
    },
    {
      id: 2,
      title: "Champion Model Templates",
      description: "3D models for all champions",
      type: "models",
      size: "1.2 GB",
      downloads: 5600,
      rating: 4.9
    },
    {
      id: 3,
      title: "Sound Effect Library",
      description: "Professional audio samples",
      type: "audio",
      size: "280 MB",
      downloads: 7200,
      rating: 4.6
    },
    {
      id: 4,
      title: "UI Icon Pack",
      description: "Custom icons for interface mods",
      type: "ui",
      size: "95 MB",
      downloads: 4300,
      rating: 4.8
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#10B981';
      case 'Intermediate': return '#F59E0B';
      case 'Advanced': return '#EF4444';
      case 'Expert': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'skins': return '🎨';
      case 'effects': return '✨';
      case 'audio': return '🔊';
      case 'ui': return '📱';
      default: return '🛠️';
    }
  };

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
                onClick={() => onNavigate('install')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9CA3AF',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Install Mods
              </button>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#10B981',
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
            background: 'linear-gradient(135deg, #10B981, #3B82F6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🎨 Create Mods
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#9CA3AF',
            maxWidth: '600px',
            margin: '0 auto 2rem auto'
          }}>
            Unleash your creativity with professional tools, tutorials, and resources for League of Legends mod creation
          </p>
          
          {!isAuthenticated && (
            <div style={{
              backgroundColor: '#1F2937',
              border: '1px solid #3B82F6',
              borderRadius: '12px',
              padding: '1rem',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <p style={{ margin: '0 0 1rem 0', color: '#D1D5DB' }}>
                🔑 Join the creator community to access exclusive tools and share your creations!
              </p>
              <button
                onClick={() => onNavigate('home')}
                style={{
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Login to Get Started
              </button>
            </div>
          )}
        </div>

        {/* Creation Tools Section */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: 'white'
          }}>
            🛠️ Creation Tools
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {creationTools.map(tool => (
              <div
                key={tool.id}
                style={{
                  backgroundColor: '#1a1d24',
                  borderRadius: '12px',
                  border: '1px solid #2a2d35',
                  padding: '1.5rem',
                  transition: 'transform 0.2s, border-color 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#3B82F6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#2a2d35';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{ fontSize: '2rem' }}>{getCategoryIcon(tool.category)}</span>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: 'white',
                      margin: '0 0 0.25rem 0'
                    }}>
                      {tool.name}
                    </h3>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <span
                        style={{
                          backgroundColor: getDifficultyColor(tool.difficulty),
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}
                      >
                        {tool.difficulty}
                      </span>
                      <span style={{
                        color: '#9CA3AF',
                        fontSize: '0.9rem'
                      }}>
                        ⭐ {tool.rating} • 📚 {tool.tutorials} tutorials
                      </span>
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
                    Key Features:
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

                <div style={{
                  display: 'flex',
                  gap: '0.5rem'
                }}>
                  <button
                    style={{
                      flex: 1,
                      backgroundColor: '#10B981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    ⬇️ Download
                  </button>
                  <button
                    style={{
                      backgroundColor: '#374151',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                    }}
                  >
                    📚 Tutorials
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Tutorials Section */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: 'white'
          }}>
            🎥 Video Tutorials
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {tutorials.map(tutorial => (
              <div
                key={tutorial.id}
                style={{
                  backgroundColor: '#1a1d24',
                  borderRadius: '12px',
                  border: '1px solid #2a2d35',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  height: '180px',
                  backgroundColor: '#2a2d35',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <span style={{ fontSize: '3rem' }}>▶️</span>
                  <div style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}>
                    {tutorial.duration}
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '0.5rem',
                    left: '0.5rem'
                  }}>
                    <span
                      style={{
                        backgroundColor: getDifficultyColor(tutorial.difficulty),
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}
                    >
                      {tutorial.difficulty}
                    </span>
                  </div>
                </div>
                
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ fontSize: '1.2rem' }}>{getCategoryIcon(tutorial.category)}</span>
                    <span style={{
                      color: '#9CA3AF',
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      fontWeight: '600'
                    }}>
                      {tutorial.category}
                    </span>
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '0.5rem',
                    lineHeight: '1.3'
                  }}>
                    {tutorial.title}
                  </h3>
                  
                  <p style={{
                    color: '#D1D5DB',
                    marginBottom: '1rem',
                    lineHeight: '1.4',
                    fontSize: '0.9rem'
                  }}>
                    {tutorial.description}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    color: '#9CA3AF'
                  }}>
                    <span>by {tutorial.author}</span>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <span>👀 {tutorial.views.toLocaleString()}</span>
                      <span>❤️ {tutorial.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: 'white'
          }}>
            📦 Free Resources
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            {resources.map(resource => (
              <div
                key={resource.id}
                style={{
                  backgroundColor: '#1a1d24',
                  border: '1px solid #2a2d35',
                  borderRadius: '8px',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1f2937';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1a1d24';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '0.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'white',
                    margin: 0
                  }}>
                    {resource.title}
                  </h3>
                  <span style={{
                    color: '#9CA3AF',
                    fontSize: '0.8rem'
                  }}>
                    {resource.size}
                  </span>
                </div>
                
                <p style={{
                  color: '#D1D5DB',
                  fontSize: '0.9rem',
                  marginBottom: '1rem'
                }}>
                  {resource.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.8rem',
                  color: '#9CA3AF'
                }}>
                  <span>⬇️ {resource.downloads.toLocaleString()}</span>
                  <span>⭐ {resource.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Section */}
        <div style={{
          backgroundColor: '#1F2937',
          border: '1px solid #10B981',
          borderRadius: '12px',
          padding: '2rem',
          marginTop: '3rem',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#10B981',
            marginBottom: '1rem'
          }}>
            🌟 Join the Creator Community
          </h3>
          <p style={{
            color: '#D1D5DB',
            marginBottom: '1.5rem',
            lineHeight: '1.5'
          }}>
            Connect with other mod creators, share your work, get feedback, and collaborate on amazing projects. 
            Our Discord community has over 50,000 creative minds working together!
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              style={{
                backgroundColor: '#5865F2',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              💬 Join Discord
            </button>
            <button
              style={{
                backgroundColor: '#374151',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              📖 Creator Guidelines
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateMods;