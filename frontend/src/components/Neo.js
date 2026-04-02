import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const sizeData = Object.values(data.near_earth_objects).flat().map((obj) => ({
  name: obj.name,
  size: obj.estimated_diameter.meters.estimated_diameter_max
}));

const topAsteroids = sizeData.slice(0, 8);

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={topAsteroids}>
    <XAxis dataKey="name" hide />
    <YAxis />
    <Tooltip />
    <Bar dataKey="size" />
  </BarChart>
</ResponsiveContainer>