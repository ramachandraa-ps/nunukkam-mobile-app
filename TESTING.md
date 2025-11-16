# Testing Guide

## Setup

Install testing dependencies:

```bash
npm install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage
```bash
npm test -- --coverage
```

## Test Structure

```
src/
├── contexts/
│   └── __tests__/
│       ├── AuthContext.test.tsx
│       └── ThemeContext.test.tsx
├── navigation/
│   └── __tests__/
│       └── AppNavigator.test.tsx
└── screens/
    ├── auth/
    │   └── __tests__/
    │       └── LoginScreen.test.tsx
    └── home/
        └── __tests__/
            └── HomeDashboardScreen.test.tsx
```

## Test Coverage

The test suite covers:

### AuthContext Tests
- ✅ Initial state verification
- ✅ Sign in functionality
- ✅ Login with validation
- ✅ Logout functionality
- ✅ Error handling
- ✅ Loading states

### ThemeContext Tests
- ✅ Initial theme state
- ✅ Theme toggling (light/dark)
- ✅ Color properties
- ✅ Default fallback

### LoginScreen Tests
- ✅ Form rendering
- ✅ Input validation
- ✅ Email format validation
- ✅ Password length validation
- ✅ Successful login flow
- ✅ Navigation to forgot password

### HomeDashboardScreen Tests
- ✅ Screen rendering
- ✅ Data loading
- ✅ Error handling

### AppNavigator Tests
- ✅ Authenticated routing
- ✅ Unauthenticated routing
- ✅ Loading states

## Debugging Tests

To debug a specific test:

```bash
npm test -- LoginScreen.test.tsx
```

To see console logs during tests:

```bash
npm test -- --verbose
```

## Common Issues

### Issue: Tests fail with "Cannot find module"
**Solution**: Run `npm install` to ensure all dependencies are installed

### Issue: Navigation mocks not working
**Solution**: Check `jest.setup.js` for proper navigation mocks

### Issue: Context provider errors
**Solution**: Ensure all screens are wrapped with required providers in tests

## Writing New Tests

When adding new tests:

1. Create a `__tests__` folder in the same directory as your component
2. Name your test file `ComponentName.test.tsx`
3. Wrap components with required providers (Theme, Auth, Data)
4. Use `@testing-library/react-native` utilities
5. Follow the existing test patterns

Example:

```typescript
import React from 'react';
import { render } from '@testing-library/react-native';
import { MyComponent } from '../MyComponent';
import { ThemeProvider } from '../../../contexts/ThemeContext';

describe('MyComponent', () => {
  const renderComponent = () => {
    return render(
      <ThemeProvider>
        <MyComponent />
      </ThemeProvider>
    );
  };

  it('should render correctly', () => {
    const { getByText } = renderComponent();
    expect(getByText('Expected Text')).toBeTruthy();
  });
});
```
