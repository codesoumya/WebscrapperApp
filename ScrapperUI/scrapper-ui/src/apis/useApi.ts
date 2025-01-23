import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { BACKEND_ENDPOINT } from '../config/endpoint.config';
import { useSearchParams } from 'react-router-dom';

const API_URL = `${BACKEND_ENDPOINT}/users`; // Replace with your backend URL

// Fetch all users
export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch user by ID
export const fetchUserById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new user
export const createUser = async (user: { name: string; phoneNumber: string; password: string }) => {
    // Generate a unique UUID for the user
    const userWithId = { ...user, id: uuidv4() };

    const response = await axios.post(API_URL, userWithId);
    return response.data;
};

// Delete a user by ID
export const deleteUser = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const fetchWebsiteDetails = async (email: string, password: string) => {
    try {
        const response = await fetch(`${BACKEND_ENDPOINT}/getAllSiteDetails?email=${email}&password=${password}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return data;  // Return the fetched data

    } catch (err) {
        console.error('Error fetching data:', err);
        throw err;  // Re-throw error for further handling
    }
};

export const scrapeWebsite = async (
    email: string,
    password: string,
    webUrl: string
): Promise<any> => {
    try {
        const urlParams = new URLSearchParams()
        urlParams.append("email", email)
        urlParams.append("password", password)
        urlParams.append("webUrl", webUrl)
        const response = await fetch(`${BACKEND_ENDPOINT}/scrape?${urlParams.toString()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error('Failed to scrape website');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Unknown error');
    }
};

export const deleteSite = async (id: string): Promise<number> => {
    try {
      const response = await axios.delete(`${BACKEND_ENDPOINT}/deleteSite?id=${id}`);
      return response.status;  // Return the status code from the response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.status; // Return the error status code if the request fails
      }
      // Handle unexpected errors
      throw new Error('An unexpected error occurred');
    }
  };


  export const updateSiteDetails = async (websiteDetails: any): Promise<void> => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/updateSiteDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(websiteDetails), // Convert the object to JSON
      });
  
      if (response.ok) {
        console.log("Website details updated successfully.");
      } else {
        console.warn("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error updating website details:", error);
    }
  };
  

