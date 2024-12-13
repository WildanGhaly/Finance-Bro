import { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { useNavigate } from 'react-router-dom';
import Popup from '../components/Popup';

interface FormData {
  name: string;
  age: string;
  retireAge: string;
  retirePeriod: string;
  monthlyExpenses: string;
}

export default function RetirementForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    retireAge: '',
    retirePeriod: '',
    monthlyExpenses: ''
  });
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  const getHeaders = (contentType = false) => {
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${getAuthToken()}`,
    };
    
    if (contentType) {
      headers['Content-Type'] = 'application/json';
    }
    
    return headers;
  };

  // Fetch initial data when component mounts
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch('https://financebro-backend-958019176719.us-central1.run.app/tracker', {
        method: 'GET',
        headers: getHeaders()
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('GET Response Data:', data);
  
        // Access the nested profile object
        const profile = data.profile;
  
        // Set the fetched data as the form data
        setFormData({
          name: profile.name || '',
          age: profile.age?.toString() || '',
          retireAge: profile.retireAge?.toString() || '',
          retirePeriod: profile.retirePeriod?.toString() || '',
          monthlyExpenses: profile.monthlyExpenses?.toString() || ''
        });
      } else {
        console.error('Failed to fetch profile data');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      name: formData.name,
      age: parseInt(formData.age),
      retireAge: parseInt(formData.retireAge),
      retirePeriod: parseInt(formData.retirePeriod),
      monthlyExpenses: parseInt(formData.monthlyExpenses)
    };
  
    console.log('Payload being sent:', payload);
    const headers = getHeaders(true);
    console.log('PUT Request Headers:', headers);
  
    try {
      const response = await fetch('https://financebro-backend-958019176719.us-central1.run.app/tracker', {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(payload)
      });
  
      console.log('PUT Response:', response);
  
      if (response.ok) {
        if (response.status === 204) {
          setPopupMessage('Profile updated successfully!');
        } else {
          const result = await response.json();
          console.log('PUT Response Data:', result);
          setPopupMessage('Profile updated successfully!'); 
        }
      } else {
        const errorData = await response.json();
        console.error('Failed to update profile:', errorData);
        setPopupMessage('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setPopupMessage('An error occurred. Please try again.');
    }
  };  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const closePopup = () => {
    setPopupMessage(null);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <Card className="max-w-xl mx-auto p-6 space-y-6 bg-white shadow-none">
      <form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
    <Input
      id="name"
      name="name"
      placeholder="Name"
      value={formData.name}
      onChange={handleChange}
      className="h-12 bg-[#F8F9FE] border-[#1e3a8a] focus:border-[#1e3a8a] rounded-lg"
    />
  </div>

  <div>
    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
    <Input
      id="age"
      name="age"
      placeholder="Age"
      type="number"
      value={formData.age}
      onChange={handleChange}
      className="h-12 bg-[#F8F9FE] border-[#1e3a8a] focus:border-[#1e3a8a] rounded-lg"
    />
  </div>

  <div>
    <label htmlFor="retireAge" className="block text-sm font-medium text-gray-700">Retire Age</label>
    <Input
      id="retireAge"
      name="retireAge"
      placeholder="Retire Age"
      type="number"
      value={formData.retireAge}
      onChange={handleChange}
      className="h-12 bg-[#F8F9FE] border-[#1e3a8a] focus:border-[#1e3a8a] rounded-lg"
    />
  </div>

  <div>
    <label htmlFor="retirePeriod" className="block text-sm font-medium text-gray-700">Retire Period</label>
    <Input
      id="retirePeriod"
      name="retirePeriod"
      placeholder="Retire Period"
      value={formData.retirePeriod}
      onChange={handleChange}
      className="h-12 bg-[#F8F9FE] border-[#1e3a8a] focus:border-[#1e3a8a] rounded-lg"
    />
  </div>

  <div>
    <label htmlFor="monthlyExpenses" className="block text-sm font-medium text-gray-700">Monthly Expenses</label>
    <Input
      id="monthlyExpenses"
      name="monthlyExpenses"
      placeholder="Monthly Expenses"
      type="number"
      value={formData.monthlyExpenses}
      onChange={handleChange}
      className="h-12 bg-[#F8F9FE] border-[#1e3a8a] focus:border-[#1e3a8a] rounded-lg"
    />
  </div>

  <div className="pt-4 space-y-3">
    <Button 
      type="submit"
      className="w-full h-12 bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 rounded-lg text-white"
    >
      Save
    </Button>

    <Button 
      type="button"
      onClick={handleLogout}
      className="w-full h-12 bg-red-500 hover:bg-red-600 rounded-lg text-white"
    >
      Log Out
    </Button>
  </div>
</form>
      </Card>

      {popupMessage && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
}