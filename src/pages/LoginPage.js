import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function LoginPage({ onNavigate }) {
  const { login, isAuthenticated, currentUser } = useAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: '',
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(credentials.username, credentials.password);
      if (success) {
        // Redirect to appropriate page based on user role
        setTimeout(() => {
          onNavigate('home');
        }, 1000);
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // In a real app, this would register the user
    alert('Registration functionality coming soon!');
  };

  const demoCredentials = [
    { username: 'p1mek', password: 'Karasinski1!', role: 'Owner' },
    { username: 'demo_skin_maker', password: 'demo123', role: 'Skin maker' },
    { username: 'demo_user', password: 'demo123', role: 'User' }
  ];

  if (isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0f0f0f',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          backgroundColor: '#1a1d24',
          borderRadius: '12px',
          border: '1px solid #2a2d35',
          padding: '3rem',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%',
          margin: '2rem'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: '#10B981'
          }}>
            Welcome back, {currentUser?.displayName || currentUser?.username}!
          </h2>
          <p style={{
            color: '#9CA3AF',
            marginBottom: '2rem'
          }}>
            You are successfully logged in. What would you like to do?
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexDirection: 'column'
          }}>
            <button
              onClick={() => onNavigate('explore')}
              style={{
                backgroundColor: '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🎮 Explore Mods
            </button>
            <button
              onClick={() => onNavigate('create')}
              style={{
                backgroundColor: '#10B981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🎨 Create Mods
            </button>
            {currentUser?.role === 'Owner' && (
              <button
                onClick={() => onNavigate('admin')}
                style={{
                  backgroundColor: '#8B5CF6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                🛡️ Admin Panel
              </button>
            )}
            <button
              onClick={() => onNavigate('home')}
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
              🏠 Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        padding: '1rem 0'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
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
      </header>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 80px)',
        padding: '2rem'
      }}>
        <div style={{
          maxWidth: '900px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center'
        }}>
          {/* Left Side - Welcome */}
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Welcome to HEXRTBRXENCHROMAS
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: '#9CA3AF',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Join our community of League of Legends modders and creators. Discover amazing custom skins, 
              share your creations, and connect with fellow enthusiasts.
            </p>
            <div style={{
              backgroundColor: '#1a1d24',
              border: '1px solid #2a2d35',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: '#10B981'
              }}>
                🎮 What you can do:
              </h3>
              <ul style={{
                color: '#D1D5DB',
                fontSize: '0.9rem',
                lineHeight: '1.5',
                paddingLeft: '1rem'
              }}>
                <li>Browse thousands of custom skins and mods</li>
                <li>Upload and share your own creations</li>
                <li>Get installation tools and guides</li>
                <li>Connect with the modding community</li>
              </ul>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div style={{
            backgroundColor: '#1a1d24',
            borderRadius: '12px',
            border: '1px solid #2a2d35',
            padding: '2rem'
          }}>
            {!showRegister ? (
              <>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  🔑 Login
                </h2>

                {error && (
                  <div style={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #EF4444',
                    borderRadius: '8px',
                    color: '#EF4444',
                    padding: '0.75rem',
                    marginBottom: '1rem',
                    fontSize: '0.9rem'
                  }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                      display: 'block',
                      color: '#D1D5DB',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      Username
                    </label>
                    <input
                      type="text"
                      value={credentials.username}
                      onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                      style={{
                        width: '100%',
                        backgroundColor: '#0f0f0f',
                        border: '1px solid #2a2d35',
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
                      color: '#D1D5DB',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      Password
                    </label>
                    <input
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      style={{
                        width: '100%',
                        backgroundColor: '#0f0f0f',
                        border: '1px solid #2a2d35',
                        borderRadius: '8px',
                        color: 'white',
                        padding: '0.75rem',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      width: '100%',
                      backgroundColor: '#3B82F6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      opacity: isLoading ? 0.7 : 1,
                      marginBottom: '1rem'
                    }}
                  >
                    {isLoading ? '🔄 Logging in...' : '🚀 Login'}
                  </button>
                </form>

                <div style={{
                  textAlign: 'center',
                  marginBottom: '1rem'
                }}>
                  <button
                    onClick={() => setShowRegister(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#3B82F6',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Don't have an account? Register here
                  </button>
                </div>

                {/* Demo Credentials */}
                <div style={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  padding: '1rem'
                }}>
                  <h3 style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#F59E0B'
                  }}>
                    🎯 Demo Accounts:
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#D1D5DB' }}>
                    {demoCredentials.map((cred, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '0.25rem',
                          padding: '0.25rem',
                          borderRadius: '4px',
                          backgroundColor: '#374151',
                          cursor: 'pointer'
                        }}
                        onClick={() => setCredentials({ username: cred.username, password: cred.password })}
                      >
                        <span>{cred.username}</span>
                        <span style={{
                          color: cred.role === 'Owner' ? '#8B5CF6' : cred.role === 'Skin maker' ? '#10B981' : '#6B7280',
                          fontWeight: '600'
                        }}>
                          {cred.role}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#9CA3AF',
                    marginTop: '0.5rem',
                    margin: 0
                  }}>
                    Click any account to auto-fill credentials
                  </p>
                </div>
              </>
            ) : (
              <>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  📝 Register
                </h2>

                {error && (
                  <div style={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #EF4444',
                    borderRadius: '8px',
                    color: '#EF4444',
                    padding: '0.75rem',
                    marginBottom: '1rem',
                    fontSize: '0.9rem'
                  }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleRegister}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                      display: 'block',
                      color: '#D1D5DB',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      Username
                    </label>
                    <input
                      type="text"
                      value={registerData.username}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, username: e.target.value }))}
                      style={{
                        width: '100%',
                        backgroundColor: '#0f0f0f',
                        border: '1px solid #2a2d35',
                        borderRadius: '8px',
                        color: 'white',
                        padding: '0.75rem',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                      display: 'block',
                      color: '#D1D5DB',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={registerData.displayName}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, displayName: e.target.value }))}
                      style={{
                        width: '100%',
                        backgroundColor: '#0f0f0f',
                        border: '1px solid #2a2d35',
                        borderRadius: '8px',
                        color: 'white',
                        padding: '0.75rem',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                      display: 'block',
                      color: '#D1D5DB',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                      style={{
                        width: '100%',
                        backgroundColor: '#0f0f0f',
                        border: '1px solid #2a2d35',
                        borderRadius: '8px',
                        color: 'white',
                        padding: '0.75rem',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                      display: 'block',
                      color: '#D1D5DB',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      Password
                    </label>
                    <input
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                      style={{
                        width: '100%',
                        backgroundColor: '#0f0f0f',
                        border: '1px solid #2a2d35',
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
                      color: '#D1D5DB',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      style={{
                        width: '100%',
                        backgroundColor: '#0f0f0f',
                        border: '1px solid #2a2d35',
                        borderRadius: '8px',
                        color: 'white',
                        padding: '0.75rem',
                        fontSize: '1rem'
                      }}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      backgroundColor: '#10B981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      marginBottom: '1rem'
                    }}
                  >
                    📝 Create Account
                  </button>
                </form>

                <div style={{
                  textAlign: 'center'
                }}>
                  <button
                    onClick={() => setShowRegister(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#3B82F6',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Already have an account? Login here
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;