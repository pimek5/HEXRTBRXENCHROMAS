import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function PostModModal({ isOpen, onClose, onSubmit }) {
  const { currentUser, isAuthenticated } = useAuth();
  const [modData, setModData] = useState({
    title: '',
    description: '',
    category: 'Skins',
    champion: '',
    image: '',
    tags: [],
    price: 'Free',
    downloadLink: ''
  });
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Skins',
    'Sound Effects', 
    'HUD/UI',
    'Maps',
    'Champions',
    'Items',
    'Effects',
    'Other'
  ];

  const champions = [
    'Global', 'Aatrox', 'Ahri', 'Akali', 'Akshan', 'Alistar', 'Amumu', 'Anivia', 'Annie', 'Aphelios',
    'Ashe', 'Aurelion Sol', 'Azir', 'Bard', 'Bel\'Veth', 'Blitzcrank', 'Brand', 'Braum', 'Caitlyn',
    'Camille', 'Cassiopeia', 'Cho\'Gath', 'Corki', 'Darius', 'Diana', 'Dr. Mundo', 'Draven', 'Ekko',
    'Elise', 'Evelynn', 'Ezreal', 'Fiddlesticks', 'Fiora', 'Fizz', 'Galio', 'Gangplank', 'Garen',
    'Gnar', 'Gragas', 'Graves', 'Gwen', 'Hecarim', 'Heimerdinger', 'Illaoi', 'Irelia', 'Ivern',
    'Janna', 'Jarvan IV', 'Jax', 'Jayce', 'Jhin', 'Jinx', 'Kai\'Sa', 'Kalista', 'Karma', 'Karthus',
    'Kassadin', 'Katarina', 'Kayle', 'Kayn', 'Kennen', 'Kha\'Zix', 'Kindred', 'Kled', 'Kog\'Maw',
    'LeBlanc', 'Lee Sin', 'Leona', 'Lillia', 'Lissandra', 'Lucian', 'Lulu', 'Lux', 'Malphite',
    'Malzahar', 'Maokai', 'Master Yi', 'Miss Fortune', 'Mordekaiser', 'Morgana', 'Nami', 'Nasus',
    'Nautilus', 'Neeko', 'Nidalee', 'Nocturne', 'Nunu', 'Olaf', 'Orianna', 'Ornn', 'Pantheon',
    'Poppy', 'Pyke', 'Qiyana', 'Quinn', 'Rakan', 'Rammus', 'Rek\'Sai', 'Rell', 'Renata', 'Renekton',
    'Rengar', 'Riven', 'Rumble', 'Ryze', 'Samira', 'Sejuani', 'Senna', 'Seraphine', 'Sett', 'Shaco',
    'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 'Skarner', 'Sona', 'Soraka', 'Swain', 'Sylas',
    'Syndra', 'Tahm Kench', 'Taliyah', 'Talon', 'Taric', 'Teemo', 'Thresh', 'Tristana', 'Trundle',
    'Tryndamere', 'Twisted Fate', 'Twitch', 'Udyr', 'Urgot', 'Varus', 'Vayne', 'Veigar', 'Vel\'Koz',
    'Vex', 'Vi', 'Viego', 'Viktor', 'Vladimir', 'Volibear', 'Warwick', 'Wukong', 'Xayah', 'Xerath',
    'Xin Zhao', 'Yasuo', 'Yone', 'Yorick', 'Yuumi', 'Zac', 'Zed', 'Zeri', 'Ziggs', 'Zilean',
    'Zoe', 'Zyra'
  ];

  const handleInputChange = (field, value) => {
    setModData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !modData.tags.includes(newTag.trim()) && modData.tags.length < 10) {
      setModData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setModData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('Please log in to post a mod');
      return;
    }

    if (!modData.title.trim() || !modData.description.trim() || !modData.image.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const newMod = {
        ...modData,
        id: Date.now(),
        author: currentUser.displayName || currentUser.username,
        authorId: currentUser.id,
        authorRole: currentUser.role,
        views: 0,
        downloads: 0,
        likes: 0,
        status: 'pending',
        featured: false,
        uploadDate: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      };

      await onSubmit(newMod);
      
      // Reset form
      setModData({
        title: '',
        description: '',
        category: 'Skins',
        champion: '',
        image: '',
        tags: [],
        price: 'Free',
        downloadLink: ''
      });
      
      onClose();
      alert('✅ Mod submitted successfully! It will be reviewed by administrators.');
    } catch (error) {
      alert('❌ Error submitting mod. Please try again.');
      console.error('Error submitting mod:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
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
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#1a1d24',
        borderRadius: '12px',
        border: '1px solid #2a2d35',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #2a2d35',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: '700',
            margin: 0
          }}>
            📝 Post New Mod
          </h2>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#9CA3AF',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
          {/* Title */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              Mod Title *
            </label>
            <input
              type="text"
              value={modData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter mod title..."
              style={{
                width: '100%',
                backgroundColor: '#0f0f0f',
                border: '1px solid #2a2d35',
                borderRadius: '8px',
                color: 'white',
                padding: '0.75rem',
                fontSize: '0.9rem'
              }}
              required
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              Description *
            </label>
            <textarea
              value={modData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your mod..."
              rows={4}
              style={{
                width: '100%',
                backgroundColor: '#0f0f0f',
                border: '1px solid #2a2d35',
                borderRadius: '8px',
                color: 'white',
                padding: '0.75rem',
                fontSize: '0.9rem',
                resize: 'vertical'
              }}
              required
            />
          </div>

          {/* Category and Champion */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <label style={{
                display: 'block',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                Category *
              </label>
              <select
                value={modData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#0f0f0f',
                  border: '1px solid #2a2d35',
                  borderRadius: '8px',
                  color: 'white',
                  padding: '0.75rem',
                  fontSize: '0.9rem'
                }}
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                Champion
              </label>
              <select
                value={modData.champion}
                onChange={(e) => handleInputChange('champion', e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#0f0f0f',
                  border: '1px solid #2a2d35',
                  borderRadius: '8px',
                  color: 'white',
                  padding: '0.75rem',
                  fontSize: '0.9rem'
                }}
              >
                <option value="">Select Champion</option>
                {champions.map(champion => (
                  <option key={champion} value={champion}>{champion}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              Preview Image URL *
            </label>
            <input
              type="url"
              value={modData.image}
              onChange={(e) => handleInputChange('image', e.target.value)}
              placeholder="https://imgur.com/your-image.png"
              style={{
                width: '100%',
                backgroundColor: '#0f0f0f',
                border: '1px solid #2a2d35',
                borderRadius: '8px',
                color: 'white',
                padding: '0.75rem',
                fontSize: '0.9rem'
              }}
              required
            />
            {modData.image && (
              <div style={{ marginTop: '0.5rem' }}>
                <img
                  src={modData.image}
                  alt="Preview"
                  style={{
                    width: '100px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    border: '1px solid #2a2d35'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Download Link */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              Download Link
            </label>
            <input
              type="url"
              value={modData.downloadLink}
              onChange={(e) => handleInputChange('downloadLink', e.target.value)}
              placeholder="https://example.com/mod-download"
              style={{
                width: '100%',
                backgroundColor: '#0f0f0f',
                border: '1px solid #2a2d35',
                borderRadius: '8px',
                color: 'white',
                padding: '0.75rem',
                fontSize: '0.9rem'
              }}
            />
          </div>

          {/* Tags */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              Tags (max 10)
            </label>
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add tag..."
                style={{
                  flex: 1,
                  backgroundColor: '#0f0f0f',
                  border: '1px solid #2a2d35',
                  borderRadius: '8px',
                  color: 'white',
                  padding: '0.5rem',
                  fontSize: '0.9rem'
                }}
              />
              <button
                type="button"
                onClick={addTag}
                disabled={modData.tags.length >= 10}
                style={{
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  opacity: modData.tags.length >= 10 ? 0.5 : 1
                }}
              >
                Add
              </button>
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.25rem'
            }}>
              {modData.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    backgroundColor: '#374151',
                    color: '#D1D5DB',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#9CA3AF',
                      cursor: 'pointer',
                      padding: 0,
                      fontSize: '0.8rem'
                    }}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Price */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              Price
            </label>
            <select
              value={modData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#0f0f0f',
                border: '1px solid #2a2d35',
                borderRadius: '8px',
                color: 'white',
                padding: '0.75rem',
                fontSize: '0.9rem'
              }}
            >
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
              <option value="Donation">Donation</option>
            </select>
          </div>

          {/* Submit Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: '#6B7280',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: '#10B981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                opacity: isSubmitting ? 0.7 : 1
              }}
            >
              {isSubmitting ? '🔄 Submitting...' : '📝 Submit Mod'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostModModal;