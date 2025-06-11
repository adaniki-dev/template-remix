import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LineChartMessages({data}:any){
    return(
        <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                <CartesianGrid strokeDasharray="2 10" stroke="#ccc"/>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip/>
                <Legend />
                <Line
                    type="monotone"
                    dataKey="count"
                    name='Quantidade de mensagens'
                    stroke="#1e4494"
                    activeDot={{ r: 8 }}
                />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}