const API_BASE_URL = 'https://pso-crm.vercel.app';

export const getTopCustomers = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gettopcustomer/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success && data.statusCode === 200) {
      return {
        success: true,
        data: data.data || [],
        message: data.message || 'Top customers fetched successfully'
      };
    } else {
      throw new Error(data.message || 'Failed to fetch top customers');
    }
  } catch (error) {
    console.error('Error fetching top customers:', error);
    throw error;
  }
};

export const getCustomerStats = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/customerstats/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        data: {
          total_customers: parseInt(data.data.total_customers) || 0,
          new_customers_current_month: parseInt(data.data.new_customers_current_month) || 0,
          average_spending: parseFloat(data.data.average_spending) || 0
        }
      };
    } else {
      throw new Error(data.message || 'Failed to fetch customer statistics');
    }
  } catch (error) {
    console.error('Error fetching customer stats:', error);
    throw error;
  }
};

export const getAllCustomers = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/getcustomers/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        data: data.data || []
      };
    } else {
      throw new Error(data.message || 'Failed to fetch customers');
    }
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const deleteCustomer = async (customerId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/deletecustomer/${customerId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        message: data.message || 'Customer deleted successfully'
      };
    } else {
      throw new Error(data.message || 'Failed to delete customer');
    }
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};

export const updateCustomer = async (customerId, customerData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/editcustomer/${customerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        message: data.message || 'Customer updated successfully'
      };
    } else {
      throw new Error(data.message || 'Failed to update customer');
    }
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};
