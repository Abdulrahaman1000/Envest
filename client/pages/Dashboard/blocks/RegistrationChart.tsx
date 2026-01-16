import { Card } from '@/components/ui/card';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    { month: 'Jan', count: 300 },
    { month: 'Feb', count: 150 },
    { month: 'Mar', count: 400 },
    { month: 'Apr', count: 250 },
    { month: 'May', count: 320 },
    { month: 'Jun', count: 280 },
    { month: 'Jul', count: 260 },
    { month: 'Aug', count: 1020 },
    { month: 'Sep', count: 350 },
    { month: 'Oct', count: 220 },
    { month: 'Nov', count: 310 },
    { month: 'Dec', count: 240 },
];

export function RegistrationChart() {
    return (
        <Card className="p-8 border-slate-100 shadow-sm rounded-3xl bg-white col-span-2">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900">User registration status</h3>
            </div>

            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748B', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748B', fontSize: 12 }}
                            dx={-10}
                        />
                        <Tooltip
                            cursor={{ fill: '#F8FAFC' }}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        />
                        <Bar
                            dataKey="count"
                            fill="#B8860B"
                            radius={[4, 4, 0, 0]}
                            barSize={32}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
