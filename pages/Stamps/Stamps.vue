<template>
	<view>
		<bar :nav="setNav"></bar>
		<view class="body">
			<!-- <uni-search-bar class="search" radius="200" placeholder="自动显示隐藏" clearButton="auto" cancelButton="none" @confirm="search" /> -->
			<view class="stampsList">
				<view class="stamp" v-for="item in stampUrlList">
					<image :src="item" class="stampImage" mode="aspectFit"></image>
				</view>
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
					'navTitle':'集邮册' ,//导航标题
					'backBtnColor':'#fff',
					'bgColor':'#426B59'
				},
				stampUrlList:[]
			}
		},
		mounted(){
			this.init()
		},
		methods: {
			async init(){
				var user = uni.getStorageSync('user')._id;
				const res1 = await this.$http.post('getAllStamps',{'user':user})
				var stampList = res1.data
				var stampUrlList = [];
				for(let i in stampList){
					let url = 'http://124.71.228.65:3000/stamps/'+stampList[i]+'.png'
					stampUrlList.push(url)
				}
				console.log(stampUrlList)
				this.stampUrlList = stampUrlList
			},
		}
	}
</script>

<style lang="scss" scoped>
	.body{
		width: 100%;
		height: 100vh;
		padding-top: 94px;
		top: 0;
		// margin-top: 44px;
		box-sizing: border-box;
		position: absolute;
		// background-color: #000;
		.search{
			// background-color: rgba($color: $lighter, $alpha: 0.5);
		}
		.stampsList{
			margin: 0 auto;
			width: 90%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			// justify-content: space-around;
			.stamp{
				width: fit-content;
				height: fit-content;
				background-color: rgba($color: $lighter, $alpha: 0.6);
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
				margin: 15px 4.4%;
				border-radius: 10px;
				display: flex;
				padding: 0 10rpx;
				justify-content: center;
				align-items: center;
				.stampImage{
					max-width: 250rpx;
					max-height: 500rpx;
				}
			}
		}
	}
	.body::after {
		content: "";
		background-image: url(../../static/bgi.jpg);
		opacity: 0.2;
		background-color: $lighter;
		top: 0;
		background-size: cover;
		left: 0;
		bottom: 0;
		right: 0;
		position: fixed;
		z-index: -9;   
	}
	.body::before {
		content: "";
		// background-image: url(../../static/bgi5.jpg);
		// opacity: 1;
		background-color: $lighter;
		top: 0;
		background-size: cover;
		left: 0;
		bottom: 0;
		right: 0;
		position: fixed;
		z-index: -1;   
		background-color: rgba($color: $lighter, $alpha: 0.8);
		
		// padding-bottom: 49px;
	}
</style>
