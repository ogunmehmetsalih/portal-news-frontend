/**
 * Güvenli rastgele şifre oluşturucu
 * @param {number} length - Şifre uzunluğu (varsayılan: 12)
 * @param {object} options - Şifre seçenekleri
 * @returns {string} Oluşturulan şifre
 */
export const generatePassword = (length = 12, options = {}) => {
  const defaultOptions = {
    includeLowercase: true,
    includeUppercase: true, 
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false, // O, 0, l, 1, I gibi benzer karakterleri hariç tut
    ...options
  };

  let charset = '';
  
  if (defaultOptions.includeLowercase) {
    charset += defaultOptions.excludeSimilar 
      ? 'abcdefghijkmnopqrstuvwxyz' 
      : 'abcdefghijklmnopqrstuvwxyz';
  }
  
  if (defaultOptions.includeUppercase) {
    charset += defaultOptions.excludeSimilar 
      ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' 
      : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  
  if (defaultOptions.includeNumbers) {
    charset += defaultOptions.excludeSimilar 
      ? '23456789' 
      : '0123456789';
  }
  
  if (defaultOptions.includeSymbols) {
    charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  }

  let password = '';
  
  // En az bir karakter her kategoriden ekle
  if (defaultOptions.includeLowercase) {
    const lowercase = defaultOptions.excludeSimilar 
      ? 'abcdefghijkmnopqrstuvwxyz' 
      : 'abcdefghijklmnopqrstuvwxyz';
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
  }
  
  if (defaultOptions.includeUppercase) {
    const uppercase = defaultOptions.excludeSimilar 
      ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' 
      : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
  }
  
  if (defaultOptions.includeNumbers) {
    const numbers = defaultOptions.excludeSimilar 
      ? '23456789' 
      : '0123456789';
    password += numbers[Math.floor(Math.random() * numbers.length)];
  }
  
  if (defaultOptions.includeSymbols) {
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    password += symbols[Math.floor(Math.random() * symbols.length)];
  }

  // Kalan karakterleri rastgele ekle
  for (let i = password.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  // Karakterleri karıştır
  return password.split('').sort(() => Math.random() - 0.5).join('');
};

/**
 * Şifre gücünü kontrol et
 * @param {string} password - Kontrol edilecek şifre
 * @returns {object} Şifre gücü bilgisi
 */
export const checkPasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    symbols: /[^a-zA-Z0-9]/.test(password)
  };

  const score = Object.values(checks).filter(Boolean).length;
  
  const strength = {
    0: { level: 'Çok Zayıf', color: 'red', percentage: 0 },
    1: { level: 'Zayıf', color: 'red', percentage: 20 },
    2: { level: 'Orta', color: 'orange', percentage: 40 },
    3: { level: 'İyi', color: 'yellow', percentage: 60 },
    4: { level: 'Güçlü', color: 'lightgreen', percentage: 80 },
    5: { level: 'Çok Güçlü', color: 'green', percentage: 100 }
  };

  return {
    ...strength[score],
    checks,
    score
  };
}; 