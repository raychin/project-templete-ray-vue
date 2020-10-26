<template>
	<!--头部导航-->
	<div :class="[searchShow?'header-out-search':'header-out']">
		<div class="header">
			<yd-navbar :title="headerTitle" fontsize="0.18rem" color="#ffffff" height="0.5rem" bgcolor="#0774EF">
				<div slot="left" @click="$router.go(-1)" style="width: 100%" v-if="realLeftShow">
          <img src="./img/left.png" style="width: 25px">
				</div>
				<div slot="right" style="width: 100%;text-align: right">
					<img src="./img/5_filter.png" v-if="realAddShow==='2'||realAddShow==='1'" style="width: 0.2rem;height: 0.2rem"
							 @click="filtrate">
					<img src="./img/add.png" v-if="realAddShow==='2'" style="width: 0.2rem;height: 0.2rem;margin-left: 0.15rem"
							 @click="addEvent">
					<p class="rightText" v-if="!!realRightShow" @click="uploadEvent">{{rightText}}</p>
					<!--<p class="rightText" v-if="realAddShow==='1'" @click="openMap">地图</p>-->
				</div>
			</yd-navbar>

			<!--搜索-->
			<div class="search" v-if="realSearchShow">
				<yd-search v-model="searchValue" :on-submit="submitHandler" :on-cancel="cancelSearch"></yd-search>
			</div>
			<p class="separate"></p>

		</div>
	</div>
</template>

<script>
	export default {
		name: "HeaderNav",
		props: ["headerTitle", "leftShow", "searchShow", "addShow", "rightText"],
		data() {
			return {
				realAddShow: this.addShow,			//右侧+号是否显示
				searchValue: '',//搜索内容
				realLeftShow: this.leftShow === undefined ? true : this.leftShow,	//导航左侧是否显示
				realRightShow: this.rightText === undefined ? false : this.rightText,	//导航右侧是否显示
				realRightText: "上传", //右侧按钮文字
				realSearchShow: this.searchShow === undefined ? false : this.searchShow,//是否显示搜索框 默认为false
			};
		},
		created() {
		},
		methods: {
			//打开地图
			openMap() {
				this.$router.push({path: '/map'});
			},

			//搜索
			submitHandler(value) {
				this.$emit("handleSearchValue", value);
			},

			//取消搜索
			cancelSearch() {
				this.$emit("cancelSearchValue");
				this.searchValue = '';
			},
			//筛选
			filtrate() {
				this.$emit("filtrate", true)
			},

			//添加事件
			addEvent() {
				console.log("点击添加");
				this.$router.push({path: '/add-merchant'});
			},

			//点击上传
			uploadEvent() {
				console.log(1)
				this.$emit("uploadEvent")
			},

		},
	};
</script>

<style scoped>
	.rightText {
		font-size: 0.16rem;
		color: #5083F0;
		padding: 0 5px;
		display: inline-block;
	}

	.arrow-left {
		width: 0.14rem;
		height: 0.14rem;
		border-top: 2px solid #222C43;
		border-right: 2px solid #222C43;
		transform: rotate(-135deg);
		margin-left: 0.1rem;
	}

	.header-out-search {
		width: 100%;
		height: 0.5rem;
		z-index: 101;
	}

	.header-out {
		width: 100%;
		height: 0.5rem;
	}

	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 101;
    border-bottom: 1px solid #eee;
	}

	.header-out >>> .yd-search-input {
		background-color: #ffffff !important;
	}

	.header-out >>> .search-input {
		background-color: #F3F4F7 !important;
		border-radius: 0.15rem;
	}

	.header-out >>> .yd-search-input > .search-input {
		height: 0.3rem;
	}

	.header-out >>> .yd-navbar-item {
		flex: 0 0 20%;
	}

	.header-out >>> .yd-navbar-center-box {
		width: 60%;
	}

	.header-out >>> .yd-navbar-center-title {
		/*white-space: normal;*/
		/*overflow: auto;*/
		/*text-overflow: ellipsis*/
	}

	.search {
		border-bottom: 1px solid #EEEEEE;
	}
</style>
