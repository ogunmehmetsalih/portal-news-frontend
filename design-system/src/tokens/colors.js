// Design Tokens - Renkler
export const colors = {
  // Primary Colors
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE', 
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6', // Ana mavi
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A'
  },

  // Skills & Technology Colors
  skills: {
    react: {
      color: '#61DAFB',
      background: '#E6F7FF',
      darkBackground: '#0B3B5C'
    },
    node: {
      color: '#539E43',
      background: '#F6FFED',
      darkBackground: '#1F3D20'
    },
    typescript: {
      color: '#3178C6',
      background: '#E6F4FF',
      darkBackground: '#0F2A5C'
    },
    aws: {
      color: '#FF9900',
      background: '#FFF7E6',
      darkBackground: '#5C3A0B'
    },
    docker: {
      color: '#2496ED',
      background: '#E6F7FF',
      darkBackground: '#0B3B5C'
    },
    mongodb: {
      color: '#47A248',
      background: '#F6FFED',
      darkBackground: '#1F3D20'
    }
  },

  // Language Colors
  languages: {
    turkish: { bg: '#EFF6FF', border: '#3B82F6', text: '#2563EB' },
    english: { bg: '#F5F3FF', border: '#8B5CF6', text: '#6D28D9' },
    german: { bg: '#ECFDF5', border: '#10B981', text: '#059669' }
  },

  // Status Colors
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6'
  },

  // Gray Scale
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827'
  }
};

// Role Colors Function
export const getRoleColor = (role) => {
  const roleColors = {
    'Yönetici': 'red',
    'Geliştirici': 'blue',
    'Tasarımcı': 'purple',
    'Pazarlama': 'orange',
    'İK Uzmanı': 'green'
  };
  return roleColors[role] || 'default';
};

// Status Colors Function  
export const getStatusColor = (status) => {
  const statusColors = {
    'Aktif': 'green',
    'Meşgul': 'orange', 
    'İzinde': 'blue',
    'Pasif': 'red'
  };
  return statusColors[status] || 'default';
}; 