'use client'

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

interface SavingItem {
    name: string;
    amount: number;
    type: 'investment' | 'saving';
}

interface TargetedSaving {
    status: number;
    name: string;
    currentSavings: number;
    savingNeedPerMonth: number;
    savingGoal: number;
    savingPeriod: number;
}

interface ApiResponse {
    savings: SavingItem[];
}

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

export default function Dashboard() {
    const navigate = useNavigate();
    const [allSavings, setAllSavings] = useState<SavingItem[]>([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [savingGoal, setSavingGoal] = useState<number | null>(null);

    useEffect(() => {
        fetchSavings();
        fetchSavingGoal();
    }, []);

    const fetchSavings = async () => {
        try {
            const response = await fetch('https://financebro-backend-958019176719.us-central1.run.app/tracker/savings', {
                method: 'GET',
                headers: getHeaders()
            });
            if (!response.ok) throw new Error('Failed to fetch savings');
            
            const data: ApiResponse = await response.json();
            setAllSavings(data.savings);
            
            const total = data.savings.reduce((sum, item) => sum + item.amount, 0);
            setTotalAmount(total);
        } catch (error) {
            console.error('Error fetching savings:', error);
        }
    };

    const fetchSavingGoal = async () => {
        try {
            const response = await fetch('https://financebro-backend-958019176719.us-central1.run.app/calculator', {
                method: 'GET',
                headers: getHeaders()
            });
            if (!response.ok) throw new Error('Failed to fetch saving goal');
            
            const data: TargetedSaving = await response.json();
            setSavingGoal(data.savingGoal);
        } catch (error) {
            console.error('Error fetching saving goal:', error);
        }
    };

    const calculatePercentage = (amount: number) => {
        return Math.round((amount / totalAmount) * 100);
    };

    const formatAmount = (amount: number) => {
        return amount.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const savings = allSavings.filter(item => item.type === 'saving');
    const investments = allSavings.filter(item => item.type === 'investment');

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="p-4 space-y-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-black">Hello, Bob!</h1>
                    </div>
                    <Button 
                        size="icon" 
                        className="w-10 h-10 rounded-full bg-[#031A6E] text-white flex items-center justify-center" 
                        onClick={() => navigate('/my-savings')}
                    >
                        <Plus className="w-6 h-6 text-white font-bold" />
                    </Button>
                </div>

                <Card className="bg-[#031A6E] text-white">
                    <CardContent className="p-6">
                        <h2 className="text-3xl font-bold">Rp{formatAmount(totalAmount)}</h2>
                        <p className="text-white/70 mb-8">My Savings</p>
                        <div className="text-right">
                            <p className="text-white/70">From Target</p>
                            <p className="text-xl">Rp{formatAmount(savingGoal || 0)}</p>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex space-x-20 mx-16">
                    {/* Saving Card */}
                    <Card className="bg-white shadow-md rounded-t-xl flex-1">
                        <CardContent className="p-0">
                            <div className="bg-[#1B307C] p-4 rounded-t-xl">
                                <h3 className="text-xl font-bold text-white">Saving</h3>
                            </div>
                            <div className="p-4">
                                <div className="space-y-4">
                                    {savings.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium text-[#031A6E]">{item.name}</p>
                                                <p className="text-lg font-bold text-[#031A6E]">Rp{formatAmount(item.amount)}</p>
                                            </div>
                                            <div className="text-[#031A6E] text-2xl font-bold">
                                                {calculatePercentage(item.amount)}%
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Investment Card */}
                    <Card className="bg-white shadow-md rounded-t-xl flex-1">
                        <CardContent className="p-0">
                            <div className="bg-[#1B307C] p-4 rounded-t-xl">
                                <h3 className="text-xl font-bold text-white">Investment</h3>
                            </div>
                            <div className="p-4">
                                <div className="space-y-4">
                                    {investments.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium text-[#031A6E]">{item.name}</p>
                                                <p className="text-lg font-bold text-[#031A6E]">Rp{formatAmount(item.amount)}</p>
                                            </div>
                                            <div className="text-[#031A6E] text-2xl font-bold">
                                                {calculatePercentage(item.amount)}%
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
