
import { Line } from "react-chartjs-2"
import { CategoryScale, Chart, defaults } from "chart.js/auto"
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";

Chart.register(CategoryScale);
defaults.maintainAspectRatio = false;
defaults.responsive = true

defaults.plugins.title.display = true;
defaults.plugins.title.align = "end";
defaults.plugins.title.font.size = 18;
defaults.plugins.title.font.family = "vazirMedium"
defaults.plugins.title.color = "black";


function LineChartYear() {
    const [data, setData] = useState([])
    const yearReport = useFetch('https://cogcenter.ir/library/api/v1/report/monthly/books?scopeId=0')

    useEffect(() => {
        setData(yearReport)
    }, [yearReport])


    return (
        <>
            <Line data={{
                labels: data.map(item => `${item.monthTitle} ${item.year}` ),
                datasets: [
                    {
                        label: "تعداد کامنت‌ها",
                        data: data.map(item => item.commentCount),
                        backgroundColor: "#DF5330",
                        borderColor: "#DF5330"
                    },
                    {
                        label: "کتاب‌های منتشر شده",
                        data: data.map(item => item.publishCount),
                        backgroundColor: "#101321",
                        borderColor: "#101321",
                    },
                    {
                        label: "کتاب‌های ثبت شده",
                        data: data.map(item => item.createCount),
                        backgroundColor: "#D1BAA7",
                        borderColor: "#D1BAA7",
                    },
                    {
                        label: "تعداد دانلود‌ها",
                        data: data.map(item => item.downloadCount),
                        backgroundColor: "#A1CED6",
                        borderColor: "#A1CED6",
                    }
                ]
            }}
                options={{
                    elements: {
                        line: {
                            tension: 0.5
                        }
                    },
                    plugins: {
                        title: {
                            text: "گزارش ماهانه"
                        }
                    }
                }} />
        </>
    )
}

export default LineChartYear