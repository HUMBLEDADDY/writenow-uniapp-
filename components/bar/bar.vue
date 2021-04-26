<template>
	<view class="navbar">
		<view class="header" :style="{'height':titleBarHeight,'padding-top':statusBarHeight,'opacity':opacity,'background':nav.bgColor}">
			<i v-if="nav.isShowBackBtn" class="iconfont icon-zuojiantou text-white back-btn" @tap="backTo()" :style="{
				color:nav.backBtnColor
			}"/>
			<view class="header-title" :style="{'color':nav.titleColor}">{{nav.navTitle}}</view>
		</view>
		<view  :style="{'height':titleBarHeight,'padding-top':statusBarHeight}"></view>
	</view>
</template>
<script>
	import {mapState} from 'vuex'; 
	export default {
		props:[
			"nav",
			"opacity"
		],
		data() {
			return {
				statusBarHeight: 0, 
				titleBarHeight: 0, 
			}
		},computed: {
		      ...mapState([
		        'loading'
		      ])
		},
		created() {
			var  that = this;
			 	uni.getSystemInfo({
			 		success: function(res) {
			 			if (res.model.indexOf('iPhone') !== -1) {
							that.titleBarHeight = 44 + 'px';
			 			} else {
			 				that.titleBarHeight = 48  + 'px';
						}
							that.statusBarHeight = res.statusBarHeight  + 'px'

					},
						
			 	})
		 },
		methods: {
			 // 回到上一页
			 backTo(){
				 uni.navigateBack()
			 }
		}
	}
</script>

<style lang="scss">
	.icon{
		width: 80rpx;
		height: 80rpx;
		color: black;
	}
	.header {
		box-sizing: content-box;
		display: flex;
		// box-sizing: border-box;
        padding:0 20rpx;
		align-items: center;
		top: 0;
		position: fixed;
		width: 100%;
		z-index: 50;
		background-color: #fff;
		/* left:5%; */
	}
	
	.header .header-title {
        font-weight: bold;
        color: #fff;
		/* position: absolute;
		left: 10%; */
		width: 60%;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
		font-size: 1.2rem;
		font-family: 'shoujin';
		/* transform: translateX(-50%); */
	}
	
	.back-btn{
		padding: 12rpx;
	}
</style>
