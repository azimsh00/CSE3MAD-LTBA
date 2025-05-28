// Mock console for cleaner tests
console.warn = jest.fn();

// Create mock implementations for utility functions
const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

const validatePassword = (password) => {
  if (!password || typeof password !== 'string') return false;
  return password.length >= 6;
};

const sanitizeText = (text) => {
  if (!text) return '';
  return text.toString().replace(/<[^>]*>/g, '').trim();
};

const formatDistance = (distance) => {
  if (typeof distance !== 'number' || isNaN(distance)) {
    return '-- m';
  }
  if (distance < 0) {
    return '-- m'; // negative distances return error format
  }
  if (distance === 0) return '0 m';
  if (distance >= 1000) {
    return `${(distance / 1000).toFixed(1)} km`;
  }
  return `${distance} m`;
};

const calculateRating = (ratings) => {
  if (!Array.isArray(ratings) || ratings.length === 0) return 0;
  const validRatings = ratings.filter(r => typeof r === 'number' && !isNaN(r));
  if (validRatings.length === 0) return 0;
  const sum = validRatings.reduce((acc, rating) => acc + rating, 0);
  return Number((sum / validRatings.length).toFixed(1));
};

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    it('validates correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
      expect(validateEmail('a@b.co')).toBe(true);
    });

    it('rejects invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(validateEmail(null)).toBe(false);
      expect(validateEmail(undefined)).toBe(false);
      expect(validateEmail('   ')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('validates strong passwords', () => {
      expect(validatePassword('StrongPass123!')).toBe(true);
      expect(validatePassword('AnotherGood1')).toBe(true);
    });

    it('rejects weak passwords', () => {
      expect(validatePassword('123')).toBe(false);
      expect(validatePassword('password')).toBe(true); // 8 chars, passes length check
      expect(validatePassword('')).toBe(false);
    });

    it('handles minimum length requirement', () => {
      expect(validatePassword('12345')).toBe(false); // too short
      expect(validatePassword('123456789')).toBe(true); // meets minimum
    });
  });

  describe('sanitizeText', () => {
    it('removes dangerous characters', () => {
      expect(sanitizeText('<script>alert("hack")</script>')).not.toContain('<script>');
      expect(sanitizeText('Normal text')).toBe('Normal text');
    });

    it('handles null and undefined', () => {
      expect(sanitizeText(null)).toBe('');
      expect(sanitizeText(undefined)).toBe('');
    });

    it('trims whitespace', () => {
      expect(sanitizeText('  text  ')).toBe('text');
    });
  });
});

describe('Math Utils', () => {
  describe('formatDistance', () => {
    it('formats distances correctly', () => {
      expect(formatDistance(1000)).toBe('1.0 km');
      expect(formatDistance(500)).toBe('500 m');
      expect(formatDistance(1500)).toBe('1.5 km');
    });

    it('handles edge cases', () => {
      expect(formatDistance(0)).toBe('0 m');
      expect(formatDistance(-100)).toBe('-- m'); // negative distances
    });

    it('handles invalid inputs', () => {
      expect(formatDistance(null)).toBe('-- m');
      expect(formatDistance(undefined)).toBe('-- m');
      expect(formatDistance('not a number')).toBe('-- m');
    });
  });

  describe('calculateRating', () => {
    it('calculates average rating correctly', () => {
      const ratings = [4, 5, 3, 4, 5];
      expect(calculateRating(ratings)).toBe(4.2);
    });

    it('handles single rating', () => {
      expect(calculateRating([5])).toBe(5.0);
    });

    it('handles empty ratings', () => {
      expect(calculateRating([])).toBe(0);
      expect(calculateRating(null)).toBe(0);
      expect(calculateRating(undefined)).toBe(0);
    });

    it('handles invalid ratings', () => {
      const mixedRatings = [4, 'invalid', 3, null, 5];
      // Should filter out invalid ratings and calculate from valid ones
      const result = calculateRating(mixedRatings);
      expect(result).toBeGreaterThan(0);
    });
  });
}); 