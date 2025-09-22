import React, { useState } from 'react';

function CreatePage() {
  const [activeTab, setActiveTab] = useState('project');
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    category: 'gameplay',
    tags: [],
    visibility: 'public'
  });

  const categories = [
    'gameplay', 'graphics', 'audio', 'ui', 'content', 'tools', 'library'
  ];

  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag.trim() && !projectData.tags.includes(newTag.trim())) {
      setProjectData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setProjectData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleInputChange = (field, value) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Create New Project
          </h1>
          <p className="text-gray-300">
            Start building your next amazing mod with our powerful development tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('project')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'project'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                📋 Project Info
              </button>
              <button
                onClick={() => setActiveTab('files')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'files'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                📁 Files & Assets
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'code'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                💻 Code Editor
              </button>
              <button
                onClick={() => setActiveTab('test')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'test'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                🧪 Test & Debug
              </button>
              <button
                onClick={() => setActiveTab('publish')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'publish'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                🚀 Publish
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'project' && (
              <div className="space-y-6">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-6">Project Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Name</label>
                      <input
                        type="text"
                        value={projectData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your project name..."
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={projectData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe what your mod does..."
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select
                        value={projectData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Tags</label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {projectData.tags.map(tag => (
                          <span
                            key={tag}
                            className="bg-purple-600 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                          >
                            <span>{tag}</span>
                            <button
                              onClick={() => removeTag(tag)}
                              className="text-purple-200 hover:text-white"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addTag()}
                          placeholder="Add a tag..."
                          className="flex-1 px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                        />
                        <button
                          onClick={addTag}
                          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Visibility</label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="visibility"
                            value="public"
                            checked={projectData.visibility === 'public'}
                            onChange={(e) => handleInputChange('visibility', e.target.value)}
                            className="text-purple-600"
                          />
                          <span>🌍 Public - Anyone can view and download</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="visibility"
                            value="unlisted"
                            checked={projectData.visibility === 'unlisted'}
                            onChange={(e) => handleInputChange('visibility', e.target.value)}
                            className="text-purple-600"
                          />
                          <span>🔗 Unlisted - Only accessible via direct link</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="visibility"
                            value="private"
                            checked={projectData.visibility === 'private'}
                            onChange={(e) => handleInputChange('visibility', e.target.value)}
                            className="text-purple-600"
                          />
                          <span>🔒 Private - Only you can access</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'files' && (
              <div className="space-y-6">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-6">Files & Assets</h2>
                  
                  {/* File Upload Area */}
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center mb-6 hover:border-purple-500 transition-colors">
                    <div className="text-4xl mb-4">📁</div>
                    <h3 className="text-lg font-semibold mb-2">Drop files here or click to upload</h3>
                    <p className="text-gray-400 mb-4">Support for .zip, .rar, .js, .json, .png, .jpg, and more</p>
                    <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-colors">
                      Choose Files
                    </button>
                  </div>

                  {/* File Tree */}
                  <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
                    <h4 className="font-semibold mb-4">Project Structure</h4>
                    <div className="space-y-1 text-sm font-mono">
                      <div className="flex items-center space-x-2">
                        <span>📂</span>
                        <span>my-awesome-mod/</span>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <span>📄</span>
                        <span>manifest.json</span>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <span>📄</span>
                        <span>main.js</span>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <span>📂</span>
                        <span>assets/</span>
                      </div>
                      <div className="flex items-center space-x-2 ml-8">
                        <span>🖼️</span>
                        <span>icon.png</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="space-y-6">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-6">Code Editor</h2>
                  
                  <div className="bg-gray-900 border border-gray-600 rounded-lg">
                    <div className="flex items-center justify-between border-b border-gray-600 px-4 py-2">
                      <div className="flex space-x-2">
                        <button className="bg-purple-600 px-3 py-1 rounded text-sm">main.js</button>
                        <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm">manifest.json</button>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-white text-sm">Save</button>
                        <button className="text-gray-400 hover:text-white text-sm">Format</button>
                      </div>
                    </div>
                    <div className="p-4">
                      <pre className="text-sm text-gray-300 font-mono">
{`// Welcome to the HEXRTBRXENCHROMAS Mod Editor
// This is where you can write your mod code

class MyAwesomeMod {
  constructor() {
    this.name = "My Awesome Mod";
    this.version = "1.0.0";
  }

  initialize() {
    console.log("Initializing", this.name);
    // Your mod initialization code here
  }

  onLoad() {
    // Called when the mod is loaded
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Add your event listeners here
  }
}

// Export your mod
module.exports = MyAwesomeMod;`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'test' && (
              <div className="space-y-6">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-6">Test & Debug</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Quick Test</h3>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg mb-4 transition-colors">
                        🚀 Run in Test Environment
                      </button>
                      <button className="w-full bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg mb-4 transition-colors">
                        ✅ Validate Code
                      </button>
                      <button className="w-full bg-yellow-600 hover:bg-yellow-700 px-4 py-3 rounded-lg transition-colors">
                        🔍 Check Dependencies
                      </button>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Console Output</h3>
                      <div className="bg-gray-900 border border-gray-600 rounded-lg p-4 h-48 overflow-y-auto font-mono text-sm">
                        <div className="text-green-400">[INFO] Mod validation started...</div>
                        <div className="text-blue-400">[DEBUG] Loading manifest.json</div>
                        <div className="text-green-400">[INFO] Manifest validation passed</div>
                        <div className="text-blue-400">[DEBUG] Analyzing code structure</div>
                        <div className="text-green-400">[INFO] All tests passed ✅</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'publish' && (
              <div className="space-y-6">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-6">Publish Your Mod</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-4">Pre-publish Checklist</h3>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="text-purple-600" />
                          <span>✅ All required files are included</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="text-purple-600" />
                          <span>✅ Code has been tested and validated</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="text-purple-600" />
                          <span>✅ Description and metadata are complete</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="text-purple-600" />
                          <span>✅ License and permissions are set</span>
                        </label>
                      </div>
                    </div>

                    <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-200 mb-2">Publishing Guidelines</h4>
                      <ul className="text-sm text-yellow-100 space-y-1">
                        <li>• Ensure your mod follows our community guidelines</li>
                        <li>• Include clear installation instructions</li>
                        <li>• Test compatibility with popular mods</li>
                        <li>• Provide screenshots or demo videos</li>
                      </ul>
                    </div>

                    <div className="flex space-x-4">
                      <button className="flex-1 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                        🚀 Publish Now
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors">
                        💾 Save Draft
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;