'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"

interface SavingItem {
name: string;
amount: string;
percentage: number;
}

export default function Dashboard() {
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
            <Button size="icon" className="w-10 h-10 rounded-full bg-primary">
                <Plus className="w-6 h-6" />
            </Button>
            </div>

            <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6">
                <h2 className="text-3xl font-bold">Rp2.000.000,00</h2>
                <p className="text-primary-foreground/70 mb-8">My Savings</p>
                <div className="text-right">
                <p className="text-primary-foreground/70">From Target</p>
                <p className="text-xl">Rp1.000.000.000,00</p>
                </div>
            </CardContent>
            </Card>

            <Card>
            <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-4">Saving</h3>
                <div className="space-y-4">
                {savings.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                    <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-lg font-bold">Rp{item.amount}</p>
                    </div>
                    <div className="text-primary text-2xl font-bold">
                        {item.percentage}%
                    </div>
                    </div>
                ))}
                </div>
            </CardContent>
            </Card>

            <Card>
            <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-4">Investment</h3>
                <div className="space-y-4">
                {investments.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                    <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-lg font-bold">Rp{item.amount}</p>
                    </div>
                    <div className="text-primary text-2xl font-bold">
                        {item.percentage}%
                    </div>
                    </div>
                ))}
                </div>
            </CardContent>
            </Card>
        </div>
        </div>
    )
}