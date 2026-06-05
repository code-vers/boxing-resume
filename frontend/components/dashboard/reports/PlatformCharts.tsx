"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { statsAndReportsData } from "@/constants/seed-data";
import { Card } from "@/components/ui/card";

// Register ChartJS modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

/**
 * @component PlatformCharts
 * @description A dual-chart section showing platform growth (line) and weight class distribution (bar).
 */
export function PlatformCharts() {
  const { growth, weightClassBreakdown } = statsAndReportsData;

  // 1. Platform Growth Chart Config
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
          color: "#4b5563",
          font: { size: 12, family: "Inter" },
        },
      },
    },
    scales: {
      x: {
        grid: { color: "#f3f4f6", drawBorder: false },
        ticks: { color: "#9ca3af", font: { size: 10 } },
      },
      y: {
        grid: { color: "#f3f4f6", drawBorder: false },
        ticks: { color: "#9ca3af", font: { size: 10 } },
      },
    },
  };

  const lineData = {
    labels: growth.labels,
    datasets: growth.datasets.map((ds) => ({
      label: ds.label,
      data: ds.data,
      borderColor: ds.color,
      backgroundColor: "white",
      borderWidth: 2,
      pointRadius: 3,
      tension: 0,
    })),
  };

  // 2. Weight Class Breakdown Chart Config
  const barOptions = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { color: "#f3f4f6" },
        ticks: { color: "#9ca3af", font: { size: 10 } },
      },
      y: {
        grid: { display: false },
        ticks: { color: "#6b7280", font: { size: 9 } },
      },
    },
  };

  const barData = {
    labels: weightClassBreakdown.map((i) => i.label),
    datasets: [
      {
        data: weightClassBreakdown.map((i) => i.count),
        backgroundColor: "#d92c2c",
        barThickness: 6,
      },
    ],
  };

  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-5'>
      {/* Platform Growth Line Chart */}
      <Card
        className='flex flex-col p-6 lg:col-span-3'
        data-purpose='platform-growth-chart'>
        <h2 className='font-oswald mb-4 text-[18px] text-foreground  font-normal tracking-wide uppercase'>
          Platform Growth
        </h2>
        <div className='h-64 w-full'>
          <Line options={lineOptions} data={lineData} />
        </div>
      </Card>

      {/* Weight Class Breakdown Bar Chart */}
      <Card
        className='flex flex-col p-6 lg:col-span-2'
        data-purpose='weight-class-chart'>
        <h2 className='font-oswald mb-4 text-[18px] text-foreground  font-normal tracking-wide uppercase'>
          Weight Class Breakdown
        </h2>
        <div className='h-64 w-full'>
          <Bar options={barOptions} data={barData} />
        </div>
      </Card>
    </div>
  );
}
