import { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import LineChartYear from "./LineChartYear";
import TodayReport from "./TodayReport";
import HighchartsReact from "highcharts-react-official";
import Highcharts, { chart, Series } from 'highcharts'
import jalaliMoment from 'jalali-moment';





function Dashboard() {

    const [data, setData] = useState([])
    const dailyReport = useFetch('https://cogcenter.ir/library/api/v1/report/daily/books?scopeId=0&length=5')

    useEffect(() => {
        setData(dailyReport)
    }, [dailyReport])


    const opt = {
        series: [
            {
                name: "تعداد کامنت‌ها",
                data: data.map(item => item.commentCount),
            },
            {
                name: "کتاب‌های منتشر شده",
                data: data.map(item => item.publishCount),
            },
            {
                name: "کتاب‌های ثبت شده",
                data: data.map(item => item.createCount),
            },
            {
                name: "تعداد دانلود‌ها",
                data: data.map(item => item.downloadCount),
            }
        ],
        colors: ['#2c2c2c', "#ef7729", "#806c60", "#a1ced6"],
        title: {
            text: "گزارش روزانه",
            align: "right",
            style: {
                fontFamily: "vazirBold"
            }
        },

        chart: {
            type: 'column',
            scrollablePlotArea: {
                minWidth: 600,
                scrollPositionX: 1
            },
            height: "280px",
            style: {
                fontFamily: 'vazir'
            },
        },
        xAxis: {
            categories: data?.map(item => { return jalaliMoment(item.date, 'YYYY-MM-DD').format('jYYYY/jMM/jDD') }),
            labels: {
                overflow: 'justify'
            }
        },

        plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                },

            }
        },
    }

    return (

        <div className="flex flex-col gap-7">
            <div className="w-full h-80 flex gap-7">
                <TodayReport />
                <div className="w-3/4 h-80 bg-sand rounded-xl shadow-md p-5 px-20">
                    <HighchartsReact highcharts={Highcharts} options={opt} />
                    {/* 
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
                        }} /> */}
                </div>

            </div>

            <div className="w-full h-96 bg-sand rounded-xl shadow-md p-7 px-20" >
                <LineChartYear />
            </div>

        </div>
    )
}

export default Dashboard