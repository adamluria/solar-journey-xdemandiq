import { Users, Calendar, MessageSquare, TrendingUp, TrendingDown, Phone, Mail, Clock, Target, Settings, Filter, Download } from "lucide-react";
import * as Recharts from "recharts";

import { useState } from 'react';

function App() {
  const { BarChart, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Bar, Line, PieChart, Pie, Cell } = Recharts;
  
  // Color palette
  const T = {
    bg: "#0A0D10",
    surface: "#11151A", 
    border: "#1E2530",
    accent: "#F0A830",
    green: "#2DD4A8",
    red: "#F87171",
    text: "#E8EDF3",
    muted: "#8B95A3",
    dim: "#4A5568",
  };

  // Mock data
  const funnelData = [
    { stage: "Form Fills", count: 847, percentage: 100, color: T.accent },
    { stage: "Engaged", count: 678, percentage: 80, color: T.green },
    { stage: "Scheduled", count: 169, percentage: 20, color: T.green },
    { stage: "Confirmed", count: 135, percentage: 16, color: T.green },
    { stage: "Completed", count: 118, percentage: 14, color: T.green }
  ];

  const dailyTrends = [
    { date: "Nov 1", forms: 28, scheduled: 6, completed: 4 },
    { date: "Nov 2", forms: 34, scheduled: 8, completed: 7 },
    { date: "Nov 3", forms: 31, scheduled: 5, completed: 4 },
    { date: "Nov 4", forms: 42, scheduled: 9, completed: 8 },
    { date: "Nov 5", forms: 38, scheduled: 11, completed: 9 },
    { date: "Nov 6", forms: 45, scheduled: 12, completed: 10 },
    { date: "Nov 7", forms: 41, scheduled: 8, completed: 6 }
  ];

  const leadSources = [
    { name: "SolarIncentivePro", value: 520, color: T.accent },
    { name: "VentureSolar.com", value: 327, color: T.green }
  ];

  const activeLeads = [
    { id: 1, name: "Sarah Johnson", location: "Buffalo, NY", source: "SolarIncentivePro", stage: "Day 3 Follow-up", score: 85, lastAction: "Opened email", timeAgo: "2 hours ago" },
    { id: 2, name: "Mike Chen", location: "Rochester, NY", source: "VentureSolar", stage: "Immediate Response", score: 92, lastAction: "Viewed estimate", timeAgo: "15 minutes ago" },
    { id: 3, name: "Lisa Rodriguez", location: "Syracuse, NY", source: "SolarIncentivePro", stage: "Day 7 Nudge", score: 76, lastAction: "Clicked text link", timeAgo: "1 hour ago" },
    { id: 4, name: "David Thompson", location: "Albany, NY", source: "VentureSolar", stage: "Trust Building", score: 68, lastAction: "Downloaded guide", timeAgo: "3 hours ago" },
    { id: 5, name: "Jennifer Park", location: "Utica, NY", source: "SolarIncentivePro", stage: "Ready for Call", score: 94, lastAction: "Requested callback", timeAgo: "30 minutes ago" }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return T.green;
    if (score >= 75) return T.accent;
    return T.muted;
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: T.bg, 
      fontFamily: "'Outfit', sans-serif",
      color: T.text,
      padding: "24px"
    }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0", color: T.text }}>
            Journey Platform
          </h1>
          <div style={{ display: "flex", gap: "12px" }}>
            <button style={{
              backgroundColor: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: "8px",
              padding: "8px 16px",
              color: T.muted,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer"
            }}>
              <Filter size={16} />
              Last 30 Days
            </button>
            <button style={{
              backgroundColor: T.accent,
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              color: "#000",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer"
            }}>
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
        <p style={{ fontSize: "16px", color: T.muted, margin: "0" }}>
          Lead conversion and automation performance
        </p>
      </div>

      {/* Key Metrics */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: "20px", 
        marginBottom: "32px" 
      }}>
        <div style={{
          backgroundColor: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: "8px",
          padding: "20px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <div style={{ 
              backgroundColor: `${T.accent}20`, 
              padding: "8px", 
              borderRadius: "6px" 
            }}>
              <Users size={20} color={T.accent} />
            </div>
            <span style={{ fontSize: "14px", color: T.muted }}>Form Fills</span>
          </div>
          <div style={{ fontSize: "24px", fontWeight: "700", color: T.text, fontFamily: "'JetBrains Mono', monospace" }}>847</div>
          <div style={{ fontSize: "12px", color: T.green, display: "flex", alignItems: "center", gap: "4px" }}>
            <TrendingUp size={12} />
            +12% vs last month
          </div>
        </div>

        <div style={{
          backgroundColor: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: "8px",
          padding: "20px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <div style={{ 
              backgroundColor: `${T.green}20`, 
              padding: "8px", 
              borderRadius: "6px" 
            }}>
              <Calendar size={20} color={T.green} />
            </div>
            <span style={{ fontSize: "14px", color: T.muted }}>Scheduled</span>
          </div>
          <div style={{ fontSize: "24px", fontWeight: "700", color: T.text, fontFamily: "'JetBrains Mono', monospace" }}>169</div>
          <div style={{ fontSize: "12px", color: T.green, display: "flex", alignItems: "center", gap: "4px" }}>
            <TrendingUp size={12} />
            20% conversion rate
          </div>
        </div>

        <div style={{
          backgroundColor: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: "8px",
          padding: "20px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <div style={{ 
              backgroundColor: `${T.red}20`, 
              padding: "8px", 
              borderRadius: "6px" 
            }}>
              <Phone size={20} color={T.red} />
            </div>
            <span style={{ fontSize: "14px", color: T.muted }}>Manual Calls Saved</span>
          </div>
          <div style={{ fontSize: "24px", fontWeight: "700", color: T.text, fontFamily: "'JetBrains Mono', monospace" }}>1,247</div>
          <div style={{ fontSize: "12px", color: T.green, display: "flex", alignItems: "center", gap: "4px" }}>
            <TrendingDown size={12} />
            -45% rep workload
          </div>
        </div>

        <div style={{
          backgroundColor: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: "8px",
          padding: "20px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <div style={{ 
              backgroundColor: `${T.accent}20`, 
              padding: "8px", 
              borderRadius: "6px" 
            }}>
              <Target size={20} color={T.accent} />
            </div>
            <span style={{ fontSize: "14px", color: T.muted }}>Lead Score Avg</span>
          </div>
          <div style={{ fontSize: "24px", fontWeight: "700", color: T.text, fontFamily: "'JetBrains Mono', monospace" }}>82</div>
          <div style={{ fontSize: "12px", color: T.green, display: "flex", alignItems: "center", gap: "4px" }}>
            <TrendingUp size={12} />
            +8 points
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", marginBottom: "32px" }}>
        {/* Funnel Chart */}
        <div style={{
          backgroundColor: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: "8px",
          padding: "24px"
        }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 20px 0" }}>Conversion Funnel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={funnelData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
              <XAxis type="number" stroke={T.muted} />
              <YAxis dataKey="stage" type="category" stroke={T.muted} width={80} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: T.surface, 
                  border: `1px solid ${T.border}`, 
                  borderRadius: "6px",
                  color: T.text 
                }} 
              />
              <Bar dataKey="count" fill={T.accent} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Sources */}
        <div style={{
          backgroundColor: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: "8px",
          padding: "24px"
        }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 20px 0" }}>Lead Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leadSources}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {leadSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: T.surface, 
                  border: `1px solid ${T.border}`, 
                  borderRadius: "6px",
                  color: T.text 
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ marginTop: "16px" }}>
            {leadSources.map((source, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: source.color }}></div>
                <span style={{ fontSize: "14px", color: T.text }}>{source.name}</span>
                <span style={{ fontSize: "14px", color: T.muted, marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace" }}>{source.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Leads Table */}
      <div style={{
        backgroundColor: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: "8px",
        padding: "24px"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0" }}>Active Leads - Ready for Action</h3>
          <button style={{
            backgroundColor: T.accent,
            border: "none",
            borderRadius: "6px",
            padding: "8px 16px",
            color: "#000",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer"
          }}>
            Prioritize by Score
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "12px 16px", color: T.muted, fontSize: "14px", fontWeight: "500", borderBottom: `1px solid ${T.border}` }}>Lead</th>
                <th style={{ textAlign: "left", padding: "12px 16px", color: T.muted, fontSize: "14px", fontWeight: "500", borderBottom: `1px solid ${T.border}` }}>Source</th>
                <th style={{ textAlign: "left", padding: "12px 16px", color: T.muted, fontSize: "14px", fontWeight: "500", borderBottom: `1px solid ${T.border}` }}>Stage</th>
                <th style={{ textAlign: "left", padding: "12px 16px", color: T.muted, fontSize: "14px", fontWeight: "500", borderBottom: `1px solid ${T.border}` }}>Score</th>
                <th style={{ textAlign: "left", padding: "12px 16px", color: T.muted, fontSize: "14px", fontWeight: "500", borderBottom: `1px solid ${T.border}` }}>Last Action</th>
                <th style={{ textAlign: "left", padding: "12px 16px", color: T.muted, fontSize: "14px", fontWeight: "500", borderBottom: `1px solid ${T.border}` }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeLeads.map((lead) => (
                <tr key={lead.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                  <td style={{ padding: "16px" }}>
                    <div>
                      <div style={{ color: T.text, fontWeight: "500", fontSize: "14px" }}>{lead.name}</div>
                      <div style={{ color: T.muted, fontSize: "12px" }}>{lead.location}</div>
                    </div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <span style={{ 
                      backgroundColor: lead.source === "SolarIncentivePro" ? `${T.accent}20` : `${T.green}20`,
                      color: lead.source === "SolarIncentivePro" ? T.accent : T.green,
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "500"
                    }}>
                      {lead.source}
                    </span>
                  </td>
                  <td style={{ padding: "16px", color: T.text, fontSize: "14px" }}>{lead.stage}</td>
                  <td style={{ padding: "16px" }}>
                    <span style={{ 
                      color: getScoreColor(lead.score),
                      fontWeight: "600",
                      fontFamily: "'JetBrains Mono', monospace"
                    }}>
                      {lead.score}
                    </span>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div>
                      <div style={{ color: T.text, fontSize: "14px" }}>{lead.lastAction}</div>
                      <div style={{ color: T.muted, fontSize: "12px" }}>{lead.timeAgo}</div>
                    </div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button style={{
                        backgroundColor: T.green,
                        border: "none",
                        borderRadius: "4px",
                        padding: "6px 12px",
                        color: "#000",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}>
                        Call Now
                      </button>
                      <button style={{
                        backgroundColor: "transparent",
                        border: `1px solid ${T.border}`,
                        borderRadius: "4px",
                        padding: "6px 12px",
                        color: T.muted,
                        fontSize: "12px",
                        cursor: "pointer"
                      }}>
                        Send Text
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
