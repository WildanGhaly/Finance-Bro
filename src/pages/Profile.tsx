'use client'
import { useState } from 'react'
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
            placeholder="Montly Expenses"
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