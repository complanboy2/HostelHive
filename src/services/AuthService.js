// This is a mock implementation of the authentication service.
// In a real application, you would replace these with actual API calls.

// For development purposes, we'll simulate successful API responses.
// Later, you can replace these with actual API endpoints.

export const login = async (email, password) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful response
    if (email && password) {
      return {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          name: 'Demo User',
          email: email,
          role: 'admin',
        },
      };
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Validate required fields
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error('All fields are required');
    }
    
    // Mock successful response
    return {
      token: 'mock-jwt-token',
      user: {
        id: '2',
        name: userData.name,
        email: userData.email,
        role: 'user',
      },
    };
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const socialLogin = async (provider, token) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (!provider || !token) {
      throw new Error('Provider and token are required');
    }
    
    // Mock successful response
    return {
      token: 'mock-social-jwt-token',
      user: {
        id: '3',
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        email: `user@${provider.toLowerCase()}.com`,
        provider: provider,
        role: 'user',
      },
    };
  } catch (error) {
    console.error('Social login error:', error);
    throw error;
  }
};