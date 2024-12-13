import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface StockPrediction {
  date: string;
  predictedPrice: number;
}

interface ApiResponse {
  [date: string]: {
    "Predicted Price": number;
  };
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

const Prediction: React.FC = () => {
  const [data, setData] = useState<StockPrediction[]>([]);
  const [selectedStock, setSelectedStock] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const list_code_stock = ['BBCA', 'BBRI', 'BMRI', 'INKP', 'TKIM', 'BYAN', 'TMAS', 'ASII', 'TLKM', 'UNVR', 'AMRT', 'ADRO'];

  const fetchData = async (stock_code: string) => {
    setLoading(true);
    try {
      const start_date = new Date().toISOString().split('T')[0];
      const end_date = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0];
      console.log("start_date", start_date);
      console.log("end_date", end_date);
      console.log("stock_code", stock_code);

      const response = await fetch(`https://financebro-backend-958019176719.us-central1.run.app/predict`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify({ stock_code, start_date, end_date }),
      });

      if (!response.ok) throw new Error('Failed to fetch prediction');

      const result: ApiResponse = await response.json();

      const transformedData: StockPrediction[] = Object.entries(result).map(([date, value]) => ({
        date,
        predictedPrice: value["Predicted Price"],
      }));

      setData(transformedData);
      setSelectedStock(stock_code);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStockChange = (stock_code: string) => {
    fetchData(stock_code);
  };

  const startPrice = data.length > 0 ? data[0].predictedPrice : 0;
  const endPrice = data.length > 0 ? data[data.length - 1].predictedPrice : 0;
  const percentageChange = startPrice !== 0 ? ((endPrice - startPrice) / startPrice) * 100 : 0;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white pt-10">
      <h1 className="text-2xl font-bold mb-6">Stock Prediction</h1>

      <div className="w-3/4 max-w-md relative">
        <Select onValueChange={handleStockChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose Stock" />
          </SelectTrigger>
          <SelectContent>
            {list_code_stock.map((stock) => (
              <SelectItem key={stock} value={stock}>{stock}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {loading ? ( 
          <div className="mt-4 text-center">Loading prediction...</div>
        ) : (
          <div className="mt-4 flex items-center bg-blue-100 rounded-md p-4">
            <div className="w-2/3 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: '12px' }} />
                  <YAxis domain={[startPrice, endPrice]} tick={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="predictedPrice" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/3 text-right">
              <h2 className="text-lg font-bold">{selectedStock || 'Stock Name'}</h2>
              <p className="text-xl font-bold text-blue-700">{percentageChange.toFixed(2)}%</p>
              <p className="text-sm">in 7 days</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prediction;
