module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/android/app/src/__tests__/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-.*|@react-native-firebase)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  collectCoverageFrom: [
    'android/app/src/**/*.{js,jsx,ts,tsx}',
    'App.tsx',
    '!android/app/src/**/*.d.ts',
    '!android/app/src/**/index.{js,jsx,ts,tsx}',
    '!android/app/src/__tests__/**',
  ],
  // Coverage configuration for SonarCloud
  collectCoverage: false, // Set to true when running coverage
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
