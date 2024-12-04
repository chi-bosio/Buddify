import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';

export const EarningsChart = ({ data }: { data: { name: string; total: number }[] }) => {
  const formattedData = data.map((item) => ({
    name: item.name,  
    uv: parseFloat(item.total.toString()),    
  }));
  return (
    <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={formattedData} >
        
            <XAxis dataKey="name" label={{ value: "Mes", position: "insideBottomRight", offset: -5 }} />
            <YAxis dataKey="uv" label={{ value: "", angle: -90, position: "insideLeft" }} />
                
            <CartesianGrid strokeDasharray="3 3" />
            <ReferenceLine x="Mar" stroke="green" label="Min PAGE" />
            <ReferenceLine y={4000} label="Max" stroke="red" strokeDasharray="3 3" />
            <Area type="monotone" dataKey="uv" stroke="#f97316" fill="#F9A03F" />
        </AreaChart>
    </ResponsiveContainer>

  );
};

export default EarningsChart;
