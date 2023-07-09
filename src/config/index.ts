export const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            grid: {
                color: '#313131'
            }
        },
        x: {
            grid: {
                display: false
            }
        }
    },
    plugins: {
        legend: {
            position: 'top' as const,
            align: 'end',
            labels: {
                usePointStyle: true,
                pointStyle: 'rect',
                color: 'white',
                font: {
                    size: 12,
                },
                align: 'end'
            }
        },
        title: {
            display: true,
            padding: {
                top: 10,
                bottom: 10
            },
            font: {
                size: 24,
                weight: 700,
                family: 'Helvetica'
            },
            align: 'start',
            color: 'white',
            text: 'Analytics',
        },
    },
};