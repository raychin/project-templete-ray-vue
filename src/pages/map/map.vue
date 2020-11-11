<!--
 * @Date: 2020-09-18
 * @Author: ray
-->
<template>
    <div class="layout">
        <div class="layout-map">
            <map-layer ref="map" @click="handleBaseLayerClick($event)">
                <operate-layer ref="operateLayer"></operate-layer>
                <district-layer ref="districtLayer"></district-layer>
                <build-layer ref="buildLayer" @click="handleBuildLayerClick($event)"></build-layer>
            </map-layer>
        </div>
    </div>
</template>

<script>
import mapLayer from "./components/mapLayer.vue";
import districtLayer from "./components/districtLayer.vue";
import operateLayer from "./components/operateLayer.vue";
import buildLayer from "./components/buildLayer.vue";
import { Toast } from 'vant';
export default {
    name: "mapMain",
    data() {
        return {
            headOption: {
                back: true,
                title: "地图",
                heightLine: 1
            },
            positionData: {},
            coordinates: [0, 0],
            wgData: [],
            wgSymbol: {
                lineColor: "red",
                lineWidth: 2
            },
            buildSymbol: {
                lineColor: "red",
                lineWidth: 2,
                polygonFill: "rgb(135,255,0,0.5)",
                polygonOpacity: 0.6
            },
            hasMaskLayer: true
        };
    },
    components: { mapLayer, districtLayer, operateLayer, buildLayer },
    created() {
    },
    methods: {
        /**
         * 楼栋图层点击事件
         * 暂未使用该方法
         * modify by ray on 2020/03/13
         * @param {Object} domEvent
         */
        handleBuildLayerClick(domEvent) {
            const geos = domEvent.features;
            if (geos.length === 0) {
                return;
            }
            const property = geos[0].properties;

            Toast.success(property);
        },
        /**
         * 地图点击事件
         * @param {Object} geo
         * add by ray on 2020/03/13
         */
        handleBaseLayerClick(geo) {
            const property = geo.properties;
            console.log(property);
            /**
             * 增加采集状态判断
             * add by ray on 2020/03/13
             */
            if (property.hasCollect === "1") {
                Toast.fail("该楼栋已采集");
                return;
            }
            // Toast.success(property);
        },
    }
};
</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100%;
    &-map {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
}
</style>
