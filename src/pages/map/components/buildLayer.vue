<!--
 * @Description:     地图级别大于17级的楼栋图层
 * @Author:          ray
 * @Date:            2020-09-18
-->
<script>
import cubeAxios from "../assets/cudeAxios";
import cubeApi from "../assets/cubeApi";
// import { getMap, dataMixins } from "../mixins/index";
import { getMap } from '../mixins/getMap';
import { dataMixins } from '../mixins/dataMixins';
import { blockUrl } from "../config-map";

// 绘制传入的多边形数据
export default {
    name: "buildLayer",
    mixins: [getMap, dataMixins],
    props: {
        // 图层显示的最低级别
        showMinZoom: {
            type: Number,
            default: 17
        },
        // 默认线形样式
        defaultLineSymbol: {
            type: Object,
            default() {
                return {
                    'line-color': '#1E90FF',
                    "line-width": 3
                };
            }
        },
        // 默认多边形样式
        defaultSymbol: {
            type: Object,
            default() {
                return {
                    "fill-outline-color": "#34495e",
                    "fill-color": [
                        "case",
                        ["has", "hasCollect"],
                        ["to-color", "rgb(176,196,222)"], // 采集后颜色
                        ["to-color", "rgb(135,206,250)"] // 未采集颜色
                    ],
                    "fill-opacity": 0.6
                };
            }
        }
    },
    mounted() {
        this.layer = this.initLayer();
        // this.addLayerClick();
        this.addViewChange();
    },
    methods: {
        /**
         * 初始化地图
         * @returns {Object}
         */
        initLayer() {
            const layerId = "buildLayer";
            this.map.addSource(`${layerId}Source`, {
                type: "geojson",
                data: { type: "FeatureCollection", features: [] }
            });
            this.map.addLayer({
                id: `${layerId}-line`,
                type: "line",
                source: `${layerId}Source`,
                layout: {},
                paint: { ...this.defaultLineSymbol }
            });
            this.map.addLayer({
                id: layerId,
                type: "fill",
                source: `${layerId}Source`,
                layout: {},
                paint: { ...this.defaultSymbol }
            });
            return this.map.getLayer(layerId);
        },
        /**
         * 1.设置地图视图改变事件
         * 2.加载楼栋图层
         * 3.高亮楼栋多边形
         * 4.点击楼栋多边形
         */
        addViewChange() {
            this.map.on("moveend", async () => {
                const zoom = this.map.getZoom();
                if (zoom >= this.$props.showMinZoom) {
                    const data = await this.getBuildData();

                    // 增加房屋采集状态数据获取
                    if (data && data.length) {
                        const geometries = this.geojsonToGeo(data);
                        this.renderGeo(geometries, false);
                    }

                } else {
                    this.clear();
                }
            });
        },
        /**
         * 图层点击事件
         */
        addLayerClick() {
            this.map.on("click", "buildLayer", domEvent => {
                // console.log("buildLayer");
                this.$emit("click", domEvent);
            });
        },
        /**
         * 加载楼栋数据
         * 1.获取当前底图范围
         * 2.调用块数据服务
         */
        async getBuildData() {
            const extent = this.map.getBounds();
            const bounds = [
                [extent.getWest(), extent.getNorth()],
                [extent.getEast(), extent.getSouth()]
            ];
            // eslint-disable-next-line camelcase
            const { url, request_type } = cubeApi.getViewAreaByBuilding;
            try {
                const {
                    data: { retCode, data }
                } = await cubeAxios.Ajax(`${blockUrl}${url}`, {
                    request_type,
                    paramCodeList: "KJ5003",
                    coordinates: JSON.stringify(bounds)
                });
                if (retCode === "00000") {
                    // 采集的数据，则赋值  hasCollect  属性，未采集则不设置此属性
                    // for (const item of data.list) {
                    //     if (Math.random() > 0.5) {
                    //         item.hasCollect = "1";
                    //     }
                    // }
                    // console.log(data.list);
                    return data.list;
                    // const houses = await this.houseStatus(data.list);
                    // return houses;
                }
            } catch (e) {
                this.clear();
            }
        },
        /**
         * 获取房屋采集状态
         */
        async houseStatus (data) {
            const houses = [];
            const result = data;
            let codes = "";
            for (var i = 0; i < result.length; i ++) {
                codes += (i === 0 ? "" : ",") + result[i].areacode;
            }
            let param = {"houseid": codes};
            const res = await this.request.postNoLoading("collect:houseStatus", param);
            if (res && res.code == 200) {
                //let count = 0;
                for (var j = 0; j < result.length; j ++) {
                    // 0未采集，1已采集，2完成采集，null脏数据
                    if (res.data[result[j].areacode] || res.data[result[j].areacode] === "0") {
                        result[j].hasCollect = "1";
                        //count ++;
                    }
                    houses.push(result[j]);
                    // if (count >= res.data.length) {
                    //     break;
                    // }
                }
                return houses;
            }
        },
        /**
         * 清除数据
         */
        clear() {
            this.map.getSource(`${this.layer.id}Source`).setData({
                type: "FeatureCollection",
                features: []
            });
        }
    }
};
</script>
