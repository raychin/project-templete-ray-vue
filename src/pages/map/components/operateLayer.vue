<!--
 * @Description:     进入地图显示操作范围
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
    name: "operateLayer",
    mixins: [getMap, dataMixins],
    props: {
        // 图层显示的最低级别
        showMinZoom: {
            type: Number,
            default: 3
        },
        // 默认线形样式
        defaultLineSymbol: {
            type: Object,
            default() {
                return {
                    'line-color': '#ffa500',
                    "line-width": 4
                };
            }
        },
        // 默认多边形样式
        defaultSymbol: {
            type: Object,
            default() {
                return {
                    "fill-color": "#ff0000",
                    "fill-opacity": 0
                };
            }
        }
    },
    mounted() {
        this.layer = this.initLayer();
        // this.addLayerClick();
        this.clear();
        this.initOperate();
        //this.addViewChange();
    },
    methods: {
        /**
         * 初始化地图
         * @returns {Object}
         */
        initLayer() {
            const layerId = "operateLayer";
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
         * 操作范围数据初始化
         */
        async initOperate () {
            const zoom = this.map.getZoom();
            if (zoom >= this.$props.showMinZoom) {
                const data = await this.getOperateArea();
                // console.log(data);
                if (data && data.length) {
                    const geometries = this.geojsonToGeo(data);
                    // console.log(geometries);
                    this.renderGeo(geometries, false);
                }
            }
        },
        /**
         * 1.设置地图视图改变事件
         * 2.加载操作范围图层
         */
        addViewChange() {
            this.map.on("moveend", async () => {
                const zoom = this.map.getZoom();
                if (zoom >= this.$props.showMinZoom) {
                    const data = await this.getOperateArea();
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
            this.map.on("click", "operateLayer", domEvent => {
                // console.log("operateLayer");
                this.$emit("click", domEvent);
            });
        },
        /**
         * 利用块数据服务获取操作范围数据，并在地图绘制操作面
         * add by ray on 2020/03/12
         */
        async getOperateArea() {
            // const areaCode = this.$store.state.userInfo.user.administrativeDeptId ? this.$store.state.userInfo.user.administrativeDeptId : "4403";
            const areaCode = "440305";
            // eslint-disable-next-line camelcase
            const { url, request_type } = cubeApi.getAreaInfoByAreaCode;
            try {
                const {
                    data: { retCode, data }
                } = await cubeAxios.Ajax(`${blockUrl}${url}`, {
                    request_type,
                    paramCodeList: "KJ5002",
                    areaCode: areaCode
                });
                if (retCode === "00000") {
                    // console.log(data.list[0]);
                    return data.list;
                }
            } catch (e) {
                console.log(e);
                this.clear();
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
        },
    }
};
</script>
