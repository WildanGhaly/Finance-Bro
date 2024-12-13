'use client'
import { useState, useEffect } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card } from "../components/ui/card"

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
        setFormData({
          name: data.name || '',
          age: data.age?.toString() || '',
          retireAge: data.retireAge?.toString() || '',
          retirePeriod: data.retirePeriod?.toString() || '',
          monthlyExpenses: data.monthlyExpenses?.toString() || ''
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
    
    try {
      const response = await fetch('https://financebro-backend-958019176719.us-central1.run.app/tracker', {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
          name: formData.name,
          age: parseInt(formData.age),
          retireAge: parseInt(formData.retireAge),
          retirePeriod: parseInt(formData.retirePeriod),
          monthlyExpenses: parseInt(formData.monthlyExpenses)
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Update successful:', result);
        // You could add a success notification here
      } else {
        console.error('Failed to update profile');
        // You could add an error notification here
      }
    } catch (error) {
      console.error('Error updating profile:', error);
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
    console.log(localStorage.getItem('authToken'));
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <Card className="max-w-xl mx-auto p-6 space-y-6 bg-white shadow-none">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="h-12 bg-[#F8F9FE] border-[#1e3a8a] focus:border-[#1e3a8a] rounded-lg"
          />

          <Input
            name="age"
            placeholder="Age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            className="h-12 bg-[#F8F9FE] border-[#1e3a8a] focus:border-[#1e3a8a] rounded-lg"
          />

          <Input
            name="retireAge"
            placeholder="Retire Age"
            type="number"
            value={formData.retireAge}
            onChange={handleChange}
            className="h-12 bg-[#F8F9FE] border-[#1e3a8a] focus:border-[#1e3a8a] rounded-lg"
          />

          <Input
            name="retirePeriod"
            placeholder="Retire Period"
            value={formData.retirePeriod}
            onChange={handleChange}
            className="h-12 bg-[#F8F9FE] border-[#1e3a8a] focus:border-[#1e3a8a] rounded-lg"
          />

          <Input
            name="monthlyExpenses"
            placeholder="Monthly Expenses"
            type="number"
            value={formData.monthlyExpenses}
            onChange={handleChange}
            className="h-12 bg-[#F8F9FE] border-[#1e3a8a] focus:border-[#1e3a8a] rounded-lg"
          />

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
    </div>
  )
}