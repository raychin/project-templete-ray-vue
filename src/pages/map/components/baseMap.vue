<!--
 * @Description:     地图组件
 * @Author:          ray
 * @Date:            2020-09-18
-->
<template>
    <div :id="domId" class="map">
        <slot v-if="mapFlag"></slot>
    </div>
</template>
<script>
import { Toast } from "vant";
import { mapBgUrl } from "../config-map";
let popupDiv = null;
// 地图底图组件
export default {
    name: "baseMap",
    props: {
        // 地图属性
        mapOptions: Object
    },
    provide() {
        return { mapProvider: this.mapProvider };
    },
    data() {
        this.mapProvider = {};
        return {
            // 地图DIV的ID
            domId: `map-${new Date().getTime()}`,
            mapFlag: false
        };
    },
    mounted() {
        const map = this.initMap();
        this.mapProvider.map = map;
        map.on("load", () => {
            this.mapFlag = true;
        });
        this.addLayerClick();
    },
    methods: {
        /**
         * 初始化地图
         * @returns {Object}
         */
        initMap() {
            const { mapOptions } = this.$props;
            const { domId } = this.$data;
            return new GeoGlobe.Map({
                container: domId,
                style: {
                    version: 8,
                    sources: {
                        bd: {
                            tiles: [
                                `${mapBgUrl}/tile/{z}/{y}/{x}`
                            ],
                            type: "raster",
                            zoomOffset: 10,
                            tileSize: 256
                        }
                    },
                    layers: [
                        {
                            id: "base_layer",
                            type: "raster",
                            source: "bd",
                            "raster-opacity": 1
                        }
                    ]
                },
                mapCRS: {
                    topTileExtent: [-180, -270, 180, 90],
                    coordtransform: "none"
                },
                zoom: 11,
                minZoom: 10,
                maxZoom: 22,
                center: [113.9255976, 22.536474762],
                pitch: 0,
                bearing: 0,
                epsg: "EPSG:4490",
                doubleClickZoom: false,
                isIntScrollZoom: true,
                renderWorldCopies: false,
                isAttributionControl: false,
                is3Dpitching: false,
                ...mapOptions
            });
        },
        /**
         * 返回地图引用
         */
        getMap() {
            return this.mapProvider.map;
        },
        /**
         * 图层点击事件
         */
        addLayerClick() {
            this.mapProvider.map.on("click", (e) => {
                // const geos = this.mapProvider.map.queryRenderedFeatures(e.point);
                // for (var i = 0; i < geos.length; i++) {
                //     console.log(geos[i]);
                // }

                // var layers = this.mapProvider.map.getStyle().layers;
                // for (var i = 0; i < layers.length; i++) {
                //     console.log(layers[i]);
                //     // console.log(this.mapProvider.map.getSource(layers[i].source));
                //     var features = this.mapProvider.map.querySourceFeatures(layers[i].source, {sourceLayer: layers[i].id});
                //     console.log(features);
                // }

                // var operateFeatures = this.mapProvider.map.queryRenderedFeatures(e.point, {sourceLayer: "operateLayer"});
                // console.log(operateFeatures);
                var features = this.mapProvider.map.queryRenderedFeatures(e.point, {sourceLayer: "buildLayer"});
                console.log(features);
                if (features.length === 0) {
                    Toast.fail("超出操作范围");
                } else {
                    if (features.length === 1) {
                        Toast.fail(features[0].layer.id === "buildLayer" ? "超出操作范围" : "请选择房屋");
                    } else {
                        for(var i = 0; i < features.length; i ++) {
                            if (features[i].layer.id === "buildLayer") {
                                console.log(features[i]);
                                this.showPopup(
                                    features[i].properties.lon,
                                    features[i].properties.lat,
                                    features[i].properties.areaname);
                                this.$emit("click", features[i]);
                                break;
                            }
                        }
                    }
                }
            });
        },
        /**
         * 弹框显示
         */
        showPopup(x, y, content) {
            // 每次都形成了不同的popupDiv
            if (popupDiv !== null) {
                popupDiv.remove()
            }
            let monument = [x, y];
            // let popup = new mapboxgl.Popup({offset: 25})
            //     .setText(name);

            // // create DOM element for the marker
            // let el = document.createElement('div');
            // el.id = 'marker';

            // create the marker
            popupDiv = new window.GeoGlobe.Popup({closeOnClick: false})
                .setLngLat(monument)
                .setHTML('<div><div style="margin-right:.2rem;">' + content + '</div></div>')
                .addTo(this.mapProvider.map);

            // 获取关闭的点击事件
            popupDiv.on('close', (e) => {
                console.log(e);
            })
        },
    }
};
</script>
<style lang="scss" scoped>
.map {
    width: 100%;
    height: 100%;
}
</style>
