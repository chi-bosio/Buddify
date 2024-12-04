// components/Cake.tsx
import { PieChart, Pie, ResponsiveContainer } from "recharts";

export function Cake({data}:{data:{name: string;total: number}[]}) {
  const formattedData = data.map((item) => ({
    name: item.name,  
    value: parseFloat(item.total.toString()),    
  }));
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart >
        <Pie
          data={formattedData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
          label={({ name, value }) => `${name}: ${value}`}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default Cake;
