#!/bin/bash

# SonarCloud Local Analysis Script
# Make sure you have sonar-scanner installed globally

echo "🧪 Running tests with coverage..."
npm run test:coverage

echo "🔍 Running ESLint..."
npm run lint

echo "📊 Starting SonarCloud analysis..."
sonar-scanner \
  -Dsonar.projectKey=your-organization_your-project-key \
  -Dsonar.organization=your-organization \
  -Dsonar.host.url=https://sonarcloud.io \
  -Dsonar.login=$SONAR_TOKEN

echo "✅ SonarCloud analysis complete!"
echo "Check your results at: https://sonarcloud.io/dashboard?id=your-organization_your-project-key" 