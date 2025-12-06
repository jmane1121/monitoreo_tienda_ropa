// src/pages/DashboardAdvanced.jsx
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import CardStat from "../components/CardStat";
import WidgetTopProducts from "../components/WidgetTopProducts";
import { getSales, getStockSummary } from "../services/reportsService";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#0d6efd","#198754","#ffc107","#dc3545","#6c757d"];

export default function DashboardAdvanced(){
  const [weekSales, setWeekSales] = useState([]);
  const [monthSales, setMonthSales] = useState([]);
  const [stockSummary, setStockSummary] = useState({ lowStock: [], byCategory: [] });

  useEffect(() => {
    async function load() {
      try {
        const w = await getSales("week");
        const m = await getSales("month");
        const s = await getStockSummary(); // { lowStock: [], byCategory: [{category, count}] }
        setWeekSales(w);
        setMonthSales(m);
        setStockSummary(s);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const totalWeek = weekSales.reduce((s,x)=>s+(x.total||0),0);
  const totalMonth = monthSales.reduce((s,x)=>s+(x.total||0),0);

  return (
    <>
      <PageHeader title="Dashboard avanzado" subtitle="Métricas y KPIs" />

      <div className="row g-3 mb-3">
        <div className="col-md-3"><CardStat title="Ventas semana" value={`${totalWeek}`} accent="primary" /></div>
        <div className="col-md-3"><CardStat title="Ventas mes" value={`${totalMonth}`} accent="success" /></div>
        <div className="col-md-3"><CardStat title="Productos bajos" value={stockSummary.lowStock?.length || 0} accent="warning" /></div>
        <div className="col-md-3"><CardStat title="Órdenes maquila" value="—" accent="secondary" /></div>
      </div>

      <div className="row">
        <div className="col-lg-8 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Ventas - Última semana</h6>
              <div style={{height:300}}>
                <ResponsiveContainer>
                  <LineChart data={weekSales}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="total" stroke="#0d6efd" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="card shadow-sm mt-3">
            <div className="card-body">
              <h6>Ventas - Mes (barras)</h6>
              <div style={{height:300}}>
                <ResponsiveContainer>
                  <BarChart data={monthSales}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#198754" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-3">
          <WidgetTopProducts items={stockSummary.lowStock || []} />

          <div className="card shadow-sm mt-3">
            <div className="card-body">
              <h6>Distribución por categoría</h6>
              <div style={{height:220}}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={stockSummary.byCategory || []} dataKey="count" nameKey="category" innerRadius={50} outerRadius={80} label>
                      {(stockSummary.byCategory || []).map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
