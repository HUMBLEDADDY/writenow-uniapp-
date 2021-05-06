<template>
	<view class="letter">
		<view class="content">
			{{letter.content}}
		</view>
		<view class="info">
			<view class="from">
				{{letter.name}}
			</view>
			<view class="time">
				{{letter.sendTime}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:[
			"letter",
		],
		data() {
			return {
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.letter{
		width: 300rpx;
		height: 400rpx;
		background-color: #fff;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		border-radius: 10rpx;
		padding: 50rpx;
		box-sizing: border-box;
		font-family: 'shoujin';
		font-weight: bold;
		font-size: 1.5rem;
		letter-spacing: 1px;
		color: #333;
		.content{
			height: 80%;
			word-wrap:break-word;
			 text-overflow:ellipsis;
			width: 100%;

			overflow: hidden;
			/*将对象作为弹性伸缩盒子模型显示*/
			display: -webkit-box;
			/*设置子元素排列方式*/
			-webkit-box-orient: vertical;
			/*设置显示的行数，多出的部分会显示为...*/
			-webkit-line-clamp: 5;
		}
		.info{
			height: 20%;
			font-size: 1rem;
			font-weight: bolder;
			font-family: 'shoujin';
			letter-spacing: normal;
			display: block;
		}
		.time{
			font-size: 0.6rem;
		}
	}
	
</style>
