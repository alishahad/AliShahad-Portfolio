import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, TrendingUp, Users, DollarSign, Activity, PieChart, Sparkles, Filter, Building2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell, LabelList } from 'recharts';

const FounderTools: React.FC = () => {
  // Revenue Projection
  const [leads, setLeads] = useState(1000);
  const [conversionRate, setConversionRate] = useState(2.5);
  const [dealSize, setDealSize] = useState(50000);

  // LTV:CAC
  const [cac, setCac] = useState(5000);
  const [ltv, setLtv] = useState(25000);

  // Pipeline Velocity
  const [opportunities, setOpportunities] = useState(50);
  const [winRate, setWinRate] = useState(20);
  const [salesCycle, setSalesCycle] = useState(90);

  // SaaS Metrics
  const [startingMrr, setStartingMrr] = useState(100000);
  const [newMrr, setNewMrr] = useState(15000);
  const [expansionMrr, setExpansionMrr] = useState(5000);
  const [churnedMrr, setChurnedMrr] = useState(3000);

  // AI Sales Automation
  const [inboundVolume, setInboundVolume] = useState(500);
  const [manualQualTime, setManualQualTime] = useState(7); // Days
  const [sdrTeamSize, setSdrTeamSize] = useState(3);

  // Mini Product: RWA Compliance-as-a-Service
  const [assetValue, setAssetValue] = useState(50000000);
  const [traditionalLegalFees, setTraditionalLegalFees] = useState(250000);
  const [traditionalTimeDays, setTraditionalTimeDays] = useState(180);

  const projectedRevenue = Math.round(leads * (conversionRate / 100) * dealSize);
  const ltvCacRatio = (ltv / cac).toFixed(1);
  
  const pipelineVelocity = Math.round((opportunities * dealSize * (winRate / 100)) / salesCycle);
  
  const netNewMrr = newMrr + expansionMrr - churnedMrr;
  const endingMrr = startingMrr + netNewMrr;
  const arr = endingMrr * 12;
  const netRevenueRetention = ((startingMrr + expansionMrr - churnedMrr) / startingMrr) * 100;

  // Generate 12-month projection data for the chart
  const chartData = Array.from({ length: 12 }, (_, i) => {
    const currentMrr = startingMrr + (netNewMrr * i);
    return {
      name: `Month ${i + 1}`,
      MRR: currentMrr,
      ARR: currentMrr * 12,
    };
  });

  // Formatter for tooltips and axes
  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
    return `$${value}`;
  };

  // AI Calculations
  const aiQualTimeHours = Math.max(0.5, Math.round((manualQualTime * 24) * 0.05)); // 95% reduction in qual time
  const hoursSavedWeekly = Math.round((sdrTeamSize * 40) * 0.75); // 75% of time saved for proactive selling
  const pipelineIncrease = Math.round(inboundVolume + (sdrTeamSize * 150 * 2.5)); // Significant increase driven by team size * AI volume multiplier
  
  // Nuanced Qualified Leads Calculation
  const baseScoringAccuracy = 0.40; // Manual precision (40% of standard qualified leads are actually good)
  const aiScoringAccuracy = 0.85; // AI precision (filters noise, better fit threshold)
  const baseOutreachConversion = 0.15; // Manual reply rate
  const aiOutreachConversion = 0.32; // Hyper-personalized reply rate

  const aiEffectivenessMultiplier = (aiScoringAccuracy / baseScoringAccuracy) * (aiOutreachConversion / baseOutreachConversion);
  
  const qualifiedLeadsPerSdr = Math.round((inboundVolume * baseScoringAccuracy) / sdrTeamSize);
  const aiQualifiedLeadsPerSdr = Math.round(qualifiedLeadsPerSdr * aiEffectivenessMultiplier);

  // Revenue Projection Funnel Data
  const funnelData = useMemo(() => [
    { name: 'Leads', value: leads, fill: '#f1f5f9' },
    { name: 'Qualified (MQL)', value: Math.round(leads * 0.4), fill: '#cbd5e1' },
    { name: 'Opportunities (SQL)', value: Math.round(leads * 0.4 * 0.5), fill: '#94a3b8' },
    { name: 'Closed Deals', value: Math.round(leads * (conversionRate / 100)), fill: '#0f172a' }
  ], [leads, conversionRate]);

  // LTV:CAC Optimization Advice
  const getLtvCacAdvice = () => {
    const ratio = Number(ltvCacRatio);
    if (ratio >= 3) return 'Healthy ratio. Ready to scale.';
    if (cac > ltv) return 'Urgent: CAC exceeds LTV. Pause paid channels and fix conversion.';
    if (ltv < 10000) return 'Needs optimization. Focus on customer success to drive expansion revenue and increase LTV.';
    return 'Needs optimization. Optimize paid acquisition channels for better cost per lead to decrease CAC.';
  };

  // Mini-Product Calculations: RWA Compliance-as-a-Service
  const saasLegalFees = 95000; // Flat base parameter + minimal filing
  const saasTimeDays = 45; // Pre-mapped templates reduce timeline
  const legalFeeSavings = traditionalLegalFees - saasLegalFees;
  const timeToMarketDaysSaved = traditionalTimeDays - saasTimeDays;
  const earlyLiquidityValue = Math.round((assetValue * 0.08) * (timeToMarketDaysSaved / 365)); // Assuming an 8% market return gained by hitting market earlier

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Founder & Sales Tools</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Interactive models to help you understand the impact of commercial optimization on your bottom line.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Revenue Projection Calculator (Full Width) */}
          <div className="lg:col-span-2 bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col md:flex-row gap-10">
            <div className="flex-[1] pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-slate-200 pb-8 md:pb-0">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-white text-slate-900 rounded-xl shadow-sm border border-slate-200">
                  <Calculator size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Revenue Projection</h3>
                  <p className="text-sm text-slate-500">Model your sales funnel</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700">Monthly Leads</label>
                    <span className="text-slate-900 font-bold">{leads.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" min="100" max="10000" step="100" 
                    value={leads} onChange={(e) => setLeads(Number(e.target.value))}
                    className="w-full accent-slate-900"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700">Conversion Rate (%)</label>
                    <span className="text-slate-900 font-bold">{conversionRate}%</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="15" step="0.1" 
                    value={conversionRate} onChange={(e) => setConversionRate(Number(e.target.value))}
                    className="w-full accent-slate-900"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700">Avg. Deal Size ($)</label>
                    <span className="text-slate-900 font-bold">${dealSize.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" min="1000" max="500000" step="1000" 
                    value={dealSize} onChange={(e) => setDealSize(Number(e.target.value))}
                    className="w-full accent-slate-900"
                  />
                </div>
              </div>
            </div>

            <div className="flex-[1.5] flex flex-col justify-between">
              <div className="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-sm mb-6">
                <div className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">Projected Monthly Revenue</div>
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  ${(projectedRevenue / 1000000).toFixed(2)}M
                </div>
                <p className="text-slate-500 text-xs">
                  A 1% increase in conversion adds <strong className="text-slate-900">${((leads * 0.01 * dealSize) / 1000).toFixed(0)}k</strong> to your pipeline.
                </p>
              </div>

              <div className="flex-grow bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col h-full min-h-[250px]">
                <div className="text-slate-500 text-sm font-medium mb-4 uppercase tracking-wider text-center">Interactive Sales Funnel</div>
                <div className="flex-grow">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={funnelData}
                      margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 13 }} width={120} />
                      <RechartsTooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="value" barSize={32} radius={[0, 4, 4, 0]}>
                        {funnelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                        <LabelList dataKey="value" position="right" formatter={(v: number) => v.toLocaleString()} fill="#0f172a" fontSize={12} fontWeight="bold" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Pipeline Velocity */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white text-slate-900 rounded-xl shadow-sm border border-slate-200">
                <Activity size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Pipeline Velocity</h3>
                <p className="text-sm text-slate-500">Speed of revenue generation</p>
              </div>
            </div>

            <div className="space-y-6 mb-8 flex-grow">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Active Opportunities</label>
                  <span className="text-slate-900 font-bold">{opportunities}</span>
                </div>
                <input 
                  type="range" min="10" max="500" step="10" 
                  value={opportunities} onChange={(e) => setOpportunities(Number(e.target.value))}
                  className="w-full accent-slate-900"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Win Rate (%)</label>
                  <span className="text-slate-900 font-bold">{winRate}%</span>
                </div>
                <input 
                  type="range" min="5" max="80" step="1" 
                  value={winRate} onChange={(e) => setWinRate(Number(e.target.value))}
                  className="w-full accent-slate-900"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Sales Cycle (Days)</label>
                  <span className="text-slate-900 font-bold">{salesCycle}</span>
                </div>
                <input 
                  type="range" min="14" max="365" step="7" 
                  value={salesCycle} onChange={(e) => setSalesCycle(Number(e.target.value))}
                  className="w-full accent-slate-900"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-sm">
              <div className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">Daily Revenue Velocity</div>
              <div className="text-4xl font-bold text-slate-900 mb-2">
                ${pipelineVelocity.toLocaleString()}
              </div>
              <p className="text-slate-500 text-xs">
                Reducing cycle by 10 days increases velocity to <strong className="text-slate-900">${Math.round((opportunities * dealSize * (winRate / 100)) / Math.max(1, salesCycle - 10)).toLocaleString()}</strong>/day.
              </p>
            </div>
          </div>

          {/* SaaS Metrics (Full Width with Chart) */}
          <div className="lg:col-span-2 bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col md:flex-row gap-10">
            {/* Left Column: Inputs */}
            <div className="flex-1 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-slate-200 pb-8 md:pb-0">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-white text-slate-900 rounded-xl shadow-sm border border-slate-200">
                  <PieChart size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">SaaS Metrics</h3>
                  <p className="text-sm text-slate-500">ARR, MRR & Retention Projection</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700">Starting MRR ($)</label>
                    <span className="text-slate-900 font-bold">${(startingMrr/1000).toFixed(0)}k</span>
                  </div>
                  <input 
                    type="range" min="10000" max="1000000" step="10000" 
                    value={startingMrr} onChange={(e) => setStartingMrr(Number(e.target.value))}
                    className="w-full accent-slate-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-xs font-medium text-slate-700">New MRR</label>
                      <span className="text-slate-900 font-bold text-xs">${(newMrr/1000).toFixed(1)}k</span>
                    </div>
                    <input 
                      type="range" min="0" max="100000" step="1000" 
                      value={newMrr} onChange={(e) => setNewMrr(Number(e.target.value))}
                      className="w-full accent-slate-900"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-xs font-medium text-slate-700">Expansion</label>
                      <span className="text-slate-900 font-bold text-xs">${(expansionMrr/1000).toFixed(1)}k</span>
                    </div>
                    <input 
                      type="range" min="0" max="50000" step="1000" 
                      value={expansionMrr} onChange={(e) => setExpansionMrr(Number(e.target.value))}
                      className="w-full accent-slate-900"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700">Churned MRR ($)</label>
                    <span className="text-red-600 font-bold">${(churnedMrr/1000).toFixed(1)}k</span>
                  </div>
                  <input 
                    type="range" min="0" max="50000" step="500" 
                    value={churnedMrr} onChange={(e) => setChurnedMrr(Number(e.target.value))}
                    className="w-full accent-red-600"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Chart and Summary */}
            <div className="flex-[1.5] flex flex-col">
              <div className="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-sm grid grid-cols-2 gap-4 mb-8">
                <div>
                  <div className="text-slate-500 text-xs font-medium mb-1 uppercase tracking-wider">Projected 12M ARR</div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">
                    ${(chartData[11].ARR / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-xs text-slate-500">
                    From ${(startingMrr * 12 / 1000000).toFixed(2)}M today
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs font-medium mb-1 uppercase tracking-wider">Net Rev Retention</div>
                  <div className={`text-2xl font-bold mb-1 ${netRevenueRetention >= 100 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {netRevenueRetention.toFixed(1)}%
                  </div>
                  <div className="text-xs text-slate-500">
                    World-class SaaS targets 120%+
                  </div>
                </div>
              </div>

              <div className="flex-grow min-h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorMRR" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0f172a" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis 
                      tickFormatter={formatCurrency} 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }}
                    />
                    <RechartsTooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      labelStyle={{ color: '#64748b', marginBottom: '4px' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="MRR" 
                      stroke="#0f172a" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorMRR)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* LTV:CAC Calculator */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white text-slate-900 rounded-xl shadow-sm border border-slate-200">
                <TrendingUp size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Unit Economics</h3>
                <p className="text-sm text-slate-500">LTV to CAC Ratio</p>
              </div>
            </div>

            <div className="space-y-6 mb-8 flex-grow">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Customer Acquisition Cost (CAC)</label>
                  <span className="text-slate-900 font-bold">${cac.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="500" max="50000" step="500" 
                  value={cac} onChange={(e) => setCac(Number(e.target.value))}
                  className="w-full accent-slate-900"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Lifetime Value (LTV)</label>
                  <span className="text-slate-900 font-bold">${ltv.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="1000" max="250000" step="1000" 
                  value={ltv} onChange={(e) => setLtv(Number(e.target.value))}
                  className="w-full accent-slate-900"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-sm">
              <div className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">LTV:CAC Ratio</div>
              <div className={`text-4xl font-bold mb-2 ${Number(ltvCacRatio) >= 3 ? 'text-slate-900' : 'text-amber-600'}`}>
                {ltvCacRatio}:1
              </div>
              <p className="text-slate-500 text-xs">
                {getLtvCacAdvice()}
              </p>
            </div>
          </div>

          {/* AI Sales Automation Impact (Full Width) */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 border border-slate-800 flex flex-col md:flex-row gap-10">
            <div className="flex-1 text-white pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-slate-700/50 pb-8 md:pb-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/10 text-indigo-400 rounded-xl shadow-inner border border-white/5">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">AI Sales Automation</h3>
                  <p className="text-sm text-slate-400">Discover scale without headcount</p>
                </div>
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                Traditional sales operations are bottlenecked by manual research, slow response times, and scattered data. Let's model what happens when you deploy an AI layer for lead qualification, predictive scoring, and automated personalized outreach.
              </p>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">Monthly Inbound Leads</label>
                    <span className="text-white font-bold">{inboundVolume.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" min="100" max="5000" step="100" 
                    value={inboundVolume} onChange={(e) => setInboundVolume(Number(e.target.value))}
                    className="w-full accent-indigo-500 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">Current Qualification Time (Days)</label>
                    <span className="text-white font-bold">{manualQualTime} days</span>
                  </div>
                  <input 
                    type="range" min="1" max="14" step="1" 
                    value={manualQualTime} onChange={(e) => setManualQualTime(Number(e.target.value))}
                    className="w-full accent-indigo-500 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">SDRs on Team</label>
                    <span className="text-white font-bold">{sdrTeamSize}</span>
                  </div>
                  <input 
                    type="range" min="1" max="20" step="1" 
                    value={sdrTeamSize} onChange={(e) => setSdrTeamSize(Number(e.target.value))}
                    className="w-full accent-indigo-500 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-4">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm grid grid-cols-2 gap-4">
                <div>
                  <div className="text-indigo-400 text-xs font-semibold mb-1 uppercase tracking-wider">Qual. Time</div>
                  <div className="flex items-end gap-2 mb-1">
                    <div className="text-xl line-through text-slate-500">{manualQualTime}d</div>
                    <ArrowRight className="text-slate-600 mb-1" size={16} />
                    <div className="text-2xl font-bold text-white">{aiQualTimeHours}<span className="text-xs text-slate-400">h</span></div>
                  </div>
                </div>
                <div>
                  <div className="text-indigo-400 text-xs font-semibold mb-1 uppercase tracking-wider">Weekly Hours Saved</div>
                  <div className="text-2xl font-bold text-emerald-400 mb-1">
                    {hoursSavedWeekly}<span className="text-xs text-slate-400"> / team</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                <div className="text-indigo-400 text-xs font-semibold mb-1 uppercase tracking-wider">Leads Qualified / SDR / Week</div>
                <div className="flex items-end gap-3 mb-2">
                  <div className="text-3xl text-slate-500">{qualifiedLeadsPerSdr}</div>
                  <ArrowRight className="text-slate-600 mb-2" size={20} />
                  <div className="text-4xl font-bold text-white">{aiQualifiedLeadsPerSdr}</div>
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  Calculated using 85% predictive scoring accuracy and 32% outreach reply rates, eliminating manual "spray and pray" noise.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                <div className="text-emerald-400 text-xs font-semibold mb-1 uppercase tracking-wider">Total Effective Pipeline Handled</div>
                <div className="text-4xl font-bold text-white mb-2">
                  {pipelineIncrease.toLocaleString()} <span className="text-lg font-normal text-slate-400">vol.</span>
                </div>
                <p className="text-slate-400 text-xs">
                  A massive scaling multiplier enabled by an AI layer without increasing headcount cost.
                </p>
              </div>
            </div>
          </div>

          {/* Mini-Products (Full Width) */}
          <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 border border-slate-800 flex flex-col md:flex-row gap-10">
            <div className="flex-1 text-white pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-slate-700/50 pb-8 md:pb-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/10 text-emerald-400 rounded-xl shadow-inner border border-white/5">
                  <Building2 size={24} />
                </div>
                <div>
                   <h3 className="text-2xl font-bold text-white whitespace-nowrap">Mini-Product: RWA Compliance</h3>
                   <p className="text-sm text-slate-400">Compliance-as-a-Service Impact</p>
                </div>
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                In my role at Tokenizer.estate, the biggest barrier to securing institutional capital was cross-border legal friction. We launched "Compliance-as-a-Service" packages to bundle pre-cleared jurisdictional legal frameworks immediately alongside tokenization tech. This mini-product eliminated uncertainties and slashed go-to-market times.
              </p>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">Total Asset Value Being Tokenized ($)</label>
                    <span className="text-white font-bold">${(assetValue/1000000).toFixed(1)}M</span>
                  </div>
                  <input 
                    type="range" min="10000000" max="500000000" step="5000000" 
                    value={assetValue} onChange={(e) => setAssetValue(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">Est. Traditional Legal/Structuring Fees ($)</label>
                    <span className="text-white font-bold">${(traditionalLegalFees/1000).toFixed(0)}k</span>
                  </div>
                  <input 
                    type="range" min="50000" max="1000000" step="10000" 
                    value={traditionalLegalFees} onChange={(e) => setTraditionalLegalFees(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">Est. Traditional Structuring Time (Days)</label>
                    <span className="text-white font-bold">{traditionalTimeDays} days</span>
                  </div>
                  <input 
                    type="range" min="90" max="365" step="15" 
                    value={traditionalTimeDays} onChange={(e) => setTraditionalTimeDays(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-4">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm grid grid-cols-2 gap-4">
                <div>
                  <div className="text-emerald-400 text-xs font-semibold mb-1 uppercase tracking-wider">Fee Reduction</div>
                  <div className="flex items-end gap-2 mb-1">
                    <div className="text-xl line-through text-slate-500" title="Traditional Fees">${(traditionalLegalFees/1000).toFixed(0)}k</div>
                    <ArrowRight className="text-slate-600 mb-1" size={16} />
                    <div className="text-2xl font-bold text-white">${(saasLegalFees/1000).toFixed(0)}<span className="text-xs text-slate-400">k fixed</span></div>
                  </div>
                  <div className="text-emerald-400 text-sm font-bold mt-1">Saves ${(legalFeeSavings/1000).toFixed(0)}K up-front</div>
                </div>
                <div>
                  <div className="text-emerald-400 text-xs font-semibold mb-1 uppercase tracking-wider">Time to Market</div>
                  <div className="flex items-end gap-2 mb-1">
                     <div className="text-xl line-through text-slate-500" title="Traditional Time">{traditionalTimeDays}d</div>
                     <ArrowRight className="text-slate-600 mb-1" size={16} />
                     <div className="text-2xl font-bold text-white">{saasTimeDays}<span className="text-xs text-slate-400">d avg</span></div>
                  </div>
                  <div className="text-emerald-400 text-sm font-bold mt-1">Accelerates closing by {timeToMarketDaysSaved} days</div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                <div className="text-indigo-400 text-xs font-semibold mb-1 uppercase tracking-wider">Institutional Trust Capital Generated</div>
                <div className="text-4xl font-bold text-white mb-2">
                  ${(earlyLiquidityValue / 1000000).toFixed(2)}M <span className="text-lg font-normal text-slate-400">immediate ROI</span>
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  Calculated based on an 8% market return captured by entering the market {timeToMarketDaysSaved} days earlier than a traditional fragmented legal architecture process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderTools;
