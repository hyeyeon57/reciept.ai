import { useEffect, useRef } from "react";

export default function SpendingDonutChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadChart = async () => {
      try {
        const Plotly = await import("plotly.js-dist-min");

        if (!chartRef.current) return;

        const totalBudget = 200000;
        const remaining = 104938;
        const spent = totalBudget - remaining;

        const foodSpent = Math.round(spent * 0.4);
        const cafeSpent = Math.round(spent * 0.3);
        const convenienceSpent = Math.round(spent * 0.2);
        const bakerySpent = spent - foodSpent - cafeSpent - convenienceSpent;

        const spendingData = [
          {
            values: [foodSpent, cafeSpent, convenienceSpent, bakerySpent, remaining],
            labels: ["식비", "카페", "편의점", "베이커리", "남은 식비"],
            type: "pie" as const,
            hole: 0.65,
            marker: {
              colors: ["#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE"],
            },
            textinfo: "none" as const,
            hovertemplate:
              "<b>%{label}</b><br>%{value:,}원<br>(%{percent})<extra></extra>",
          },
        ];

        const spendingLayout = {
          showlegend: true,
          legend: {
            orientation: "h" as const,
            x: 0.5,
            xanchor: "center" as const,
            y: -0.1,
            font: {
              family: "Noto Sans KR, Inter, sans-serif",
              size: 11,
              color: "#64748B",
            },
          },
          margin: {
            t: 10,
            b: 60,
            l: 10,
            r: 10,
          },
          height: 300,
          paper_bgcolor: "rgba(0,0,0,0)",
          plot_bgcolor: "rgba(0,0,0,0)",
          hoverlabel: {
            bgcolor: "#1E40AF",
            bordercolor: "#1E40AF",
            font: {
              color: "white",
              family: "Noto Sans KR, Inter, sans-serif",
              size: 12,
            },
          },
        };

        const config = {
          responsive: true,
          displayModeBar: false,
          displaylogo: false,
        };

        Plotly.newPlot(chartRef.current, spendingData, spendingLayout, config);
      } catch (e) {
        console.error("Chart rendering failed", e);
      }
    };

    loadChart();

    return () => {
      if (chartRef.current) {
        import("plotly.js-dist-min").then((Plotly) => {
          Plotly.purge(chartRef.current!);
        });
      }
    };
  }, []);

  return <div className="w-full" ref={chartRef}></div>;
}

