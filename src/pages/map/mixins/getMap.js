/**
 * @Description:     从map中获取地图对象
 * @Author:          ray
 */
export const getMap = {
    inject: ['mapProvider'],
    computed: {
        map() {
            return this.mapProvider.map;
        },
    },
    render(h) {
        return h('template', this.$slots.default);
    },
    methods: {
        /**
         * 返回图层引用
         */
        getLayer() {
            return this.layer;
        },
    },
};