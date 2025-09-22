import React, { useState } from 'react';

function PostMod({ onBackToHome, onSubmitMod }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    champion: '',
    theme: '',
    price: 'Free',
    tags: '',
    modFile: null,
    images: [],
    videos: [],
    spotlightVideo: null
  });

  const [dragOver, setDragOver] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const categories = [
    "Champion Mod", "Map Mod", "Sound Effects", "Font",
    "Announcer", "HUD/UI", "Other", "Recalls"
  ];

  const themes = [
    "Anime", "Game", "Edgy", "NSFW", "Meme", "Riot Style", "Chibi", "Other", "Chroma"
  ];

  const champions = [
    "Global", "Aatrox", "Ahri", "Akali", "Akshan", "Alistar", "Ambessa", "Amumu", "Anivia", "Annie", "Aphelios", "Ashe", "Aurelion Sol", "Azir", "Bard", "Bel'Veth", "Blitzcrank", "Brand", "Braum", "Caitlyn", "Camille", "Cassiopeia", "Cho'Gath", "Corki", "Darius", "Diana", "Dr. Mundo", "Draven", "Ekko", "Elise", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", "Garen", "Gnar", "Gragas", "Graves", "Gwen", "Hecarim", "Heimerdinger", "Illaoi", "Irelia", "Ivern", "Janna", "Jarvan IV", "Jax", "Jayce", "Jhin", "Jinx", "K'Sante", "Kai'Sa", "Kalista", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kayn", "Kennen", "Kha'Zix", "Kindred", "Kled", "Kog'Maw", "LeBlanc", "Lee Sin", "Leona", "Lillia", "Lissandra", "Lucian", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai", "Master Yi", "Miss Fortune", "Mordekaiser", "Morgana", "Nami", "Nasus", "Nautilus", "Neeko", "Nidalee", "Nilah", "Nocturne", "Nunu & Willump", "Olaf", "Orianna", "Ornn", "Pantheon", "Poppy", "Pyke", "Qiyana", "Quinn", "Rakan", "Rammus", "Rek'Sai", "Rell", "Renata Glasc", "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Samira", "Sejuani", "Senna", "Seraphine", "Sett", "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Sona", "Soraka", "Swain", "Sylas", "Syndra", "Tahm Kench", "Taliyah", "Talon", "Taric", "Teemo", "Thresh", "Tristana", "Trundle", "Tryndamere", "Twisted Fate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Vel'Koz", "Vex", "Vi", "Viego", "Viktor", "Vladimir", "Volibear", "Warwick", "Wukong", "Xayah", "Xerath", "Xin Zhao", "Yasuo", "Yone", "Yorick", "Yuumi", "Zac", "Zed", "Zeri", "Ziggs", "Zilean", "Zoe", "Zyra"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (files, type) => {
    const fileArray = Array.from(files);
    
    if (type === 'modFile') {
      setFormData(prev => ({
        ...prev,
        modFile: fileArray[0]
      }));
    } else if (type === 'images') {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...fileArray]
      }));
    } else if (type === 'videos') {
      setFormData(prev => ({
        ...prev,
        videos: [...prev.videos, ...fileArray]
      }));
    } else if (type === 'spotlightVideo') {
      setFormData(prev => ({
        ...prev,
        spotlightVideo: fileArray[0]
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files, type);
  };

  const removeFile = (index, type) => {
    if (type === 'images') {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    } else if (type === 'videos') {
      setFormData(prev => ({
        ...prev,
        videos: prev.videos.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mod object with all the data
    const newMod = {
      id: Date.now(),
      title: formData.title,
      author: "@p1mek",
      authorUrl: "https://twitter.com/p1mek",
      category: formData.category,
      champion: formData.champion,
      theme: formData.theme,
      description: formData.description,
      price: formData.price,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      views: 0,
      downloads: 0,
      likes: 0,
      image: formData.images.length > 0 ? URL.createObjectURL(formData.images[0]) : null,
      images: formData.images.map(img => URL.createObjectURL(img)),
      videos: formData.videos.map(vid => URL.createObjectURL(vid)),
      spotlightVideo: formData.spotlightVideo ? URL.createObjectURL(formData.spotlightVideo) : null,
      modFile: formData.modFile,
      downloadUrl: "#", // This will be updated with actual download link
      createdAt: new Date().toISOString()
    };

    onSubmitMod(newMod);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0B0E13',
      color: 'white',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
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
              onClick={onBackToHome}
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
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#3B82F6'
            }}>
              Post New Mod
            </h1>
          </div>
        </div>
      </header>

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem 1.5rem'
      }}>
        {/* Progress Steps */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '3rem'
        }}>
          {[1, 2, 3].map(step => (
            <div key={step} style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: currentStep >= step ? '#3B82F6' : '#374151',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600'
              }}>
                {step}
              </div>
              <div style={{
                marginLeft: '0.5rem',
                marginRight: step < 3 ? '2rem' : '0',
                color: currentStep >= step ? '#3B82F6' : '#9CA3AF',
                fontSize: '0.9rem'
              }}>
                {step === 1 ? 'Basic Info' : step === 2 ? 'Media & Files' : 'Review'}
              </div>
              {step < 3 && (
                <div style={{
                  width: '60px',
                  height: '2px',
                  backgroundColor: currentStep > step ? '#3B82F6' : '#374151',
                  marginLeft: '1rem'
                }} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div style={{
              backgroundColor: '#1a1d24',
              borderRadius: '12px',
              padding: '2rem',
              border: '1px solid #2a2d35'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: 'white'
              }}>
                Basic Information
              </h2>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: '#E5E7EB'
                }}>
                  Mod Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#252932',
                    border: '1px solid #2a2d35',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                  placeholder="Enter mod title..."
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: '#E5E7EB'
                }}>
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#252932',
                    border: '1px solid #2a2d35',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                  placeholder="Describe your mod..."
                />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: '#E5E7EB'
                  }}>
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: '#252932',
                      border: '1px solid #2a2d35',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: '#E5E7EB'
                  }}>
                    Champion *
                  </label>
                  <select
                    name="champion"
                    value={formData.champion}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: '#252932',
                      border: '1px solid #2a2d35',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="">Select champion</option>
                    {champions.map(champ => (
                      <option key={champ} value={champ}>{champ}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: '#E5E7EB'
                  }}>
                    Theme
                  </label>
                  <select
                    name="theme"
                    value={formData.theme}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: '#252932',
                      border: '1px solid #2a2d35',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="">Select theme</option>
                    {themes.map(theme => (
                      <option key={theme} value={theme}>{theme}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: '#E5E7EB'
                  }}>
                    Price
                  </label>
                  <select
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: '#252932',
                      border: '1px solid #2a2d35',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: '#E5E7EB'
                }}>
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#252932',
                    border: '1px solid #2a2d35',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                  placeholder="anime, custom skin, epic..."
                />
              </div>

              <button
                type="button"
                onClick={nextStep}
                disabled={!formData.title || !formData.description || !formData.category || !formData.champion}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: formData.title && formData.description && formData.category && formData.champion ? '#3B82F6' : '#374151',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: formData.title && formData.description && formData.category && formData.champion ? 'pointer' : 'not-allowed'
                }}
              >
                Next: Media & Files →
              </button>
            </div>
          )}

          {/* Step 2: Media & Files */}
          {currentStep === 2 && (
            <div style={{
              backgroundColor: '#1a1d24',
              borderRadius: '12px',
              padding: '2rem',
              border: '1px solid #2a2d35'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: 'white'
              }}>
                Media & Files
              </h2>

              {/* Mod File Upload */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: '#E5E7EB'
                }}>
                  Mod File *
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'modFile')}
                  style={{
                    border: `2px dashed ${dragOver ? '#3B82F6' : '#2a2d35'}`,
                    borderRadius: '8px',
                    padding: '2rem',
                    textAlign: 'center',
                    backgroundColor: dragOver ? '#1E3A8A20' : '#252932',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="file"
                    accept=".zip,.rar,.7z"
                    onChange={(e) => handleFileUpload(e.target.files, 'modFile')}
                    style={{ display: 'none' }}
                    id="modFile"
                  />
                  <label htmlFor="modFile" style={{ cursor: 'pointer' }}>
                    {formData.modFile ? (
                      <div>
                        <p style={{ color: '#10B981', marginBottom: '0.5rem' }}>✓ File selected:</p>
                        <p style={{ color: '#E5E7EB' }}>{formData.modFile.name}</p>
                      </div>
                    ) : (
                      <div>
                        <p style={{ color: '#9CA3AF', marginBottom: '0.5rem' }}>📁 Drop mod file here or click to browse</p>
                        <p style={{ color: '#6B7280', fontSize: '0.8rem' }}>Supported: .zip, .rar, .7z</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Spotlight Video */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: '#E5E7EB'
                }}>
                  Spotlight Video (Optional)
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'spotlightVideo')}
                  style={{
                    border: `2px dashed ${dragOver ? '#3B82F6' : '#2a2d35'}`,
                    borderRadius: '8px',
                    padding: '2rem',
                    textAlign: 'center',
                    backgroundColor: dragOver ? '#1E3A8A20' : '#252932',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e.target.files, 'spotlightVideo')}
                    style={{ display: 'none' }}
                    id="spotlightVideo"
                  />
                  <label htmlFor="spotlightVideo" style={{ cursor: 'pointer' }}>
                    {formData.spotlightVideo ? (
                      <div>
                        <p style={{ color: '#10B981', marginBottom: '0.5rem' }}>✓ Video selected:</p>
                        <p style={{ color: '#E5E7EB' }}>{formData.spotlightVideo.name}</p>
                      </div>
                    ) : (
                      <div>
                        <p style={{ color: '#9CA3AF', marginBottom: '0.5rem' }}>🎬 Drop spotlight video here or click to browse</p>
                        <p style={{ color: '#6B7280', fontSize: '0.8rem' }}>Show off your mod in action</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Images Upload */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: '#E5E7EB'
                }}>
                  Images
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 'images')}
                  style={{
                    border: `2px dashed ${dragOver ? '#3B82F6' : '#2a2d35'}`,
                    borderRadius: '8px',
                    padding: '2rem',
                    textAlign: 'center',
                    backgroundColor: dragOver ? '#1E3A8A20' : '#252932',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileUpload(e.target.files, 'images')}
                    style={{ display: 'none' }}
                    id="images"
                  />
                  <label htmlFor="images" style={{ cursor: 'pointer' }}>
                    <p style={{ color: '#9CA3AF', marginBottom: '0.5rem' }}>🖼️ Drop images here or click to browse</p>
                    <p style={{ color: '#6B7280', fontSize: '0.8rem' }}>Multiple images supported</p>
                  </label>
                </div>
                
                {formData.images.length > 0 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                    gap: '1rem',
                    marginTop: '1rem'
                  }}>
                    {formData.images.map((img, index) => (
                      <div key={index} style={{ position: 'relative' }}>
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`Upload ${index}`}
                          style={{
                            width: '100%',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(index, 'images')}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            backgroundColor: '#EF4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem'
              }}>
                <button
                  type="button"
                  onClick={prevStep}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: '#374151',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.modFile}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: formData.modFile ? '#3B82F6' : '#374151',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: formData.modFile ? 'pointer' : 'not-allowed'
                  }}
                >
                  Next: Review →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div style={{
              backgroundColor: '#1a1d24',
              borderRadius: '12px',
              padding: '2rem',
              border: '1px solid #2a2d35'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: 'white'
              }}>
                Review & Submit
              </h2>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#3B82F6', marginBottom: '1rem' }}>Mod Preview</h3>
                
                <div style={{
                  backgroundColor: '#252932',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  border: '1px solid #2a2d35'
                }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{formData.title}</h4>
                  <p style={{ color: '#3B82F6', marginBottom: '0.75rem' }}>@p1mek</p>
                  <p style={{ color: '#9CA3AF', marginBottom: '1rem' }}>{formData.description}</p>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    {formData.tags.split(',').map((tag, index) => (
                      tag.trim() && (
                        <span key={index} style={{
                          backgroundColor: '#3B82F620',
                          color: '#3B82F6',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem'
                        }}>
                          {tag.trim()}
                        </span>
                      )
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#6B7280' }}>
                    <span>Category: {formData.category}</span>
                    <span>Champion: {formData.champion}</span>
                    <span>Price: {formData.price}</span>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem'
              }}>
                <button
                  type="button"
                  onClick={prevStep}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: '#374151',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  ← Previous
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: '#10B981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  🚀 Publish Mod
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default PostMod;