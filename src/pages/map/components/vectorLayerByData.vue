<!--
 * @Description:     绘制传入的多边形数据
 * @Author:          ray
 * @Date:            2020-09-18
-->
<script>
import * as maptalks from "maptalks";
import { getMap, dataMixins } from "../mixins/index";
// 绘制传入的多边形数据
export default {
    name: "vectorLayerByData",
    mixins: [getMap, dataMixins],
    props: {
        // 是否默认支持点击
        hasClick: {
            type: Boolean,
            default: true,
        },
        // 是否默认自适应
        fit: {
            type: Boolean,
            default: true,
        },
        // 多边形数据
        data: Array,
        // 选中的多边形数据
        selected: Array,
        // 默认多边形样式
        defaultSymbol: {
            type: Object,
            default() {
                return {
                    lineColor: "red",
                    lineWidth: 2,
                    polygonOpacity: 0,
                    lineOpacity: 1,
                    polygonFill: "#1bbc9b",
                };
            },
        },
        // 高亮多边形样式
        highSymbol: {
            type: Object,
            default() {
                return {
                    lineColor: "yellow",
                    lineWidth: 3,
                    polygonOpacity: 0.8,
                };
            },
        },
    },
    watch: {
        data(val) {
            this.renderGeoJson(val);
            this.highLayer(this.selected);
        },
        selected(val, oldVal) {
            if (val !== oldVal) {
                this.highLayer(val);
            }
        },
    },
    mounted() {
        const { hasClick, data, selected } = this.$props;
        this.layer = this.initLayer();
        this.renderGeoJson(data);
        this.highLayer(selected);
        hasClick && this.addClick();
    },
    methods: {
        /**
         * 初始化地图
         * @returns {Object}
         */
        initLayer() {
            const map = this.map;
            const layerId = `vectorLayer${(
                Math.random() * 100
            ).toFixed()}-${new Date().getTime()}`;
            return new maptalks.VectorLayer(layerId).addTo(map);
        },
        /**
         * 高亮选中的多边形数据
         * @param {Array} data
         */
        highLayer(selected) {
            if (selected) {
                const { defaultSymbol, highSymbol } = this.$props;
                this.layer.getGeometries((geo) => {
                    const symbol = selected.find(
                        ({ areacode }) => areacode === geo.getId()
                    )
                        ? highSymbol
                        : defaultSymbol;
                    geo.updateSymbol(symbol);
                });
            }
        },
        /**
         * 1.设置地图点击事件
         * 2.高亮多边形
         * 3.同步选中数据
         */
        addClick() {
            this.map.on("click", ({ coordinate }) => {
                this.map.identify(
                    { coordinate, layers: [this.layer] },
                    (geos) => {
                        if (geos.length === 0) {
                            return;
                        }
                        const geoId = geos[0].getId();
                        let selected = [...this.$props.selected];
                        const index = selected.findIndex(
                            ({ areacode }) => areacode === geoId
                        );
                        if (index !== -1) {
                            selected.splice(index, 1);
                        } else {
                            selected.push(
                                this.$props.data.find(
                                    ({ areacode }) => areacode === geoId
                                )
                            );
                        }
                        this.$emit("change", selected);
                    }
                );
            });
        },
    },
};
</script>
