import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import { Bar } from "react-chartjs-2"
import { CategoryScale, Chart, defaults } from "chart.js/auto"
import LineChartYear from "./LineChartYear";

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
    const dailyReport = useFetch('/dailyReport.json')

    useEffect(() => {
        setData(dailyReport[0])
        console.log(data)
    }, [dailyReport])

    return (

        <div className="flex flex-col gap-7">
            <div className="w-full h-80 flex gap-7">
                <div className="flex flex-col gap-6 w-2/4 h-80 bg-dark rounded-xl shadow-md p-5">
                    <div className="flex justify-between items-center px-9 text-white">
                        <p className="font-semibold text-lg">گزارش امروز</p>
                        <p className="opacity-75 text-sm font-medium">{data?.date}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3">
                        <div className="flex gap-3 w-full justify-center">
                            <div className="flex flex-col items-center p-3 gap-3 bg-orange text-white h-24 w-40 rounded-lg shadow-md">
                                <p>کتاب‌های ثبت شده</p>
                                <p className="font-bold text-xl">{data?.createCount}</p>
                            </div>
                            <div className="flex flex-col items-center p-3 gap-3 bg-sandals h-24 w-40 rounded-lg shadow-md">
                                <p>تعداد کامنت‌ها</p>
                                <p className="font-bold text-xl">{data?.commentCount}</p>
                            </div>

                        </div>
                        <div className="flex gap-3 w-full justify-center">
                            <div className="flex flex-col items-center p-3 gap-3 bg-ocean h-24 w-40 rounded-lg shadow-md">
                                <p>تعداد دانلود‌ها</p>
                                <p className="font-bold text-xl">{data?.downloadCount}</p>
                            </div>
                            <div className="flex flex-col items-center p-3 gap-3 bg-linen h-24 w-40 rounded-lg shadow-md">
                                <p>کتاب‌های منتشر شده</p>
                                <p className="font-bold text-xl">{data?.publishCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-3/4 h-80 bg-sand rounded-xl shadow-md p-5 px-20">
                    <Bar data={{
                        labels: ["کتاب‌های ثبت شده", "دانلود‌ها", "منتشر شده‌ها", "کامنت‌ها"],
                        datasets: [
                            {
                                label: "تعداد",
                                data: [data?.createCount, data?.downloadCount, data?.publishCount, data?.commentCount],
                                backgroundColor: [
                                    "#DF5330",
                                    '#A1CED6',
                                    "#101321",
                                    '#D1BAA7',
                                ],
                                borderRadius: 6,
                                barThickness: 80,
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