

import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import HighchartsReact from "highcharts-react-official";
import Highcharts, { chart, Series } from 'highcharts'



function LineChartYear() {
    const [data, setData] = useState([])
    const yearReport = useFetch('https://cogcenter.ir/library/api/v1/report/monthly/books?scopeId=0')

    useEffect(() => {
        setData(yearReport)
    }, [yearReport])

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
        colors: ['#2c2c2c', "#ef7729" , "#806c60" , "#a1ced6"],
        title: {
            text: "گزارش ماهانه",
            align: "right",
            style: {
                fontFamily: "vazirBold"
            }
        },
      
        chart: {
            type: 'spline',
            scrollablePlotArea: {
                minWidth: 600,
                scrollPositionX: 1
            },
            height: "350px",
            style: {
                fontFamily: 'vazir'
            },
        },
        xAxis: {
            categories: data.map(item => `${item.monthTitle} ${item.year}`),
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
        <>
            <HighchartsReact highcharts={Highcharts} options={opt} />
        </>
    )
}

export default LineChartYear