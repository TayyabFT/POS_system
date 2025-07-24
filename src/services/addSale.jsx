// src/api/salesApi.js


const API_BASE_URL = 'https://pso-crm.vercel.app'; // Update with your actual API base URL




export const getSales = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/getsales`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch sales data');
    }

    const data = await response.json();
    console.log("Sales data fetched:", data);
    return data.message || [];
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw error;
  }
};





export const addNewSale = async (saleData) => {
  const user_id = localStorage.getItem('userid'); // Assuming user_id is stored in localStorage
  console.log(saleData)
  try {
    const response = await fetch(`${API_BASE_URL}/addsale/${user_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        invoice_id: saleData.invoice_id,
        customer_name: saleData.customer_name,
        total_items: saleData.total_items,
        total_amount: saleData.total_amount,
        payment_method: saleData.payment_method,
        status: saleData.status
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add new sale');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding new sale:', error);
    throw error;
  }
};