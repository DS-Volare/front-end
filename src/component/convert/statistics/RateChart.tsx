import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

type ResponseRateType = {
  totalLines: number;
  characterRate: AppearanceRateType[];
};

type AppearanceRateType = {
  characterName: string;
  percentage: number;
};

type RateChartProps = {
  result: ResponseRateType;
};

// 차트 타입
type barChartType = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
};

type DataType = {
  labels: string[];
  datasets: barChartType[];
};

// 차트 설정
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '등장인물 출연율',
      font: {
        size: 18,
      },
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
  indexAxis: 'y' as const,
};

const labels = ['대사 비중'];

const randomColor = (): string => {
  const r: number = Math.floor(Math.random() * 256);
  const g: number = Math.floor(Math.random() * 256);
  const b: number = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b}`;
};

const RateChart = ({ result }: RateChartProps) => {
  const [data, setData] = useState<DataType>({
    labels,
    datasets: [],
  });

  useEffect(() => {
    console.log(result);
    const datasets = result.characterRate.map((item) => {
      const color = randomColor();
      return {
        label: item.characterName,
        data: [item.percentage],
        borderColor: color + ', 0.8)',
        backgroundColor: color + ', 0.5)',
        barThickness: 20,
      };
    }, []);

    setData({
      labels,
      datasets,
    });
  }, [result]);
  return (
    <BarContainer>
      <Bar options={options} data={data} />
    </BarContainer>
  );
};

const BarContainer = styled.div`
  height: 120px;
  width: auto;
`;

export default RateChart;
