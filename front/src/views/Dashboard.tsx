import { FC, useMemo } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

import { useStore } from "../store/store";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import useSession from "../hooks/useSession";

const Dashboard: FC = () => {
  const username = localStorage.getItem("name");
  const in_progress = useStore((state) => state.in_progress);
  const completed = useStore((state) => state.completed);
  const navigate = useNavigate();
  const { logout } = useSession()

  const totalTodos = in_progress.length + completed.length;
  const completedPercentage = (completed.length / totalTodos) * 100;
  const inProgressPercentage = (in_progress.length / totalTodos) * 100;

  const averageCompletionTime = useMemo(() => {
    if (completed.length === 0) return 0;
    const validCompletionTimes = completed
      .map((todo) => {
        const createdAt = new Date(todo.createdAt).getTime();
        const completedAt = new Date(todo.completedAt!).getTime();
        return completedAt > createdAt ? completedAt - createdAt : null;
      })
      .filter((time) => time !== null);

    if (validCompletionTimes.length === 0) return 0;

    const totalCompletionTime = validCompletionTimes.reduce(
      (acc, time) => acc + time,
      0
    );
    return totalCompletionTime / validCompletionTimes.length / (1000 * 60);
  }, [completed]);

  const data = [
    { name: "In Progress", value: in_progress.length },
    { name: "Completed", value: completed.length },
  ];

  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-9/12 h-full">
        <div className="flex justify-center items-center w-full h-32 border flex-col rounded-md relative">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-stone-400">
            Hi, <span className="text-white">{username}</span>. Here are the
            metrics for your tasks
          </p>
          <div className="absolute right-8 gap-4 flex">
            <Button onClick={() => navigate("/my-todos")}>Go to Kanban</Button>
            <Button
              onClick={() => {
                logout()
                navigate("/")}
              }
              variant="secondary"
            >
              Log out
            </Button>
          </div>
        </div>
        <div className="flex justify-center items-center w-full h-full border border-stone-700 flex-col rounded-md">
          <PieChart width={600} height={400}>
            <Pie
              data={data}
              cx={300}
              cy={150}
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div className="w-1/2 border p-4 rounded-md">
            <h3 className="text-xl font-bold mb-2">Completion Statistics</h3>
            <p>Completed: {completedPercentage.toFixed(2)}%</p>
            <p>In Progress: {inProgressPercentage.toFixed(2)}%</p>
            <h3 className="text-xl font-bold mb-2 mt-4">
              Average Completion Time
            </h3>
            <p>{averageCompletionTime.toFixed(2)} minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
