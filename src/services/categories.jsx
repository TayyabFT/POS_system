// utils/api.js
const API_BASE_URL = 'https://pso-crm.vercel.app'; // Replace with your actual API base URL

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/getcategory`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/addcategory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      throw new Error('Failed to create category');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};