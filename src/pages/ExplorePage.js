import React from 'react';import React from 'react';import React, { useState } from 'react';import React, { useState } from 'react';import React, { useState } from 'react';



const ExplorePage = () => {

  return (

    <div style={{ const ExplorePage = () => {import './ExplorePage.css';

      minHeight: '100vh', 

      backgroundColor: '#1a1a1a',   return (

      color: 'white', 

      padding: '2rem'     <div>import './ExplorePage.css';import './ExplorePage.css';

    }}>

      <h1 style={{       <h1>Explore Mods</h1>

        fontSize: '2rem', 

        marginBottom: '1rem',      <p>Page under construction</p>const ExplorePage = () => {

        color: '#4a90e2'

      }}>    </div>

        Explore Mods

      </h1>  );  const [expandedSections, setExpandedSections] = useState({

      <p style={{ color: '#ccc' }}>

        Mod browsing page with sidebar filters coming soon...};

      </p>

    </div>    categories: true,

  );

};export default ExplorePage;

    themes: false,const ExplorePage = () => {const ExplorePage = () => {

export default ExplorePage;
    features: false,

    colors: false,  // State for collapsible sections  // State for collapsible sections

    champions: false

  });  const [expandedSections, setExpandedSections] = useState({  const [expandedSections, setExpandedSections] = useState({



  const toggleSection = (section) => {    categories: true,    categories: true,

    setExpandedSections(prev => ({

      ...prev,    themes: false,    themes: false,

      [section]: !prev[section]

    }));    features: false,    features: false,

  };

    colors: false,    colors: false,

  const mods = [

    {    champions: false    champions: false

      id: 1,

      title: "Holy Rengar",  });  });

      author: "@Frog",

      category: "Champion Mod",

      theme: "Anime",

      views: 1,  const toggleSection = (section) => {  const toggleSection = (section) => {

      downloads: 1,

      likes: 0,    setExpandedSections(prev => ({    setExpandedSections(prev => ({

      image: "/api/placeholder/280/200",

      champion: "Rengar"      ...prev,      ...prev,

    },

    {      [section]: !prev[section]      [section]: !prev[section]

      id: 2,

      title: "Gojo Lulu",    }));    }));

      author: "@Frog",

      category: "Champion Mod",   };  };

      theme: "Anime",

      views: 1,

      downloads: 1,

      likes: 0,  // Sample mod data (based on the images)  // Sample mod data (based on the images)

      image: "/api/placeholder/280/200",

      champion: "Lulu"  const mods = [  const mods = [

    },

    {    {    {

      id: 3,

      title: "Blue Archives BGM",      id: 1,      id: 1,

      author: "@aureusil",

      category: "Sound Effects",      title: "Holy Rengar",      title: "Holy Rengar",

      theme: "Anime",

      views: 1,      author: "@Frog",      author: "@Frog",

      downloads: 1,

      likes: 1,      category: "Champion Mod",      category: "Champion Mod",

      image: "/api/placeholder/280/200"

    },      theme: "Anime",      theme: "Anime",

    {

      id: 4,      views: 1,      views: 1,

      title: "Smaller Minimap Icons",

      author: "@Moga",      downloads: 1,      downloads: 1,

      category: "HUD/UI",

      theme: "Game",      likes: 0,      likes: 0,

      views: 3,

      downloads: 2,      image: "/api/placeholder/280/200",      image: "/api/placeholder/280/200",

      likes: 2,

      image: "/api/placeholder/280/200"      champion: "Rengar"      champion: "Rengar"

    }

  ];    },    },



  const categories = [    {    {

    "Champion Mod", "Map Mod", "Sound Effects", "Font", 

    "Announcer", "HUD/UI", "Other", "Recalls"      id: 2,      id: 2,

  ];

      title: "Gojo Lulu",      title: "Gojo Lulu",

  const themes = [

    "Anime", "Game", "Edgy", "NSFW", "Meme", "Riot Style", "Chibi", "Other", "Chroma"      author: "@Frog",      author: "@Frog",

  ];

      category: "Champion Mod",       category: "Champion Mod", 

  const features = [

    "Animations", "Model", "Visual Effects", "Sound Effects", "Voice Over"      theme: "Anime",      theme: "Anime",

  ];

      views: 1,      views: 1,

  const colors = [

    "black", "white", "red", "blue", "green", "yellow", "purple", "orange", "other"      downloads: 1,      downloads: 1,

  ];

      likes: 0,      likes: 0,

  const champions = [

    "Aatrox", "Ahri", "Akali", "Akshan", "Alistar", "Ambessa", "Amumu"      image: "/api/placeholder/280/200",      image: "/api/placeholder/280/200",

  ];

      champion: "Lulu"      champion: "Lulu"

  return (

    <div className="explore-page">    },    },

      <div className="explore-header">

        <div className="explore-nav">    {    {

          <span className="nav-item active">Explore Mods</span>

          <span className="nav-item">Install Mods</span>      id: 3,      id: 3,

          <span className="nav-item">Create Mods</span>

        </div>      title: "Blue Archives BGM",      title: "Blue Archives BGM",

      </div>

      author: "@aureusil",      author: "@aureusil",

      <div className="explore-content">

        <div className="explore-sidebar">      category: "Sound Effects",      category: "Sound Effects",

          <div className="filter-section">

            <div className="filter-header" onClick={() => toggleSection('categories')}>      theme: "Anime",      theme: "Anime",

              <span className="filter-icon">🏷️</span>

              <span>Categories</span>      views: 1,      views: 1,

              <span className={`expand-icon ${expandedSections.categories ? 'expanded' : ''}`}>

                ▼      downloads: 1,      downloads: 1,

              </span>

            </div>      likes: 1,      likes: 1,

            {expandedSections.categories && (

              <div className="filter-options">      image: "/api/placeholder/280/200"      image: "/api/placeholder/280/200"

                {categories.map(category => (

                  <label key={category} className="filter-option">    },    },

                    <input type="checkbox" />

                    <span>{category}</span>    {    {

                  </label>

                ))}      id: 4,      id: 4,

              </div>

            )}      title: "Smaller Minimap Icons",      title: "Smaller Minimap Icons",

          </div>

      author: "@Moga",      author: "@Moga",

          <div className="filter-section">

            <div className="filter-header" onClick={() => toggleSection('themes')}>      category: "HUD/UI",      category: "HUD/UI",

              <span className="filter-icon">🎨</span>

              <span>Themes</span>      theme: "Game",      theme: "Game",

              <span className={`expand-icon ${expandedSections.themes ? 'expanded' : ''}`}>

                ▼      views: 3,      views: 3,

              </span>

            </div>      downloads: 2,      downloads: 2,

            {expandedSections.themes && (

              <div className="filter-options">      likes: 2,      likes: 2,

                {themes.map(theme => (

                  <label key={theme} className="filter-option">      image: "/api/placeholder/280/200"      image: "/api/placeholder/280/200"

                    <input type="checkbox" />

                    <span>{theme}</span>    },    },

                  </label>

                ))}    {    {

              </div>

            )}      id: 5,      id: 5,

          </div>

      title: "Dark Star Quinn",      title: "Dark Star Quinn",

          <div className="filter-section">

            <div className="filter-header" onClick={() => toggleSection('features')}>      author: "@Frog",      author: "@Frog",

              <span className="filter-icon">⚡</span>

              <span>Features</span>      category: "Champion Mod",      category: "Champion Mod",

              <span className={`expand-icon ${expandedSections.features ? 'expanded' : ''}`}>

                ▼      theme: "Dark",      theme: "Dark",

              </span>

            </div>      views: 4,      views: 4,

            {expandedSections.features && (

              <div className="filter-options">      downloads: 2,      downloads: 2,

                {features.map(feature => (

                  <label key={feature} className="filter-option">      likes: 1,      likes: 1,

                    <input type="checkbox" />

                    <span>{feature}</span>      image: "/api/placeholder/280/200",      image: "/api/placeholder/280/200",

                  </label>

                ))}      champion: "Quinn"      champion: "Quinn"

              </div>

            )}    },    },

          </div>

    {    {

          <div className="filter-section">

            <div className="filter-header" onClick={() => toggleSection('colors')}>      id: 6,      id: 6,

              <span className="filter-icon">🎨</span>

              <span>Colors</span>      title: "Dark Star Rammus",      title: "Dark Star Rammus",

              <span className={`expand-icon ${expandedSections.colors ? 'expanded' : ''}`}>

                ▼      author: "@Frog",       author: "@Frog", 

              </span>

            </div>      category: "Champion Mod",      category: "Champion Mod",

            {expandedSections.colors && (

              <div className="filter-options">      theme: "Dark",      theme: "Dark",

                {colors.map(color => (

                  <label key={color} className="filter-option">      views: 4,      views: 4,

                    <input type="checkbox" />

                    <span>{color}</span>      downloads: 3,      downloads: 3,

                  </label>

                ))}      likes: 1,      likes: 1,

              </div>

            )}      image: "/api/placeholder/280/200",      image: "/api/placeholder/280/200",

          </div>

      champion: "Rammus"      champion: "Rammus"

          <div className="filter-section">

            <div className="filter-header" onClick={() => toggleSection('champions')}>    },    },

              <span className="filter-icon">⚔️</span>

              <span>Champions</span>    {    {

              <span className={`expand-icon ${expandedSections.champions ? 'expanded' : ''}`}>

                ▼      id: 7,      id: 7,

              </span>

            </div>      title: "Dark Star Velkoz",      title: "Dark Star Velkoz",

            {expandedSections.champions && (

              <div className="filter-options">      author: "@Frog",      author: "@Frog",

                <div className="champion-search">

                  <input       category: "Champion Mod",      category: "Champion Mod",

                    type="text" 

                    placeholder="Search champions..."       theme: "Dark",       theme: "Dark", 

                    className="champion-search-input"

                  />      views: 3,      views: 3,

                </div>

                {champions.map(champion => (      downloads: 3,      downloads: 3,

                  <label key={champion} className="filter-option">

                    <input type="checkbox" />      likes: 0,      likes: 0,

                    <span>{champion}</span>

                  </label>      image: "/api/placeholder/280/200",      image: "/api/placeholder/280/200",

                ))}

              </div>      champion: "Vel'Koz"      champion: "Vel'Koz"

            )}

          </div>    },    },

        </div>

    {    {

        <div className="explore-main">

          <div className="explore-controls">      id: 8,      id: 8,

            <div className="search-container">

              <input       title: "Dark Star Shen",      title: "Dark Star Shen",

                type="text" 

                placeholder="Search mods..."       author: "@Frog",      author: "@Frog",

                className="search-input"

              />      category: "Champion Mod",      category: "Champion Mod",

            </div>

            <div className="view-controls">      theme: "Dark",      theme: "Dark",

              <label className="checkbox-label">

                <input type="checkbox" />      views: 4,      views: 4,

                Free Only

              </label>      downloads: 1,      downloads: 1,

              <label className="checkbox-label">

                <input type="checkbox" />      likes: 1,      likes: 1,

                Paid Only

              </label>      image: "/api/placeholder/280/200",      image: "/api/placeholder/280/200",

              <select className="sort-select">

                <option>Latest</option>      champion: "Shen"      champion: "Shen"

                <option>Most Popular</option>

                <option>Most Downloads</option>    }    }

              </select>

              <select className="view-select">  ];  ];

                <option>View: 20</option>

                <option>View: 40</option>

                <option>View: 60</option>

              </select>  // Filter options  // Filter options

            </div>

          </div>  const categories = [  const categories = [



          <div className="mods-grid">    "Champion Mod", "Map Mod", "Sound Effects", "Font",     "Champion Mod", "Map Mod", "Sound Effects", "Font", 

            {mods.map(mod => (

              <div key={mod.id} className="mod-card">    "Announcer", "HUD/UI", "Other", "Recalls"    "Announcer", "HUD/UI", "Other", "Recalls"

                <div className="mod-image">

                  <img src={mod.image} alt={mod.title} />  ];  ];

                  {mod.champion && (

                    <div className="mod-champion-tag">

                      <img src="/api/placeholder/32/32" alt={mod.champion} />

                      <span>{mod.champion}</span>  const themes = [  const themes = [

                    </div>

                  )}    "Anime", "Game", "Edgy", "NSFW", "Meme", "Riot Style", "Chibi", "Other", "Chroma"    "Anime", "Game", "Edgy", "NSFW", "Meme", "Riot Style", "Chibi", "Other", "Chroma"

                </div>

                <div className="mod-info">  ];  ];

                  <div className="mod-title">{mod.title}</div>

                  <div className="mod-author">{mod.author}</div>

                  <div className="mod-stats">

                    <span>👁️ {mod.views}</span>  const features = [  const features = [

                    <span>⬇️ {mod.downloads}</span>

                    <span>❤️ {mod.likes}</span>    "Animations", "Model", "Visual Effects", "Sound Effects", "Voice Over"    "Animations", "Model", "Visual Effects", "Sound Effects", "Voice Over"

                  </div>

                </div>  ];  ];

              </div>

            ))}

          </div>

        </div>  const colors = [  const colors = [

      </div>

    </div>    "black", "white", "red", "blue", "green", "yellow", "purple", "orange", "other"    "black", "white", "red", "blue", "green", "yellow", "purple", "orange", "other"

  );

};  ];  ];



export default ExplorePage;

  const champions = [  const champions = [

    "Aatrox", "Ahri", "Akali", "Akshan", "Alistar", "Ambessa", "Amumu"    "Aatrox", "Ahri", "Akali", "Akshan", "Alistar", "Ambessa", "Amumu"

  ];  ];



  return (  return (

    <div className="explore-page">    <div className="explore-page">

      {/* Header */}      {/* Header */}

      <div className="explore-header">      <div className="explore-header">

        <div className="explore-nav">        <div className="explore-nav">

          <span className="nav-item active">Explore Mods</span>          <span className="nav-item active">Explore Mods</span>

          <span className="nav-item">Install Mods</span>          <span className="nav-item">Install Mods</span>

          <span className="nav-item">Create Mods</span>          <span className="nav-item">Create Mods</span>

        </div>        </div>

      </div>      </div>



      <div className="explore-content">      <div className="explore-content">

        {/* Sidebar with filters */}        {/* Sidebar with filters */}

        <div className="explore-sidebar">        <div className="explore-sidebar">

          {/* Categories */}          {/* Categories */}

          <div className="filter-section">          <div className="filter-section">

            <div             <div 

              className="filter-header"              className="filter-header"

              onClick={() => toggleSection('categories')}              onClick={() => toggleSection('categories')}

            >            >

              <span className="filter-icon">🏷️</span>              <span className="filter-icon">🏷️</span>

              <span>Categories</span>              <span>Categories</span>

              <span className={`expand-icon ${expandedSections.categories ? 'expanded' : ''}`}>              <span className={`expand-icon ${expandedSections.categories ? 'expanded' : ''}`}>

                ▼                ▼

              </span>              </span>

            </div>            </div>

            {expandedSections.categories && (            {expandedSections.categories && (

              <div className="filter-options">              <div className="filter-options">

                {categories.map(category => (                {categories.map(category => (

                  <label key={category} className="filter-option">                  <label key={category} className="filter-option">

                    <input type="checkbox" />                    <input type="checkbox" />

                    <span>{category}</span>                    <span>{category}</span>

                  </label>                  </label>

                ))}                ))}

              </div>              </div>

            )}            )}

          </div>          </div>



          {/* Themes */}          {/* Themes */}

          <div className="filter-section">          <div className="filter-section">

            <div             <div 

              className="filter-header"              className="filter-header"

              onClick={() => toggleSection('themes')}              onClick={() => toggleSection('themes')}

            >            >

              <span className="filter-icon">🎨</span>              <span className="filter-icon">🎨</span>

              <span>Themes</span>              <span>Themes</span>

              <span className={`expand-icon ${expandedSections.themes ? 'expanded' : ''}`}>              <span className={`expand-icon ${expandedSections.themes ? 'expanded' : ''}`}>

                ▼                ▼

              </span>              </span>

            </div>            </div>

            {expandedSections.themes && (            {expandedSections.themes && (

              <div className="filter-options">              <div className="filter-options">

                {themes.map(theme => (                {themes.map(theme => (

                  <label key={theme} className="filter-option">                  <label key={theme} className="filter-option">

                    <input type="checkbox" />                    <input type="checkbox" />

                    <span>{theme}</span>                    <span>{theme}</span>

                  </label>                  </label>

                ))}                ))}

              </div>              </div>

            )}            )}

          </div>          </div>



          {/* Features */}          {/* Features */}

          <div className="filter-section">          <div className="filter-section">

            <div             <div 

              className="filter-header"              className="filter-header"

              onClick={() => toggleSection('features')}              onClick={() => toggleSection('features')}

            >            >

              <span className="filter-icon">⚡</span>              <span className="filter-icon">⚡</span>

              <span>Features</span>              <span>Features</span>

              <span className={`expand-icon ${expandedSections.features ? 'expanded' : ''}`}>              <span className={`expand-icon ${expandedSections.features ? 'expanded' : ''}`}>

                ▼                ▼

              </span>              </span>

            </div>            </div>

            {expandedSections.features && (            {expandedSections.features && (

              <div className="filter-options">              <div className="filter-options">

                {features.map(feature => (                {features.map(feature => (

                  <label key={feature} className="filter-option">                  <label key={feature} className="filter-option">

                    <input type="checkbox" />                    <input type="checkbox" />

                    <span>{feature}</span>                    <span>{feature}</span>

                  </label>                  </label>

                ))}                ))}

              </div>              </div>

            )}            )}

          </div>          </div>



          {/* Colors */}          {/* Colors */}

          <div className="filter-section">          <div className="filter-section">

            <div             <div 

              className="filter-header"              className="filter-header"

              onClick={() => toggleSection('colors')}              onClick={() => toggleSection('colors')}

            >            >

              <span className="filter-icon">🎨</span>              <span className="filter-icon">🎨</span>

              <span>Colors</span>              <span>Colors</span>

              <span className={`expand-icon ${expandedSections.colors ? 'expanded' : ''}`}>              <span className={`expand-icon ${expandedSections.colors ? 'expanded' : ''}`}>

                ▼                ▼

              </span>              </span>

            </div>            </div>

            {expandedSections.colors && (            {expandedSections.colors && (

              <div className="filter-options">              <div className="filter-options">

                {colors.map(color => (                {colors.map(color => (

                  <label key={color} className="filter-option">                  <label key={color} className="filter-option">

                    <input type="checkbox" />                    <input type="checkbox" />

                    <span>{color}</span>                    <span>{color}</span>

                  </label>                  </label>

                ))}                ))}

              </div>              </div>

            )}            )}

          </div>          </div>



          {/* Champions */}          {/* Champions */}

          <div className="filter-section">          <div className="filter-section">

            <div             <div 

              className="filter-header"              className="filter-header"

              onClick={() => toggleSection('champions')}              onClick={() => toggleSection('champions')}

            >            >

              <span className="filter-icon">⚔️</span>              <span className="filter-icon">⚔️</span>

              <span>Champions</span>              <span>Champions</span>

              <span className={`expand-icon ${expandedSections.champions ? 'expanded' : ''}`}>              <span className={`expand-icon ${expandedSections.champions ? 'expanded' : ''}`}>

                ▼                ▼

              </span>              </span>

            </div>            </div>

            {expandedSections.champions && (            {expandedSections.champions && (

              <div className="filter-options">              <div className="filter-options">

                <div className="champion-search">                <div className="champion-search">

                  <input                   <input 

                    type="text"                     type="text" 

                    placeholder="Search champions..."                     placeholder="Search champions..." 

                    className="champion-search-input"                    className="champion-search-input"

                  />                  />

                </div>                </div>

                {champions.map(champion => (                {champions.map(champion => (

                  <label key={champion} className="filter-option">                  <label key={champion} className="filter-option">

                    <input type="checkbox" />                    <input type="checkbox" />

                    <span>{champion}</span>                    <span>{champion}</span>

                  </label>                  </label>

                ))}                ))}

              </div>              </div>

            )}            )}

          </div>          </div>

        </div>        </div>



        {/* Main content area */}        {/* Main content area */}

        <div className="explore-main">        <div className="explore-main">

          {/* Search and filters */}          {/* Search and filters */}

          <div className="explore-controls">          <div className="explore-controls">

            <div className="search-container">            <div className="search-container">

              <input               <input 

                type="text"                 type="text" 

                placeholder="Search mods..."                 placeholder="Search mods..." 

                className="search-input"                className="search-input"

              />              />

            </div>            </div>

            <div className="view-controls">            <div className="view-controls">

              <label className="checkbox-label">              <label className="checkbox-label">

                <input type="checkbox" />                <input type="checkbox" />

                Free Only                Free Only

              </label>              </label>

              <label className="checkbox-label">              <label className="checkbox-label">

                <input type="checkbox" />                <input type="checkbox" />

                Paid Only                Paid Only

              </label>              </label>

              <select className="sort-select">              <select className="sort-select">

                <option>Latest</option>                <option>Latest</option>

                <option>Most Popular</option>                <option>Most Popular</option>

                <option>Most Downloads</option>                <option>Most Downloads</option>

              </select>              </select>

              <select className="view-select">              <select className="view-select">

                <option>View: 20</option>                <option>View: 20</option>

                <option>View: 40</option>                <option>View: 40</option>

                <option>View: 60</option>                <option>View: 60</option>

              </select>              </select>

            </div>            </div>

          </div>          </div>



          {/* Mods grid */}          {/* Mods grid */}

          <div className="mods-grid">          <div className="mods-grid">

            {mods.map(mod => (            {mods.map(mod => (

              <div key={mod.id} className="mod-card">              <div key={mod.id} className="mod-card">

                <div className="mod-image">                <div className="mod-image">

                  <img src={mod.image} alt={mod.title} />                  <img src={mod.image} alt={mod.title} />

                  {mod.champion && (                  {mod.champion && (

                    <div className="mod-champion-tag">                    <div className="mod-champion-tag">

                      <img src="/api/placeholder/32/32" alt={mod.champion} />                      <img src="/api/placeholder/32/32" alt={mod.champion} />

                      <span>{mod.champion}</span>                      <span>{mod.champion}</span>

                    </div>                    </div>

                  )}                  )}

                </div>                </div>

                <div className="mod-info">                <div className="mod-info">

                  <div className="mod-title">{mod.title}</div>                  <div className="mod-title">{mod.title}</div>

                  <div className="mod-author">{mod.author}</div>                  <div className="mod-author">{mod.author}</div>

                  <div className="mod-stats">                  <div className="mod-stats">

                    <span>👁️ {mod.views}</span>                    <span>👁️ {mod.views}</span>

                    <span>⬇️ {mod.downloads}</span>                    <span>⬇️ {mod.downloads}</span>

                    <span>❤️ {mod.likes}</span>                    <span>❤️ {mod.likes}</span>

                  </div>                  </div>

                </div>                </div>

              </div>              </div>

            ))}            ))}

          </div>          </div>

        </div>        </div>

      </div>      </div>

    </div>    </div>

  );  );

};};



