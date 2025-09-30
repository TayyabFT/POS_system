const API_BASE_URL = 'https://pso-crm.vercel.app';

export const createEvent = async (eventData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/addproduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        data: data.data,
        message: data.message || 'Event created successfully'
      };
    } else {
      throw new Error(data.message || 'Failed to create event');
    }
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/getproducts`, {
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
      const eventProducts = data.message.filter(
        (product) => product.is_event === true
      );
      return {
        success: true,
        data: eventProducts
      };
    } else {
      throw new Error(data.message || 'Failed to fetch events');
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/editproduct/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        data: data.data,
        message: data.message || 'Event updated successfully'
      };
    } else {
      throw new Error(data.message || 'Failed to update event');
    }
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/deleteproduct/${eventId}`, {
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
        message: data.message || 'Event deleted successfully'
      };
    } else {
      throw new Error(data.message || 'Failed to delete event');
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
