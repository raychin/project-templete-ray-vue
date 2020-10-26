/* eslint-disable no-tabs */
/**
 * @Description:     处理数据的公共函数
 * @Author:          ray
 */
export const dataMixins = {
    methods: {
        /**
         * 将JSON对象转化为feature
         * @param {Array} data
         * @param {Object} options
         */
        geojsonToGeo(data) {
            const features = data.map((item) => {
                const {
                    areacode,
                    areainfo
                } = item;
                return {
                    id: areacode,
                    type: 'Feature',
                    properties: item,
                    geometry: areainfo
                }
            });
            return {
                type: 'FeatureCollection',
                features,
            }
        },
        /**
         * 渲染geojson数据
         * @param {Array} data
         * @param {Object} options
         */
        renderGeoJson(data = []) {
            const {
                fit
            } = this.$props;
            this.renderGeo(this.geojsonToGeo(data), fit);
        },
        /**
         * 渲染feature数据
         * @param {Array} geometries
         */
        renderGeo(geometries, fit = true) {
            this.map.getSource(`${this.layer.id}Source`).setData(geometries);
        },
    },
};