export default ExplorePage;export default ExplorePage;
      category: "Environment",
      description: "Detailed urban environments with dynamic weather."
    },
    {
      id: 6,
      title: "Quantum Leap",
      author: "TimeTraveler",
      downloads: "11.2M",
      rating: 4.8,
      category: "Adventure",
      description: "Time manipulation mechanics and paradox storylines."
    }
  ];

  const categories = ['all', 'Adventure', 'Tech', 'Stealth', 'Environment', 'Graphics', 'Gameplay'];

  const filteredMods = mods.filter(mod => {
    const matchesSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mod.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || mod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedMods = [...filteredMods].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return parseFloat(b.downloads) - parseFloat(a.downloads);
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Explore Mods
          </h1>
          <p className="text-gray-300">
            Discover amazing content created by our community of talented modders.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search mods, creators, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
              🔍
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-300">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-300">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-400 ml-auto">
              {sortedMods.length} results found
            </div>
          </div>
        </div>

        {/* Mods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMods.map(mod => (
            <div key={mod.id} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 transition-all group cursor-pointer">
              {/* Mod Image */}
              <div className="h-48 bg-gradient-to-br from-purple-600 to-blue-600 relative">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-semibold">
                    View Details
                  </button>
                </div>
              </div>

              {/* Mod Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg group-hover:text-blue-400 transition-colors">
                    {mod.title}
                  </h3>
                  <span className="text-xs bg-blue-600 px-2 py-1 rounded">
                    {mod.category}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-2">by {mod.author}</p>
                
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {mod.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(mod.rating) ? 'text-yellow-400' : 'text-gray-600'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{mod.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400">{mod.downloads} downloads</span>
                </div>

                <div className="mt-3 flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm font-semibold transition-colors">
                    Install
                  </button>
                  <button className="px-3 py-2 border border-gray-600 hover:border-gray-400 rounded text-sm transition-colors">
                    ♡
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-gray-800 hover:bg-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
            Load More Mods
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;