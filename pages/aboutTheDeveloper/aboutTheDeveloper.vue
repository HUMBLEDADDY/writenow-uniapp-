<template>
	<view class="body">
		<bar :nav="setNav"></bar>
		<view >
			<view class="logoAndName animation-scale-down">
				<view class="logo"></view>
				<view class="name">
					信否WriteNow
				</view>
			</view>
			<view class="content animation-slide-bottom">
				信否WriteNow第一版诞生于2020年5月，由Humbledaddy(前端)，周旭钢(后台)，张泽龙(后台)和孟子玉(美工)组成的团队开发，第一版基于微信小程序，我们在开发第一版时，有很多有趣的想法，但是由于微信小程序本身平台以及性能的限制，效果并不如我们所愿。后来由于代码文件丢失，信否WriteNow第一版这一项目成为过去式
				<br/><br/>
				信否WriteNow第二版由Humbledaddy基于uniapp跨平台开发，灵感继承于信否WriteNow第一版，对第一版的一些逻辑算法进行进一步优化
				<br/><br/>
				由于Humbledaddy开发方向主要以前端为主，后台开发经验并不多，所以如果在使用过程中出现了影响正常使用的bug，请向Chen7157783@gmail.com邮箱反馈
				<br/><br/>
				见字如面
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				setNav:{
					'isShowBackBtn':true, // 显示返回按钮
					'titleColor':'#fff',  //字体颜色
					'navTitle':'关于开发者' ,//导航标题
					'backBtnColor':'#fff',
					'bgColor':'#426B59'
				},
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.body{
		width: 100%;
		height: 100vh;
		padding-top: 30px;
		overflow: hidden;
		box-sizing: border-box;
		background-color: rgba($color: $lighter, $alpha: 0.5);
		// padding-bottom: 49px;
		.logoAndName{
			width: 100%;
			overflow: hidden;
			display: flex;
			align-items: center;
			.logo{
				position: relative;
				width: 75px;
				height: 75px;
				border-radius: 100rpx;
				background-image: url(../../static/bgit.jpg);
				background-size: 383%;
				background-position: -86px -136px;
				background-repeat: no-repeat;
				margin-left: 50rpx;
				
			}
			.name{
				position: relative;
				color: #333;
				font-family: 'shoujin1';
				font-size: 1.5rem;
				font-weight: bolder;
				border-left: 2px solid $primary2dark;
				margin-left: 10px;
				padding: 5px 10px 5px;
			}
		}
		.content{
			width: 80%;
			margin: 20px auto;
			font-size: 1.2rem;
			font-weight: bold;
			font-family: 'shoujin';
			background-color: rgba($color: $lighter, $alpha: 0.8);
			box-sizing: border-box;
			padding: 30px;
			border-radius: 10px;
		}
	}
	.body::after {
		content: "";
		background-image: url(../../static/bgit.jpg);
		opacity: 1;
		background-color: $lighter;
		top: 0;
		background-size: cover;
		left: 0;
		bottom: 0;
		right: 0;
		position: absolute;
		z-index: -1;   
	}
</style>
