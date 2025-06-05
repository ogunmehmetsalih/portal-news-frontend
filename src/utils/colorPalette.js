// Dünya Standartları Renk Paleti - Modern UI/UX Standartları
export const TAG_COLORS = {
  // Durum Renkleri - Global Standartlar
  STATUS: {
    ACTIVE: 'rgba(34, 197, 94, 0.15)',       // Success Green (Tailwind) - Aktif/Devam Ediyor/Tamamlandı
    PENDING: 'rgba(251, 191, 36, 0.15)',     // Warning Amber (Tailwind) - Beklemede/Planlandı/Yakında
    WARNING: 'rgba(245, 158, 11, 0.15)',     // Warning Orange (Tailwind) - Meşgul/Orta
    DANGER: 'rgba(239, 68, 68, 0.15)',       // Error Red (Tailwind) - Hata/Yüksek/İptal
    INFO: 'rgba(59, 130, 246, 0.15)',        // Info Blue (Tailwind) - Bilgi/Normal/İnceleniyor
    PROCESSING: 'rgba(139, 92, 246, 0.15)',  // Violet (Tailwind) - İşleniyor/Geliştirme
    DEFAULT: 'rgba(156, 163, 175, 0.15)'     // Gray (Tailwind) - Varsayılan/İzinde
  },

  // Öncelik Renkleri - Evrensel Standartlar
  PRIORITY: {
    HIGH: 'rgba(239, 68, 68, 0.15)',         // Red - Yüksek öncelik
    MEDIUM: 'rgba(245, 158, 11, 0.15)',      // Orange - Orta öncelik
    LOW: 'rgba(34, 197, 94, 0.15)'           // Green - Düşük öncelik
  },

  // Tip Renkleri - Material Design Uyumlu
  TYPE: {
    SUGGESTION: 'rgba(59, 130, 246, 0.15)',  // Blue - Öneri
    BUG: 'rgba(239, 68, 68, 0.15)',         // Red - Hata
    FEATURE: 'rgba(139, 92, 246, 0.15)',     // Violet - Yeni özellik
    MEETING: 'rgba(6, 182, 212, 0.15)',      // Cyan - Toplantı
    TRAINING: 'rgba(34, 197, 94, 0.15)',     // Green - Eğitim
    DEADLINE: 'rgba(239, 68, 68, 0.15)',     // Red - Son teslim
    SOCIAL: 'rgba(168, 85, 247, 0.15)'       // Purple - Sosyal
  },

  // Rol Renkleri - Professional Standards
  ROLE: {
    ADMIN: 'rgba(59, 130, 246, 0.15)',       // Blue - Yönetici
    DEVELOPER: 'rgba(139, 92, 246, 0.15)',   // Violet - Geliştirici
    DESIGNER: 'rgba(236, 72, 153, 0.15)',    // Pink - Tasarımcı
    MARKETING: 'rgba(34, 197, 94, 0.15)',    // Green - Pazarlama
    HR: 'rgba(245, 158, 11, 0.15)',         // Orange - İnsan Kaynakları
    USER: 'rgba(156, 163, 175, 0.15)'        // Gray - Kullanıcı
  }
};

// Durum renk fonksiyonu
export const getStatusColor = (status) => {
  const statusMap = {
    'Aktif': TAG_COLORS.STATUS.ACTIVE,
    'Devam Ediyor': TAG_COLORS.STATUS.ACTIVE,
    'Tamamlandı': TAG_COLORS.STATUS.ACTIVE,
    'Beklemede': TAG_COLORS.STATUS.PENDING,
    'Planlandı': TAG_COLORS.STATUS.PENDING,
    'Yakında': TAG_COLORS.STATUS.PENDING,
    'Meşgul': TAG_COLORS.STATUS.WARNING,
    'Orta': TAG_COLORS.STATUS.WARNING,
    'Hata Bildirimi': TAG_COLORS.STATUS.DANGER,
    'Yüksek': TAG_COLORS.STATUS.DANGER,
    'İnceleniyor': TAG_COLORS.STATUS.INFO,
    'Geliştirme': TAG_COLORS.STATUS.PROCESSING,
    'İzinde': TAG_COLORS.STATUS.DEFAULT
  };
  return statusMap[status] || TAG_COLORS.STATUS.DEFAULT;
};

// Tip renk fonksiyonu  
export const getTypeColor = (type) => {
  const typeMap = {
    'Öneri': TAG_COLORS.TYPE.SUGGESTION,
    'öneri': TAG_COLORS.TYPE.SUGGESTION,
    'Hata Bildirimi': TAG_COLORS.TYPE.BUG,
    'hata': TAG_COLORS.TYPE.BUG,
    'Geliştirme': TAG_COLORS.TYPE.FEATURE,
    'geliştirme': TAG_COLORS.TYPE.FEATURE,
    'meeting': TAG_COLORS.TYPE.MEETING,
    'training': TAG_COLORS.TYPE.TRAINING,
    'deadline': TAG_COLORS.TYPE.DEADLINE,
    'social': TAG_COLORS.TYPE.SOCIAL
  };
  return typeMap[type] || TAG_COLORS.STATUS.INFO;
};

// Öncelik renk fonksiyonu
export const getPriorityColor = (priority) => {
  const priorityMap = {
    'Yüksek': TAG_COLORS.PRIORITY.HIGH,
    'Orta': TAG_COLORS.PRIORITY.MEDIUM,
    'Düşük': TAG_COLORS.PRIORITY.LOW
  };
  return priorityMap[priority] || TAG_COLORS.STATUS.DEFAULT;
};

// Rol renk fonksiyonu
export const getRoleColor = (role) => {
  const roleMap = {
    'Yönetici': TAG_COLORS.ROLE.ADMIN,
    'Geliştirici': TAG_COLORS.ROLE.DEVELOPER,
    'Tasarımcı': TAG_COLORS.ROLE.DESIGNER,
    'Pazarlama': TAG_COLORS.ROLE.MARKETING,
    'İnsan Kaynakları': TAG_COLORS.ROLE.HR,
    'Kullanıcı': TAG_COLORS.ROLE.USER
  };
  return roleMap[role] || TAG_COLORS.STATUS.INFO;
}; 