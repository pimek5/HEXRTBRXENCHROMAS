import React, { useState } from 'react';

function ModDetailPage({ mod, onBackToExplore, onLike, onComment }) {
  const [isLiked, setIsLiked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "@testuser",
      authorAvatar: "👤",
      content: "This mod looks amazing! Great work!",
      timestamp: "2 hours ago",
      likes: 3,
      rating: 5
    },
    {
      id: 2,
      author: "@modlover",
      authorAvatar: "🎮",
      content: "How do I install this? Any tutorial?",
      timestamp: "5 hours ago",
      likes: 1,
      rating: 4
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(mod.id, !isLiked);
  };

  const handleRating = (rating) => {
    setUserRating(rating);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: "@p1mek",
        authorAvatar: "👑",
        content: newComment,
        timestamp: "just now",
        likes: 0,
        rating: userRating
      };
      setComments([comment, ...comments]);
      setNewComment('');
      setUserRating(0);
      onComment && onComment(mod.id, comment);
    }
  };

  const nextImage = () => {
    if (mod.images && mod.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === mod.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (mod.images && mod.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? mod.images.length - 1 : prev - 1
      );
    }
  };

  if (!mod) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0f0f0f',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p>Mod not found</p>
      </div>
    );
  }

  const renderStars = (rating, interactive = false) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        onClick={interactive ? () => handleRating(i + 1) : undefined}
        style={{
          cursor: interactive ? 'pointer' : 'default',
          color: i < rating ? '#FCD34D' : '#374151',
          fontSize: '1.2rem'
        }}
      >
        ★
      </span>
    ));
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f0f0f',
      color: 'white',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>
      {/* Navigation Header */}
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
              onClick={onBackToExplore}
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
              ← Back to Explore
            </button>
            <nav style={{ display: 'flex', gap: '1.5rem' }}>
              <span 
                onClick={() => setActiveTab('overview')}
                style={{ 
                  color: activeTab === 'overview' ? '#3B82F6' : '#9CA3AF', 
                  fontWeight: '600',
                  cursor: 'pointer',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  backgroundColor: activeTab === 'overview' ? '#1E3A8A20' : 'transparent'
                }}
              >
                Overview
              </span>
              <span 
                onClick={() => setActiveTab('gallery')}
                style={{ 
                  color: activeTab === 'gallery' ? '#3B82F6' : '#9CA3AF', 
                  fontWeight: '600',
                  cursor: 'pointer',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  backgroundColor: activeTab === 'gallery' ? '#1E3A8A20' : 'transparent'
                }}
              >
                Gallery
              </span>
              <span 
                onClick={() => setActiveTab('reviews')}
                style={{ 
                  color: activeTab === 'reviews' ? '#3B82F6' : '#9CA3AF', 
                  fontWeight: '600',
                  cursor: 'pointer',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  backgroundColor: activeTab === 'reviews' ? '#1E3A8A20' : 'transparent'
                }}
              >
                Reviews
              </span>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div style={{
        background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${mod.images?.[0] || mod.image}) center/cover`,
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '3rem 1.5rem',
          width: '100%'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 320px',
            gap: '3rem',
            alignItems: 'start'
          }}>
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {mod.category}
                </span>
              </div>
              <h1 style={{
                fontSize: '3rem',
                fontWeight: '700',
                marginBottom: '1rem',
                lineHeight: '1.1'
              }}>
                {mod.title}
              </h1>
              <p style={{
                fontSize: '1.2rem',
                color: '#B3B3B3',
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                {mod.description}
              </p>
              <div style={{
                display: 'flex',
                gap: '2rem',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#10B981', fontWeight: '600' }}>by</span>
                  <span style={{ color: 'white', fontWeight: '600' }}>{mod.author}</span>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', color: '#9CA3AF' }}>
                  <span>👁️ {(mod.views || 0).toLocaleString()}</span>
                  <span>⬇️ {(mod.downloads || 0).toLocaleString()}</span>
                  <span>❤️ {(mod.likes || 0) + (isLiked ? 1 : 0)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {renderStars(4)}
                  <span style={{ color: '#9CA3AF', marginLeft: '0.5rem' }}>4.2 (128 reviews)</span>
                </div>
              </div>
            </div>
            
            {/* Download Card */}
            <div style={{
              backgroundColor: '#1a1d24',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid #2a2d35'
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#10B981',
                  marginBottom: '0.5rem'
                }}>
                  {mod.price || 'Free'}
                </div>
                <div style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>
                  Latest Version: v{mod.version || '1.0.0'}
                </div>
                <div style={{ color: '#9CA3AF', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  Updated: {mod.lastUpdated || 'January 2025'}
                </div>
              </div>
              
              <button style={{
                width: '100%',
                backgroundColor: '#10B981',
                color: 'white',
                border: 'none',
                padding: '1rem',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1.1rem',
                cursor: 'pointer',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                ⬇️ Download Now
              </button>
              
              <button
                onClick={handleLike}
                style={{
                  width: '100%',
                  backgroundColor: isLiked ? '#EF4444' : '#374151',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}
              >
                {isLiked ? '❤️' : '🤍'} {isLiked ? 'Liked' : 'Like'}
              </button>

              <button style={{
                width: '100%',
                backgroundColor: '#6366F1',
                color: 'white',
                border: 'none',
                padding: '0.75rem',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                📋 Installation Guide
              </button>
              
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem 0',
                borderTop: '1px solid #2a2d35'
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.9rem', color: '#9CA3AF', marginBottom: '0.5rem' }}>
                    Compatibility
                  </div>
                  <div style={{ color: 'white', fontWeight: '600' }}>
                    {mod.champion || 'All Champions'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: '#9CA3AF', marginBottom: '0.5rem' }}>
                    File Size
                  </div>
                  <div style={{ color: 'white', fontWeight: '600' }}>
                    {mod.fileSize || '2.4 MB'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '3rem 1.5rem'
      }}>
        {activeTab === 'overview' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '3rem'
          }}>
            {/* Left Column */}
            <div>
              {/* Spotlight Video */}
              {mod.spotlightVideo && (
                <div style={{
                  marginBottom: '3rem',
                  backgroundColor: '#1a1d24',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #2a2d35'
                }}>
                  <video
                    controls
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  >
                    <source src={mod.spotlightVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {/* Description */}
              <div style={{
                backgroundColor: '#1a1d24',
                borderRadius: '12px',
                padding: '2rem',
                border: '1px solid #2a2d35',
                marginBottom: '2rem'
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: 'white'
                }}>
                  About this mod
                </h2>
                <p style={{
                  color: '#B3B3B3',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  {mod.description || 'No description available for this mod.'}
                </p>
                {mod.features && (
                  <div>
                    <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '1rem' }}>
                      Features:
                    </h3>
                    <ul style={{ color: '#B3B3B3', lineHeight: '1.6' }}>
                      {mod.features.map((feature, index) => (
                        <li key={index} style={{ marginBottom: '0.5rem' }}>
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Installation Guide */}
              <div style={{
                backgroundColor: '#1a1d24',
                borderRadius: '12px',
                padding: '2rem',
                border: '1px solid #2a2d35'
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: 'white'
                }}>
                  Installation Guide
                </h2>
                <div style={{ color: '#B3B3B3', lineHeight: '1.6' }}>
                  <p style={{ marginBottom: '1rem' }}>
                    Follow these steps to install this mod:
                  </p>
                  <ol style={{ paddingLeft: '1.5rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}>Download the mod file</li>
                    <li style={{ marginBottom: '0.5rem' }}>Extract the files to your League of Legends directory</li>
                    <li style={{ marginBottom: '0.5rem' }}>Launch the game and enjoy!</li>
                  </ol>
                  <div style={{
                    backgroundColor: '#FEF3C7',
                    color: '#92400E',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginTop: '1rem',
                    fontSize: '0.9rem'
                  }}>
                    ⚠️ Always backup your game files before installing mods!
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Mod Details */}
              <div style={{
                backgroundColor: '#1a1d24',
                borderRadius: '12px',
                padding: '2rem',
                border: '1px solid #2a2d35',
                marginBottom: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  color: 'white'
                }}>
                  Mod Information
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9CA3AF' }}>Author:</span>
                    <span style={{ color: 'white', fontWeight: '600' }}>{mod.author}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9CA3AF' }}>Category:</span>
                    <span style={{ color: 'white' }}>{mod.category}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9CA3AF' }}>Version:</span>
                    <span style={{ color: 'white' }}>v{mod.version || '1.0.0'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9CA3AF' }}>File Size:</span>
                    <span style={{ color: 'white' }}>{mod.fileSize || '2.4 MB'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9CA3AF' }}>Downloads:</span>
                    <span style={{ color: 'white' }}>{(mod.downloads || 0).toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9CA3AF' }}>Last Updated:</span>
                    <span style={{ color: 'white' }}>{mod.lastUpdated || 'Jan 2025'}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div style={{
                backgroundColor: '#1a1d24',
                borderRadius: '12px',
                padding: '2rem',
                border: '1px solid #2a2d35'
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: 'white'
                }}>
                  Tags
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {(mod.tags || [mod.category, mod.champion]).filter(Boolean).map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: '#374151',
                        color: '#9CA3AF',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '2rem',
              color: 'white'
            }}>
              Gallery
            </h2>
            {mod.images && mod.images.length > 0 ? (
              <div>
                {/* Main Image */}
                <div style={{
                  backgroundColor: '#1a1d24',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #2a2d35',
                  marginBottom: '2rem',
                  position: 'relative'
                }}>
                  <img 
                    src={mod.images[currentImageIndex]}
                    alt={`${mod.title} screenshot ${currentImageIndex + 1}`}
                    style={{
                      width: '100%',
                      height: '500px',
                      objectFit: 'cover'
                    }}
                  />
                  {mod.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        style={{
                          position: 'absolute',
                          left: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '3rem',
                          height: '3rem',
                          cursor: 'pointer',
                          fontSize: '1.2rem'
                        }}
                      >
                        ‹
                      </button>
                      <button
                        onClick={nextImage}
                        style={{
                          position: 'absolute',
                          right: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '3rem',
                          height: '3rem',
                          cursor: 'pointer',
                          fontSize: '1.2rem'
                        }}
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>
                
                {/* Thumbnail Grid */}
                {mod.images.length > 1 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: '1rem'
                  }}>
                    {mod.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        style={{
                          background: 'none',
                          border: currentImageIndex === index ? '2px solid #3B82F6' : '1px solid #2a2d35',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          cursor: 'pointer'
                        }}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100px',
                            objectFit: 'cover'
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div style={{
                backgroundColor: '#1a1d24',
                borderRadius: '12px',
                padding: '3rem',
                border: '1px solid #2a2d35',
                textAlign: 'center',
                color: '#9CA3AF'
              }}>
                No images available for this mod
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
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
                color: 'white'
              }}>
                Reviews & Comments
              </h2>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {renderStars(4)}
                  <span style={{ color: 'white', fontWeight: '600' }}>4.2</span>
                  <span style={{ color: '#9CA3AF' }}>(128 reviews)</span>
                </div>
              </div>
            </div>

            {/* Add Review Form */}
            <div style={{
              backgroundColor: '#1a1d24',
              borderRadius: '12px',
              padding: '2rem',
              border: '1px solid #2a2d35',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: 'white'
              }}>
                Leave a Review
              </h3>
              <form onSubmit={handleCommentSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ marginBottom: '0.5rem', color: '#9CA3AF' }}>
                    Your Rating:
                  </div>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {renderStars(userRating, true)}
                  </div>
                </div>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts about this mod..."
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    backgroundColor: '#374151',
                    border: '1px solid #4B5563',
                    borderRadius: '8px',
                    color: 'white',
                    padding: '1rem',
                    fontSize: '1rem',
                    resize: 'vertical',
                    marginBottom: '1rem'
                  }}
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  style={{
                    backgroundColor: newComment.trim() ? '#10B981' : '#374151',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: newComment.trim() ? 'pointer' : 'not-allowed'
                  }}
                >
                  Post Review
                </button>
              </form>
            </div>

            {/* Comments List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {comments.map((comment) => (
                <div
                  key={comment.id}
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
                    alignItems: 'start',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{comment.authorAvatar}</span>
                      <div>
                        <div style={{ color: 'white', fontWeight: '600' }}>
                          {comment.author}
                        </div>
                        <div style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>
                          {comment.timestamp}
                        </div>
                      </div>
                    </div>
                    {comment.rating && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        {renderStars(comment.rating)}
                      </div>
                    )}
                  </div>
                  <p style={{
                    color: '#B3B3B3',
                    lineHeight: '1.5',
                    marginBottom: '1rem'
                  }}>
                    {comment.content}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <button style={{
                      background: 'none',
                      border: 'none',
                      color: '#9CA3AF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      👍 {comment.likes}
                    </button>
                    <button style={{
                      background: 'none',
                      border: 'none',
                      color: '#9CA3AF',
                      cursor: 'pointer'
                    }}>
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModDetailPage;