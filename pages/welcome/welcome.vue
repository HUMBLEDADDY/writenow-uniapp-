<template>
	<view class="content">
		<button type="primary" @click="gotoIndex()" class="skip">跳过</button>
		<view class="welcometext-area">
			<text class="welcomeword">{{title}} </text>
		</view>

		<view class="logoAndName">
			<image class="logo" src="/static/logo.png"></image>
			<text class="name">信否</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '见字如面',
				toindex:{}
			}
		},
		onLoad() {
			this.toindex = setTimeout(this.gotoIndex,3000)
		},
		methods: {
			gotoIndex() {
			  uni.reLaunch({
				  url: '../index/index'
			  });
			  clearTimeout(this.toindex)
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background-color: $primary1;
		.skip{
			height: 50rpx;
			line-height: 50rpx;
			margin-top: 40px;
			font-size: 0.5rem;
			color: #595959;
			background-color: rgba($color: #e2e2e2, $alpha: 0.4);
			position: absolute;
			right: 40rpx;
			top: 40rpx;
		}
		.welcometext-area {
			display: flex;
			justify-content: center;
			.welcomeword {
				font-size: 100rpx;
				writing-mode:tb-rl;
				color: $primary2dark;
				font-family: shoujin1;
			}
		}
		.logoAndName{
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			position: absolute;
			bottom: 20rpx;
			margin-bottom: 20rpx;
			.logo {
				height: 150rpx;
				width: 150rpx;
				margin-left: auto;
				margin-top: 10rpx;
				margin-right: auto;
			}
			.name{
				font-family: shoujin1;
				color: $primary2;
				font-size: 1.3rem;
				border-left: 4rpx solid $primary2;
				padding-left: 10rpx;
				font-weight: bolder;
			}
		}

	}
</style>
