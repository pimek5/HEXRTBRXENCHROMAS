import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// User roles with hierarchy
export const USER_ROLES = {
  OWNER: 'Owner',
  SKIN_MAKER: 'Skin maker',
  USER: 'User'
};

// Role hierarchy for permissions (higher number = more permissions)
export const ROLE_HIERARCHY = {
  [USER_ROLES.OWNER]: 3,
  [USER_ROLES.SKIN_MAKER]: 2,
  [USER_ROLES.USER]: 1
};

// Admin credentials and default users
const ADMIN_CREDENTIALS = {
  username: 'p1mek',
  password: 'Karasinski1!'
};

const DEFAULT_USERS = [
  {
    id: 1,
    username: 'p1mek',
    displayName: 'p1mek',
    role: USER_ROLES.OWNER,
    avatar: '👑',
    isOnline: true,
    joinDate: 'January 2025'
  },
  {
    id: 2,
    username: 'testuser',
    displayName: 'testuser',
    role: USER_ROLES.USER,
    avatar: '👤',
    isOnline: false,
    joinDate: 'January 2025'
  },
  {
    id: 3,
    username: 'modlover',
    displayName: 'modlover',
    role: USER_ROLES.USER,
    avatar: '🎮',
    isOnline: true,
    joinDate: 'January 2025'
  }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(DEFAULT_USERS);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load saved auth state on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('hexrt_auth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        setCurrentUser(authData.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse saved auth:', error);
        localStorage.removeItem('hexrt_auth');
      }
    }

    const savedUsers = localStorage.getItem('hexrt_users');
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers));
      } catch (error) {
        console.error('Failed to parse saved users:', error);
      }
    }
  }, []);

  // Save auth state when it changes
  useEffect(() => {
    if (currentUser && isAuthenticated) {
      localStorage.setItem('hexrt_auth', JSON.stringify({
        user: currentUser,
        timestamp: Date.now()
      }));
    } else {
      localStorage.removeItem('hexrt_auth');
    }
  }, [currentUser, isAuthenticated]);

  // Save users when they change
  useEffect(() => {
    localStorage.setItem('hexrt_users', JSON.stringify(users));
  }, [users]);

  const login = (username, password) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const adminUser = users.find(u => u.username === username) || {
        id: 1,
        username: 'p1mek',
        displayName: 'p1mek',
        role: USER_ROLES.OWNER,
        avatar: '👑',
        isOnline: true,
        joinDate: 'January 2025'
      };
      
      setCurrentUser(adminUser);
      setIsAuthenticated(true);
      
      // Update user online status
      setUsers(prev => prev.map(u => 
        u.username === username 
          ? { ...u, isOnline: true }
          : u
      ));
      
      return { success: true, user: adminUser };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    if (currentUser) {
      // Update user online status
      setUsers(prev => prev.map(u => 
        u.id === currentUser.id 
          ? { ...u, isOnline: false }
          : u
      ));
    }
    
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('hexrt_auth');
  };

  const hasPermission = (requiredRole) => {
    if (!currentUser) return false;
    
    const userRoleLevel = ROLE_HIERARCHY[currentUser.role] || 0;
    const requiredRoleLevel = ROLE_HIERARCHY[requiredRole] || 0;
    
    return userRoleLevel >= requiredRoleLevel;
  };

  const isAdmin = () => {
    return hasPermission(USER_ROLES.OWNER);
  };

  const updateUserRole = (userId, newRole) => {
    if (!isAdmin()) return false;
    
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, role: newRole }
        : user
    ));
    
    // Update current user if they're the one being updated
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(prev => ({ ...prev, role: newRole }));
    }
    
    return true;
  };

  const addUser = (userData) => {
    if (!isAdmin()) return false;
    
    const newUser = {
      id: Date.now(),
      username: userData.username,
      displayName: userData.displayName || userData.username,
      role: userData.role || USER_ROLES.USER,
      avatar: userData.avatar || '👤',
      isOnline: false,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    
    setUsers(prev => [...prev, newUser]);
    return true;
  };

  const deleteUser = (userId) => {
    if (!isAdmin() || userId === currentUser?.id) return false;
    
    setUsers(prev => prev.filter(user => user.id !== userId));
    return true;
  };

  const getRoleBadge = (role) => {
    const badges = {
      [USER_ROLES.OWNER]: {
        color: '#FFD700',
        bgColor: '#FFD70020',
        icon: '👑',
        text: 'Owner'
      },
      [USER_ROLES.SKIN_MAKER]: {
        color: '#9333EA',
        bgColor: '#9333EA20',
        icon: '🎨',
        text: 'Skin maker'
      },
      [USER_ROLES.USER]: {
        color: '#6B7280',
        bgColor: '#6B728020',
        icon: '👤',
        text: 'User'
      }
    };
    
    return badges[role] || badges[USER_ROLES.USER];
  };

  const value = {
    currentUser,
    users,
    isAuthenticated,
    login,
    logout,
    hasPermission,
    isAdmin,
    updateUserRole,
    addUser,
    deleteUser,
    getRoleBadge,
    USER_ROLES,
    ROLE_HIERARCHY
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;