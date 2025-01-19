import { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';
import { cropYields } from '../config/AgriculterData';

/**
 * BarData component renders a bar chart displaying average crop yields from 1950 to 2020.
 * It utilizes the ECharts library for rendering the chart.
 * 
 * @returns {JSX.Element} A div containing the bar chart.
 */
export const BarData = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    // Memoize the chart options to avoid recalculating on every render
    const chartOptions = useMemo(() => ({
        title: {
            text: 'Average Crop Yields (1950-2020)',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: cropYields.map(item => item.crop),
            name: 'Crop',
            axisLabel: {
                rotate: 45
            }
        },
        yAxis: {
            type: 'value',
            name: 'Average Yield (Kg/Ha)'
        },
        series: [
            {
                data: cropYields.map(item => item.averageYield),
                type: 'bar'
            }
        ]
    }), []);

    useEffect(() => {
        if (!chartRef.current) return;

        // Initialize the chart only once
        const chart = echarts.init(chartRef.current);

        // Set the options to the chart
        chart.setOption(chartOptions);

        // Automatically resize the chart on container resize
        const observer = new ResizeObserver(() => {
            chart.resize();
        });

        // Observe the chart container
        observer.observe(chartRef.current);

        // Cleanup function
        return () => {
            chart.dispose();
            observer.disconnect();
        };
    }, [chartOptions]);

    return (
        <div ref={chartRef} style={{ width: '100%', height: '400px', background: "#FDF7F4" }} />
    );
};
