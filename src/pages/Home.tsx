'use client'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

interface SavingItem {
    name: string;
    amount: string;
    percentage: number;
}

export default function Dashboard() {
    const navigate = useNavigate();
    const [savings, setSavings] = useState<SavingItem[]>([
        { name: 'Tabungan', amount: '500.000,00', percentage: 25 },
        { name: 'Dana Darurat', amount: '200.000,00', percentage: 10 },
        { name: 'Wishlist', amount: '300.000,00', percentage: 15 }
    ]);

    const [investments, setInvestments] = useState<SavingItem[]>([
        { name: 'Saham', amount: '500.000,00', percentage: 25 },
        { name: 'Pasar Uang', amount: '200.000,00', percentage: 10 },
        { name: 'Obligasi', amount: '300.000,00', percentage: 15 }
    ]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="p-4 space-y-6">

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-black">Hello, Bob!</h1>
                    </div>
                    <Button size="icon" className="w-10 h-10 rounded-full bg-[#031A6E] text-white flex items-center justify-center" onClick={() => navigate('/my-savings')}>
                        <Plus className="w-6 h-6 text-white font-bold" />
                    </Button>
                </div>

                <Card className="bg-[#031A6E] text-white">
                    <CardContent className="p-6">
                        <h2 className="text-3xl font-bold">Rp2.000.000,00</h2>
                        <p className="text-white/70 mb-8">My Savings</p>
                        <div className="text-right">
                            <p className="text-white/70">From Target</p>
                            <p className="text-xl">Rp1.000.000.000,00</p>
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
                                                <p className="text-lg font-bold text-[#031A6E]">Rp{item.amount}</p>
                                            </div>
                                            <div className="text-[#031A6E] text-2xl font-bold">
                                                {item.percentage}%
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
                                                <p className="text-lg font-bold text-[#031A6E]">Rp{item.amount}</p>
                                            </div>
                                            <div className="text-[#031A6E] text-2xl font-bold">
                                                {item.percentage}%
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
