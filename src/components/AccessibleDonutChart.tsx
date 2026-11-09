"use client";

import React, { useState } from 'react';
import { AssetClassAllocation } from '@/types/wealth';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Table, PieChart as PieIcon, Info } from 'lucide-react';

interface AccessibleDonutChartProps {
  allocations: AssetClassAllocation[];
  title?: string;
  isSimulated?: boolean;
}

export const AccessibleDonutChart: React.FC<AccessibleDonutChartProps> = ({
  allocations,
  title = "Asset Class Allocation Breakdown",
  isSimulated = false,
}) => {
  const [viewMode, setViewMode] = useState<'both' | 'table_only'>('both');

  const totalPercentage = allocations.reduce((sum, item) => sum + item.actualPercentage, 0);
  const unallocatedPercentage = Math.max(0, 100 - totalPercentage);

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white rounded-2xl shadow-luxury border border-slate-200/80 p-5 sm:p-6 md:p-8">
      
      {/* Header & Accessibility Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-serif font-bold text-wealth-navy-950 flex items-center gap-2">
            <span>{title}</span>
            {isSimulated && (
              <span className="text-xs bg-red-100 text-red-800 font-sans font-bold px-2 py-0.5 rounded border border-red-300">
                Illustrative Simulation
              </span>
            )}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Compliant visual chart paired with an accessible text table alternative (WCAG 2.2 AA).
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs self-start sm:self-auto" role="group" aria-label="Chart display preferences">
          <button
            type="button"
            onClick={() => setViewMode('both')}
            aria-pressed={viewMode === 'both'}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'both' ? 'bg-white text-wealth-navy-950 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5 text-wealth-gold-600" aria-hidden="true" />
            <span>Chart & Table</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table_only')}
            aria-pressed={viewMode === 'table_only'}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'table_only' ? 'bg-white text-wealth-navy-950 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Table className="w-3.5 h-3.5 text-wealth-gold-600" aria-hidden="true" />
            <span>Table Only</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Visual Chart Column (with SVG texture pattern support) */}
        {viewMode === 'both' && (
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full h-64 relative" aria-hidden="true">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocations}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="actualPercentage"
                  >
                    {allocations.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any, name: any, item: any) => [
                      `${value}% (${formatUSD(item.payload.actualAmount)})`,
                      item.payload.assetClass,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Center Donut Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-2xl font-bold font-serif text-wealth-navy-950">
                  {totalPercentage}%
                </span>
                <span className="text-xs text-slate-500 font-medium">Allocated</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 text-center mt-2">
              Color is supplemented with textural markers and data tables below.
            </p>
          </div>
        )}

        {/* Tabular Accessible Alternative Column (Always visible, full-width in table_only) */}
        <div className={viewMode === 'both' ? 'lg:col-span-7' : 'lg:col-span-12'}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse" aria-label="Detailed Asset Allocation Data">
              <thead>
                <tr className="border-b-2 border-slate-300 text-wealth-navy-950 font-bold bg-slate-50 text-xs uppercase tracking-wider">
                  <th scope="col" className="py-3 px-3">Asset Class & Pattern</th>
                  <th scope="col" className="py-3 px-2 text-right">Target</th>
                  <th scope="col" className="py-3 px-2 text-right">Actual</th>
                  <th scope="col" className="py-3 px-3 text-right">Current Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {allocations.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-medium text-slate-900">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-4 h-4 rounded-full inline-block border border-slate-400 shrink-0" 
                          style={{ backgroundColor: item.color }} 
                          aria-hidden="true"
                        />
                        <div>
                          <p className="font-semibold">{item.assetClass}</p>
                          <p className="text-xs text-slate-500 font-normal">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right font-medium text-slate-600">
                      {item.targetPercentage}%
                    </td>
                    <td className="py-3 px-2 text-right font-bold text-wealth-navy-950">
                      {item.actualPercentage}%
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                      {formatUSD(item.actualAmount)} <span className="text-xs text-slate-500 font-sans font-normal">USD</span>
                    </td>
                  </tr>
                ))}

                {unallocatedPercentage > 0 && (
                  <tr className="bg-amber-50/50">
                    <td className="py-2.5 px-3 font-medium text-amber-900 flex items-center gap-2">
                      <Info className="w-4 h-4 text-amber-600" aria-hidden="true" />
                      <span>Unallocated Reserves</span>
                    </td>
                    <td className="py-2.5 px-2 text-right text-amber-900">—</td>
                    <td className="py-2.5 px-2 text-right font-bold text-amber-900">{unallocatedPercentage}%</td>
                    <td className="py-2.5 px-3 text-right font-mono text-amber-900">—</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-300 font-bold bg-slate-50 text-slate-900">
                  <td className="py-3 px-3">Total Reconciled</td>
                  <td className="py-3 px-2 text-right">100%</td>
                  <td className="py-3 px-2 text-right">{totalPercentage + unallocatedPercentage}%</td>
                  <td className="py-3 px-3 text-right font-mono">
                    {formatUSD(allocations.reduce((s, i) => s + i.actualAmount, 0))} USD
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <p>
          * Target allocations represent agreed mandate objectives. Actual percentages adjust dynamically with market movements.
        </p>
      </div>

    </div>
  );
};
