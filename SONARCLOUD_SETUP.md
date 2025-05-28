# SonarCloud Setup Guide

This guide will help you set up SonarCloud for continuous code quality analysis in your React Native project.

## 🚀 Quick Start

### 1. SonarCloud Account Setup

1. Go to [SonarCloud.io](https://sonarcloud.io)
2. Sign up with your GitHub account
3. Create a new organization or use an existing one
4. Import your repository

### 2. Project Configuration

1. **Update `sonar-project.properties`**:
   ```properties
   # Replace these values with your actual SonarCloud project details
   sonar.projectKey=your-organization_your-project-key
   sonar.organization=your-organization
   ```

2. **Update GitHub Actions workflow** (`.github/workflows/sonarcloud.yml`):
   ```yaml
   # Update these lines with your project details
   -Dsonar.projectKey=your-organization_your-project-key
   -Dsonar.organization=your-organization
   ```

3. **Set up GitHub Secrets**:
   - Go to your GitHub repository Settings → Secrets and variables → Actions
   - Add `SONAR_TOKEN` secret with your SonarCloud token

### 3. Generate SonarCloud Token

1. Go to SonarCloud → Your Account → Security
2. Generate a new token
3. Copy the token and add it to your GitHub repository secrets as `SONAR_TOKEN`

## 🔧 Local Development

### Prerequisites

Install SonarCloud Scanner CLI:

**Windows (using Chocolatey):**
```powershell
choco install sonarscanner-msbuild-net46
```

**macOS (using Homebrew):**
```bash
brew install sonar-scanner
```

**Manual Installation:**
Download from [SonarScanner documentation](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/)

### Running Analysis Locally

**On Windows:**
```powershell
# Set your SonarCloud token as environment variable
$env:SONAR_TOKEN = "your-sonarcloud-token"

# Run the analysis script
.\scripts\sonar-analysis.ps1
```

**On macOS/Linux:**
```bash
# Set your SonarCloud token as environment variable
export SONAR_TOKEN="your-sonarcloud-token"

# Make script executable and run
chmod +x scripts/sonar-analysis.sh
./scripts/sonar-analysis.sh
```

## 📊 Available Scripts

```bash
# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run SonarCloud analysis (requires sonar-scanner CLI)
npm run sonar

# Run linting
npm run lint
```

## 🧪 What SonarCloud Analyzes

### Code Quality
- **Bugs**: Potential runtime errors
- **Vulnerabilities**: Security issues
- **Code Smells**: Maintainability issues
- **Duplications**: Repeated code blocks

### Coverage Metrics
- **Line Coverage**: Percentage of lines executed by tests
- **Branch Coverage**: Percentage of branches executed by tests
- **Function Coverage**: Percentage of functions called by tests

### Quality Gates
Your project has the following quality thresholds:
- **Coverage**: ≥ 70%
- **Lines**: ≥ 70%
- **Functions**: ≥ 70%
- **Branches**: ≥ 70%

## 🔍 Understanding Results

### SonarCloud Dashboard
Access your project dashboard at: `https://sonarcloud.io/dashboard?id=your-organization_your-project-key`

### Key Metrics to Monitor
1. **Reliability Rating**: Based on bugs (A = 0 bugs, E = 50+ bugs)
2. **Security Rating**: Based on vulnerabilities
3. **Maintainability Rating**: Based on technical debt
4. **Coverage**: Percentage of code covered by tests
5. **Duplications**: Percentage of duplicated lines

## 🚦 Continuous Integration

The GitHub Actions workflow will:
1. **Trigger** on push/PR to main branches
2. **Install** dependencies
3. **Run** tests with coverage
4. **Execute** ESLint analysis
5. **Upload** results to SonarCloud
6. **Fail** the build if quality gate is not met

## 🛠️ Customization

### Adjusting Coverage Thresholds

Edit `jest.config.js`:
```javascript
coverageThreshold: {
  global: {
    branches: 80,    // Increase to 80%
    functions: 80,   // Increase to 80%
    lines: 80,       // Increase to 80%
    statements: 80,  // Increase to 80%
  },
}
```

### Excluding Files from Analysis

Edit `sonar-project.properties`:
```properties
# Add more exclusions
sonar.exclusions=**/node_modules/**,**/coverage/**,**/your-custom-exclusions/**
```

### Adding Custom Rules

1. Go to SonarCloud → Project → Quality Profiles
2. Create/copy a quality profile
3. Activate/deactivate specific rules
4. Assign the profile to your project

## 📚 Best Practices

### Before Committing
1. Run `npm run test:coverage` to ensure tests pass
2. Check coverage meets thresholds
3. Run `npm run lint` to fix code style issues

### Writing Testable Code
- Keep functions small and focused
- Use dependency injection
- Mock external dependencies
- Write tests for edge cases

### Improving Code Quality
- Address high-priority issues first
- Regularly review and refactor code smells
- Maintain test coverage above 80%
- Document complex logic

## 🆘 Troubleshooting

### Common Issues

**"Project not found" error:**
- Verify `sonar.projectKey` and `sonar.organization` in config files
- Check that the project exists in SonarCloud

**Coverage reports not uploaded:**
- Ensure tests run successfully before SonarCloud analysis
- Check that `coverage/lcov.info` file is generated
- Verify file paths in `sonar-project.properties`

**Authentication issues:**
- Verify `SONAR_TOKEN` is set correctly
- Ensure the token has appropriate permissions
- Check that the token hasn't expired

**High duplication warnings:**
- Consider extracting common code into utilities
- Use React components composition
- Review copy-paste code sections

## 📞 Support

- [SonarCloud Documentation](https://docs.sonarcloud.io/)
- [SonarCloud Community](https://community.sonarsource.com/)
- [React Native Testing Best Practices](https://reactnative.dev/docs/testing-overview) 