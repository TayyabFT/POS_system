const API_BASE_URL = 'https://pso-crm.vercel.app'; // Update with your actual API base URL

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || data.error || 'Login failed. Please check your credentials.';
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    // Re-throw the error with the message
    throw error;
  }
};

export const signUpUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || data.error || 'Signup failed. Please try again.';
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('Signup error:', error);
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    // Re-throw the error with the message
    throw error;
  }
};