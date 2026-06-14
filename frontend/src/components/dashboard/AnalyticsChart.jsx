import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const AnalyticsChart = ({
  analytics
}) => {

  const data = [
    {
      name: "Files",
      value: analytics.files
    },
    {
      name: "Flashcards",
      value: analytics.flashcards
    },
    {
      name: "Quizzes",
      value: analytics.quizzes
    },
    {
      name: "Summaries",
      value: analytics.summaries
    }
  ];

  return (

    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "20px",
        marginTop: "20px"
      }}
    >

      <h2>
        Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart
          data={data}
        >

          <XAxis
            dataKey="name"
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

};

export default AnalyticsChart;