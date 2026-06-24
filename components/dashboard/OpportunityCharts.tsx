"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getCategoryChartData,
  getTypeChartData,
} from "@/lib/utils";
import type { Opportunity } from "@/types/opportunity";

const chartColors = [
  "#059669",
  "#0284c7",
  "#d97706",
  "#7c3aed",
  "#e11d48",
  "#525252",
  "#0f766e",
];

export function OpportunityCharts({
  opportunities,
}: {
  opportunities: Opportunity[];
}) {
  const categoryData = getCategoryChartData(opportunities);
  const typeData = getTypeChartData(opportunities);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
      <section className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-neutral-950 dark:text-white">
            Opportunities by category
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Approved demo and locally submitted opportunities.
          </p>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} margin={{ left: -18, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d4" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={70}
              />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {categoryData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-neutral-950 dark:text-white">
            Work mode split
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Remote, hybrid, and on-site availability.
          </p>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={typeData}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={92}
                paddingAngle={4}
              >
                {typeData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid gap-2">
          {typeData.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-sm"
            >
              <span className="flex items-center gap-2 text-neutral-700 dark:text-neutral-200">
                <span
                  className="h-3 w-3 rounded-md"
                  style={{
                    backgroundColor: chartColors[index % chartColors.length],
                  }}
                />
                {item.name}
              </span>
              <span className="font-semibold text-neutral-950 dark:text-white">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
