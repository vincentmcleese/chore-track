"use client";

import { useState, useEffect } from "react";
import { title, subtitle } from "@/components/primitives";
import { Divider, Spinner } from "@nextui-org/react";
import { fetchUserPerformance } from "@/services/performanceService";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface UserPerformance {
  name: string;
  onTime: number;
  overdue: number;
}

export default function Performance() {
  const [performanceData, setPerformanceData] = useState<UserPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPerformanceData() {
      try {
        const data = await fetchUserPerformance();
        console.log("data", data);
        setPerformanceData(data);
      } catch (error) {
        console.error("Failed to fetch performance data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadPerformanceData();
  }, []);

  const calculatePercentage = (user: UserPerformance) => {
    const total = user.onTime + user.overdue;
    return total > 0 ? ((user.onTime / total) * 100).toFixed(2) : "0.00";
  };

  const COLORS = ["#4CAF50", "#F44336"];

  const generateChartData = (user: UserPerformance) => [
    { name: "On Time", value: user.onTime },
    { name: "Overdue", value: user.overdue },
  ];

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="place-content-center">
        <h1 className={title({ color: "violet" })}>Performance</h1>
        <h3 className={subtitle()}>User Chore Completion Dashboard</h3>
        <Divider className="my-4" />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {performanceData.map((user) => (
            <div key={user.name} className="text-center m-4 w-64">
              <h3 className="text-xl font-bold">{user.name}</h3>
              <p>Percentage On Time: {calculatePercentage(user)}%</p>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={generateChartData(user)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {generateChartData(user).map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
