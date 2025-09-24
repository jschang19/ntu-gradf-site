import type { HistoricalData } from '~/types/program';

interface HistoricalDataTableProps {
  historicalData: HistoricalData[] | null;
}

export default function HistoricalDataTable({ historicalData }: HistoricalDataTableProps) {
  if (!historicalData || historicalData.length === 0) {
    return <p className="text-muted-foreground py-2">尚未有歷屆錄取資料</p>;
  }

  return (
    <table className="w-full max-sm:max-w-2xl max-w-full">
      <thead>
        <tr className="border-b hover:bg-[#f2f2f2]">
          <th className="text-left py-2 px-3 font-medium text-sm">年度</th>
          <th className="text-left py-2 px-3 font-medium text-sm">報名人數</th>
          <th className="text-left py-2 px-3 font-medium text-sm">錄取數</th>
          <th className="text-left py-2 px-3 font-medium text-sm">錄取率</th>
          <th className="text-left py-2 px-3 font-medium text-sm">最低錄取分數</th>
        </tr>
      </thead>
      <tbody>
        {historicalData.map((data) => (
          <tr key={data.year} className="border-b hover:bg-[#f2f2f2]">
            <td className="py-2 px-3 text-sm">{data.year}</td>
            <td className="py-2 px-3 text-sm">{data.application_num}</td>
            <td className="py-2 px-3 text-sm">{data.admission_num}</td>
            <td className="py-2 px-3 text-sm">{(data.recruiting_rate * 100).toFixed(1)}%</td>
            <td className="py-2 px-3 text-sm">{data.baseline_score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
