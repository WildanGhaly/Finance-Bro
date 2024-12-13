import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select"

export default function SavingInvestForm() {
    return (
    <div className="min-h-screen bg-white">
    <div className="container mx-auto px-4 py-8">
    <div className="space-y-4">
    <Select>
        <SelectTrigger className="w-full bg-[#3F51B5] text-white">
        <SelectValue placeholder="Select Account" />
        </SelectTrigger>
        <SelectContent>
        <SelectItem value="savings">Savings Account</SelectItem>
        <SelectItem value="checking">Checking Account</SelectItem>
        <SelectItem value="investment">Investment Account</SelectItem>
        </SelectContent>
    </Select>
    
    <div className="bg-[#F8F9FC] p-4 space-y-4">
        <div className="space-y-2">
        <label htmlFor="amount" className="text-sm text-gray-600">
            Amount
        </label>
        <Input 
            id="amount" 
            type="number" 
            placeholder="Enter amount" 
            className="w-full text-black"
        />
        </div>
        <Button className="w-full bg-[#3F51B5] hover:bg-[#3F51B5]/90">
        Update
        </Button>
    </div>
    </div>
    </div>
    </div>
    )
}