import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import { Bar } from "react-chartjs-2"
import { CategoryScale, Chart, defaults } from "chart.js/auto"
import LineChartYear from "./LineChartYear";
import TodayReport from "./TodayReport";


Chart.register(CategoryScale);
defaults.maintainAspectRatio = false;
defaults.responsive = true

defaults.plugins.title.display = true;
defaults.plugins.title.align = "end";
defaults.plugins.title.font.size = 18;
defaults.plugins.title.font.family = "vazirMedium"
defaults.plugins.title.color = "black";

function Dashboard() {

    const [data, setData] = useState([])
    const dailyReport = useFetch('https://cogcenter.ir/library/api/v1/report/daily/books?scopeId=0&length=5')

    useEffect(() => {
        setData(dailyReport)
        console.log(data)
    }, [dailyReport])

    return (

        <div className="flex flex-col gap-7">
            <div className="w-full h-80 flex gap-7">
                <TodayReport />
                <div className="w-3/4 h-80 bg-sand rounded-xl shadow-md p-5 px-20">
                    <Bar data={{
                        labels: data?.map(item => item.date),
                        datasets: [
                            {
                                label: "تعداد کامنت‌ها",
                                data: data?.map(item => item.commentCount),
                                backgroundColor: "#DF5330",
                                borderRadius: 6,
                                
                        
                            },
                            {
                                label: "کتاب‌های منتشر شده",
                                data: data?.map(item => item.publishCount),
                                backgroundColor: "#101321",
                                borderRadius: 6,
                                
                        
                            },
                            {
                                label: "کتاب‌های ثبت شده",
                                data: data?.map(item => item.createCount),
                                backgroundColor: "#D1BAA7",
                                borderRadius: 6,
                                
                        
                            },
                            {
                                label: "تعداد دانلود‌ها",
                                data: data?.map(item => item.downloadCount),
                                backgroundColor: "#A1CED6",
                                borderRadius: 6,
                                
                        
                            }
                        ]
                    }}
                        options={{

                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            },
                            plugins: {
                                title: {
                                    text: "گزارش روزانه"
                                }
                            }
                        }} />
                </div>

            </div>

            <div className="w-full h-96 bg-sand rounded-xl shadow-md p-7 px-20" >
                <LineChartYear />
            </div>

        </div>
    )
}

export default Dashboard