import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PostModModal from '../components/PostModModal';

const ExploreMods = ({ userMods, onNavigate }) => {
  const { isAuthenticated, currentUser } = useAuth();
  const [showPostModal, setShowPostModal] = useState(false);
  const [mods, setMods] = useState([
    {
      id: 1,
      title: "Chibi Yuumi",
      author: "@p1mek",
      authorUrl: "https://twitter.com/p1mek",
      category: "Yuumi",
      description: "Adorable chibi-style Yuumi skin mod",
      views: 1,
      downloads: 1,
      likes: 0,
      image: "https://imgur.com/AOfBnKv.png",
      tags: ["Yuumi", "Chibi", "Custom Skin", "Cute"],
      price: "Free",
      champion: "Yuumi",
      downloadUrl: "https://discord.com/channels/your-server/thread-id-1"
    },
    {
      id: 2,
      title: "Gojo Lulu",
      author: "@p1mek", 
      authorUrl: "https://twitter.com/p1mek",
      category: "Lulu",
      description: "Gojo Satoru themed Lulu skin",
      views: 1,
      downloads: 1,
      likes: 0,
      image: "https://imgur.com/yVd5O7C.png",
      tags: ["Lulu", "Gojo", "Anime", "JJK"],
      price: "Free",
      champion: "Lulu",
      downloadUrl: "https://discord.com/channels/your-server/thread-id-2"
    },
    {
      id: 3,
      title: "Blue Archives BGM",
      author: "@p1mek",
      authorUrl: "https://twitter.com/p1mek",
      category: "Sound Effects",
      description: "Blue Archive background music mod",
      views: 1,
      downloads: 1,
      likes: 1,
      image: "https://imgur.com/t4Qrca4.png",
      tags: ["BGM", "Blue Archive", "Music", "Sound"],
      price: "Free",
      champion: "Global",
      downloadUrl: "https://discord.com/channels/your-server/thread-id-3"
    },
    {
      id: 4,
      title: "Smaller Minimap Icons",
      author: "@p1mek",
      authorUrl: "https://twitter.com/p1mek",
      category: "HUD/UI",
      description: "Reduces the size of minimap icons for better visibility",
      views: 3,
      downloads: 2,
      likes: 2,
      image: "https://imgur.com/wPO8AkO.png",
      tags: ["Minimap", "UI", "Icons", "Visibility"],
      price: "Free",
      champion: "Global",
      downloadUrl: "https://discord.com/channels/your-server/thread-id-4"
    }
  ]);

  // Combine default mods with user-created mods
  const allMods = useMemo(() => [...userMods, ...mods], [userMods]);
  const [filteredMods, setFilteredMods] = useState(allMods);

  // Update filtered mods when userMods changes
  useEffect(() => {
    setFilteredMods([...userMods, ...mods]);
  }, [userMods, mods]);

  // Load user-submitted mods from localStorage on component mount
  useEffect(() => {
    const savedMods = JSON.parse(localStorage.getItem('userSubmittedMods') || '[]');
    if (savedMods.length > 0) {
      setMods(prev => [...prev, ...savedMods]);
    }
  }, []);

  // Handle new mod submission
  const handleModSubmit = async (newMod) => {
    try {
      // In a real app, this would save to a database
      // For now, we'll just add it to local storage and update the mods state
      const existingMods = JSON.parse(localStorage.getItem('userSubmittedMods') || '[]');
      const updatedMods = [...existingMods, newMod];
      localStorage.setItem('userSubmittedMods', JSON.stringify(updatedMods));
      
      // Update the mods state to include the new mod
      setMods(prev => [...prev, newMod]);
      
      console.log('New mod submitted:', newMod);
    } catch (error) {
      console.error('Error saving mod:', error);
      throw error;
    }
  };

  const handlePostModClick = () => {
    if (!isAuthenticated) {
      alert('Please log in to post a mod');
      return;
    }
    setShowPostModal(true);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [freeOnly, setFreeOnly] = useState(false);
  const [paidOnly, setPaidOnly] = useState(false);
  const [sortBy, setSortBy] = useState('Latest');
  const [viewCount, setViewCount] = useState('20');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedChampions, setSelectedChampions] = useState([]);

  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    themes: false,
    champions: false
  });

  // Filter logic
  useEffect(() => {
    let filtered = allMods;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(mod => 
        mod.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mod.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mod.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filters
    if (freeOnly && !paidOnly) {
      filtered = filtered.filter(mod => mod.price === "Free");
    } else if (paidOnly && !freeOnly) {
      filtered = filtered.filter(mod => mod.price !== "Free");
    }

    // Category filters
    const allSelectedFilters = [
      ...selectedCategories,
      ...selectedThemes,
      ...selectedChampions
    ];

    if (allSelectedFilters.length > 0) {
      filtered = filtered.filter(mod =>
        allSelectedFilters.some(filter =>
          mod.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase())) ||
          mod.category.toLowerCase().includes(filter.toLowerCase()) ||
          mod.champion.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }

    setFilteredMods(filtered);
  }, [allMods, searchTerm, freeOnly, paidOnly, selectedCategories, selectedThemes, selectedChampions]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const categories = [
    "Champion Mod", "Map Mod", "Sound Effects", "Font",
    "Announcer", "HUD/UI", "Other", "Recalls"
  ];

  const themes = [
    "Anime", "Game", "Edgy", "NSFW", "Meme", "Riot Style", "Chibi", "Other", "Chroma"
  ];

  const champions = [
    "Aatrox", "Ahri", "Akali", "Akshan", "Alistar", "Ambessa", "Amumu", "Anivia", "Annie", "Aphelios", "Ashe", "Aurelion Sol", "Azir", "Bard", "Bel'Veth", "Blitzcrank", "Brand", "Braum", "Caitlyn", "Camille", "Cassiopeia", "Cho'Gath", "Corki", "Darius", "Diana", "Dr. Mundo", "Draven", "Ekko", "Elise", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", "Garen", "Gnar", "Gragas", "Graves", "Gwen", "Hecarim", "Heimerdinger", "Illaoi", "Irelia", "Ivern", "Janna", "Jarvan IV", "Jax", "Jayce", "Jhin", "Jinx", "K'Sante", "Kai'Sa", "Kalista", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kayn", "Kennen", "Kha'Zix", "Kindred", "Kled", "Kog'Maw", "LeBlanc", "Lee Sin", "Leona", "Lillia", "Lissandra", "Lucian", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai", "Master Yi", "Miss Fortune", "Mordekaiser", "Morgana", "Nami", "Nasus", "Nautilus", "Neeko", "Nidalee", "Nilah", "Nocturne", "Nunu & Willump", "Olaf", "Orianna", "Ornn", "Pantheon", "Poppy", "Pyke", "Qiyana", "Quinn", "Rakan", "Rammus", "Rek'Sai", "Rell", "Renata Glasc", "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Samira", "Sejuani", "Senna", "Seraphine", "Sett", "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Sona", "Soraka", "Swain", "Sylas", "Syndra", "Tahm Kench", "Taliyah", "Talon", "Taric", "Teemo", "Thresh", "Tristana", "Trundle", "Tryndamere", "Twisted Fate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Vel'Koz", "Vex", "Vi", "Viego", "Viktor", "Vladimir", "Volibear", "Warwick", "Wukong", "Xayah", "Xerath", "Xin Zhao", "Yasuo", "Yone", "Yorick", "Yuumi", "Zac", "Zed", "Zeri", "Ziggs", "Zilean", "Zoe", "Zyra"
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0B0E13',
      color: 'white',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>
      {/* Header - Divine Skins Style */}
      <header style={{
        backgroundColor: '#1a1d24',
        borderBottom: '1px solid #2a2d35',
        padding: '1rem 0'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 1.5rem',
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
                padding: '0.5rem'
              }}
            >
              ← Back to Home
            </button>
            <nav style={{ display: 'flex', gap: '2rem' }}>
              <span style={{
                color: '#3B82F6',
                fontWeight: '600',
                padding: '0.5rem 1rem',
                backgroundColor: '#1E3A8A20',
                borderRadius: '6px'
              }}>
                Explore Mods
              </span>
              <span style={{ color: '#9CA3AF', cursor: 'pointer', padding: '0.5rem 1rem' }}>
                Install Mods
              </span>
              <span style={{ color: '#9CA3AF', cursor: 'pointer', padding: '0.5rem 1rem' }}>
                Create Mods
              </span>
            </nav>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={handlePostModClick}
              style={{
                backgroundColor: '#10B981',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              📝 Post Mod
            </button>
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

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem 1.5rem',
        display: 'flex',
        gap: '2rem'
      }}>
        {/* Left Sidebar - Filters */}
        <aside style={{
          width: '280px',
          backgroundColor: '#1a1d24',
          borderRadius: '12px',
          padding: '1.5rem',
          height: 'fit-content',
          border: '1px solid #2a2d35'
        }}>
          {/* Categories */}
          <div style={{ marginBottom: '1.5rem' }}>
            <button
              onClick={() => toggleSection('categories')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                backgroundColor: '#252932',
                border: '1px solid #2a2d35',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '600'
              }}
            >
              <span>🏷️ Categories</span>
              <span style={{
                transform: expandedSections.categories ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }}>
                ▼
              </span>
            </button>
            {expandedSections.categories && (
              <div style={{
                marginTop: '0.5rem',
                backgroundColor: '#252932',
                border: '1px solid #2a2d35',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                {categories.map(category => (
                  <label key={category} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem 0',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, category]);
                        } else {
                          setSelectedCategories(selectedCategories.filter(c => c !== category));
                        }
                      }}
                      style={{ marginRight: '0.75rem', accentColor: '#3B82F6' }}
                    />
                    <span style={{ color: '#E5E7EB' }}>{category}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Themes */}
          <div style={{ marginBottom: '1.5rem' }}>
            <button
              onClick={() => toggleSection('themes')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                backgroundColor: '#252932',
                border: '1px solid #2a2d35',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '600'
              }}
            >
              <span>🎨 Themes</span>
              <span style={{
                transform: expandedSections.themes ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }}>
                ▼
              </span>
            </button>
            {expandedSections.themes && (
              <div style={{
                marginTop: '0.5rem',
                backgroundColor: '#252932',
                border: '1px solid #2a2d35',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                {themes.map(theme => (
                  <label key={theme} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem 0',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}>
                    <input
                      type="checkbox"
                      checked={selectedThemes.includes(theme)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedThemes([...selectedThemes, theme]);
                        } else {
                          setSelectedThemes(selectedThemes.filter(t => t !== theme));
                        }
                      }}
                      style={{ marginRight: '0.75rem', accentColor: '#3B82F6' }}
                    />
                    <span style={{ color: '#E5E7EB' }}>{theme}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Champions */}
          <div style={{ marginBottom: '1.5rem' }}>
            <button
              onClick={() => toggleSection('champions')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                backgroundColor: '#252932',
                border: '1px solid #2a2d35',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '600'
              }}
            >
              <span>⚔️ Champions</span>
              <span style={{
                transform: expandedSections.champions ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }}>
                ▼
              </span>
            </button>
            {expandedSections.champions && (
              <div style={{
                marginTop: '0.5rem',
                backgroundColor: '#252932',
                border: '1px solid #2a2d35',
                borderRadius: '8px',
                padding: '1rem',
                maxHeight: '300px',
                overflowY: 'auto'
              }}>
                <input
                  type="text"
                  placeholder="Search champions..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    marginBottom: '1rem',
                    backgroundColor: '#1a1d24',
                    border: '1px solid #2a2d35',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '0.9rem'
                  }}
                />
                {champions.slice(0, 20).map(champion => (
                  <label key={champion} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.4rem 0',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}>
                    <input
                      type="checkbox"
                      checked={selectedChampions.includes(champion)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedChampions([...selectedChampions, champion]);
                        } else {
                          setSelectedChampions(selectedChampions.filter(c => c !== champion));
                        }
                      }}
                      style={{ marginRight: '0.75rem', accentColor: '#3B82F6' }}
                    />
                    <span style={{ color: '#E5E7EB' }}>{champion}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1 }}>
          {/* Search and Filter Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            <input
              type="text"
              placeholder="Search mods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: '1',
                minWidth: '300px',
                padding: '0.875rem 1rem',
                backgroundColor: '#1a1d24',
                border: '1px solid #2a2d35',
                borderRadius: '8px',
                color: 'white',
                fontSize: '1rem'
              }}
            />
            <label style={{ display: 'flex', alignItems: 'center', color: '#E5E7EB', fontSize: '0.9rem' }}>
              <input
                type="checkbox"
                checked={freeOnly}
                onChange={(e) => setFreeOnly(e.target.checked)}
                style={{ marginRight: '0.5rem', accentColor: '#3B82F6' }}
              />
              Free Only
            </label>
            <label style={{ display: 'flex', alignItems: 'center', color: '#E5E7EB', fontSize: '0.9rem' }}>
              <input
                type="checkbox"
                checked={paidOnly}
                onChange={(e) => setPaidOnly(e.target.checked)}
                style={{ marginRight: '0.5rem', accentColor: '#3B82F6' }}
              />
              Paid Only
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.875rem',
                backgroundColor: '#1a1d24',
                border: '1px solid #2a2d35',
                borderRadius: '8px',
                color: 'white',
                fontSize: '0.9rem'
              }}
            >
              <option>Latest</option>
              <option>Most Popular</option>
              <option>Most Downloaded</option>
              <option>Alphabetical</option>
            </select>
            <select
              value={viewCount}
              onChange={(e) => setViewCount(e.target.value)}
              style={{
                padding: '0.875rem',
                backgroundColor: '#1a1d24',
                border: '1px solid #2a2d35',
                borderRadius: '8px',
                color: 'white',
                fontSize: '0.9rem'
              }}
            >
              <option value="20">View: 20</option>
              <option value="40">View: 40</option>
              <option value="60">View: 60</option>
            </select>
          </div>

          {/* Results Count */}
          <div style={{
            marginBottom: '1.5rem',
            color: '#9CA3AF',
            fontSize: '0.95rem'
          }}>
            Showing {filteredMods.length} of {allMods.length} mods
          </div>

          {/* Mods Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredMods.map(mod => (
              <article key={mod.id} style={{
                backgroundColor: '#1a1d24',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #2a2d35',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
                onClick={() => onNavigate('modDetail', mod)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '100%',
                  height: '200px',
                  background: mod.image ? 
                    `url(${mod.image}) center/cover` :
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    backgroundColor: mod.price === 'Free' ? '#10B981' : '#F59E0B',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {mod.price}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    left: '0.75rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.75rem'
                  }}>
                    {mod.champion}
                  </div>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    color: 'white'
                  }}>
                    {mod.title}
                  </h3>
                  <a 
                    href={mod.authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.9rem',
                      color: '#3B82F6',
                      marginBottom: '0.75rem',
                      display: 'block',
                      textDecoration: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.textDecoration = 'none';
                    }}
                  >
                    {mod.author}
                  </a>
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#9CA3AF',
                    marginBottom: '1rem',
                    lineHeight: '1.4'
                  }}>
                    {mod.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    {mod.tags.slice(0, 3).map(tag => (
                      <span key={tag} style={{
                        backgroundColor: '#3B82F620',
                        color: '#3B82F6',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    color: '#6B7280'
                  }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <span>👁️ {mod.views}</span>
                      <span>⬇️ {mod.downloads}</span>
                      <span>❤️ {mod.likes}</span>
                    </div>
                    <a
                      href={mod.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: '#3B82F6',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#2563EB';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#3B82F6';
                      }}
                    >
                      Download
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredMods.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: '#6B7280'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No mods found</h3>
              <p>Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </main>
      </div>

      {/* Post Mod Modal */}
      <PostModModal
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
        onSubmit={handleModSubmit}
      />
    </div>
  );
}

export default ExploreMods;