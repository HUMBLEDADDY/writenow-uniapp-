<template>
	<view class="body">
		<view class="slogon">
			<view class="logo"></view>
			<view class="theSlogon">
				尺素重重<br/>封锦字
			</view>
		</view>
		<view class="mailbox">
			<view class="mailboxWord">
				近期来信：
			</view>
			<view class="recentLetter">
				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
					<letter class="scroll-view-item_H"></letter>
					<letter class="scroll-view-item_H"></letter>
					<letter class="scroll-view-item_H"></letter>
				</scroll-view>
			</view>


		</view>
	</view>
</template>

<script>
	import letter from  '@/components/letter/letter.vue'
	export default {
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		methods: {
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon:"none",
					title:"纵向滚动 scrollTop 值已被修改为 0"
				})
			}
		}
	}
	</script>

<style lang="scss" scoped>
	.body{
		width: 100%;
		height: 100%;
		.slogon{
			margin-top: 200px;
			width: 100%;
			display: flex;
			align-items: center;
			.logo{
				position: relative;
				width: 75px;
				height: 75px;
				border-radius: 100rpx;
				background-image: url(../../static/bgi1.jpg);
				background-size: 383%;
				background-position: -86px -136px;
				background-repeat: no-repeat;
				margin-left: 80rpx;
				
			}
			.theSlogon{
				position: relative;
				color: #333;
				font-family: 'shoujin1';
				writing-mode:vertical-lr;
				font-size: 1.5rem;
				font-weight: bolder;
				border-left: 2px solid #333;
				margin-left: 10px;
				padding: 5px 10px 5px;
			}
		}
		.mailbox{
			margin-top: 80px;
			.mailboxWord{
				font-family: 'shoujin';
				font-weight: bold;
				color: #333;
				font-size: 1.3rem;
				margin-left: 20px;
			}
			.recentLetter{

				.scroll-view_H {
					white-space: nowrap;
					width: 100%;
				}
				
				.scroll-view-item_H {
					display: inline-block;
					white-space: pre-wrap;
					margin: 20px;
				}
			}
		}
	}
	.body::after {
		content: "";
		background-image: url(../../static/bgi4.jpg);
		opacity: 0.1;
		top: 0;
		background-size: cover;
		left: 0;
		bottom: 0;
		right: 0;
		position: absolute;
		z-index: -1;   
	}
</style>
