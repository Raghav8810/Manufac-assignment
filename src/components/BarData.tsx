import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { cropYields } from '../config/AgriculterData';

/**
 * BarData component renders a bar chart displaying average crop yields from 1950 to 2020.
 * It utilizes the ECharts library for rendering the chart.
 * 
 * @returns {JSX.Element} A div containing the bar chart.
 */
export const BarData = () => {
    // Reference to the chart container
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Ensure the chartRef is available
        if (!chartRef.current) return;

        const chart = echarts.init(chartRef.current);
        // Define the chart options
        const option = {
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
                name: 'Crop', // Label for x-axis
                axisLabel: {
                    rotate: 45
                }
            },
            yAxis: {
                type: 'value',
                name: 'Average Yield (Kg/Ha)' // Label for y-axis
            },
            series: [
                {
                    data: cropYields.map(item => item.averageYield),
                    type: 'bar'
                }
            ]
        };
        // Set the options to the chart
        chart.setOption(option);
        // Handle window resize to adjust chart size
        const handleResize = () => {
            chart.resize();
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup function to dispose of the chart and remove event listener
        return () => {
            chart.dispose();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
        
        <div ref={chartRef} style={{ width: '100%', height: '400px', background: "#FDF7F4", }} />
        </>
    );
};
