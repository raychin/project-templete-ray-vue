<!--
 * @Description:     区划绘制
 * @Author:          ray
 * @Date:            2020-11-11
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
    name: "districtLayer",
    mixins: [getMap, dataMixins],
    props: {
        regionZoom: {
            type: Number,
            default: 9
        },
        streetZoom: {
            type: Number,
            default: 13
        },
        coummunityZoom: {
            type: Number,
            default: 15
        },
        gridZoom: {
            type: Number,
            default: 17
        },
        // 图层显示的最低级别
        showMinZoom: {
            type: Number,
            default: 9
        },
        // 默认线形样式
        defaultLineSymbol: {
            type: Object,
            default() {
                return {
                    'line-color': '#FF8C00',
                    "line-width": 3
                };
            }
        },
        // 默认多边形样式
        defaultSymbol: {
            type: Object,
            default() {
                return {
                    "fill-color": "#FFDEAD",
                    "fill-opacity": 0
                };
            }
        }
    },
    mounted() {
        this.layer = this.initLayer();
        // this.addLayerClick();
        this.clear();
        this.initDistrict();
        this.addViewChange();
    },
    methods: {
        /**
         * 初始化地图
         * @returns {Object}
         */
        initLayer() {
            const layerId = "districtLayer";
            if (this.map.getLayer(layerId)) {
                return this.map.getLayer(layerId);
            }
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
        async initDistrict () {
            const zoom = this.map.getZoom();
            if (zoom >= this.$props.showMinZoom) {
                const data = await this.getDistrict();
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
                    const data = await this.getDistrict();
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
            this.map.on("click", "districtLayer", domEvent => {
                // console.log("districtLayer");
                this.$emit("click", domEvent);
            });
        },
        /**
         * 利用块数据服务获取操作范围数据，并在地图绘制操作面
         * add by ray on 2020/03/12
         */
        async getDistrict() {
            const extent = this.map.getBounds();
            const bounds = [
                [extent.getWest(), extent.getNorth()],
                [extent.getEast(), extent.getSouth()]
            ];
            // eslint-disable-next-line camelcase
            let type = 1;
            const zoom = this.map.getZoom();
            if (zoom >= this.$props.gridZoom) {
                type = 4;
            } else if (zoom >= this.$props.coummunityZoom) {
                type = 3;
            } else if (zoom <= this.$props.streetZoom) {
                type = 2;
            } else if (zoom >= this.$props.regionZoom) {
                type = 1;
            }
            const { url, request_type } = cubeApi.getViewAreaByBuilding;
            try {
                const {
                    data: { retCode, data }
                } = await cubeAxios.Ajax(`${blockUrl}${url}`, {
                    request_type,
                    paramCodeList: "KJ5003",
                    // 不传默认查楼栋，1区2街道3社区4网格
                    paramType: type,
                    coordinates: JSON.stringify(bounds)
                });
                if (retCode === "00000") {
                    return data;
                }
            } catch (e) {
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
