<template>
	<view>
		<bar :nav="setNav"></bar>
		<view class="body">
			<view class="letter animation-slide-right">
				<view class="info">
					<view class="avatar"  v-bind:style="{'backgroundImage':'url(' + letterInfo.avatar + ')'}">
						
					</view>
					<view class="nameAndTime">
						<view class="name">
							{{letterInfo.name}}
						</view>
						<view class="time">
							{{letterInfo.sendTime}}
						</view>
					</view>
				</view>
				<text class="content">
					{{letterInfo.content}}
				</text>
			</view>
			<view class="add animation-roundin" @click="writeback(letterInfo)" type="primary">
				回信
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
					'navTitle':'信' ,//导航标题
					'backBtnColor':'#fff',
					'bgColor':'#426B59'
				},
				letterInfo:{}
			}
		},
		onLoad(Option){
			this.init(Option.id)
		},
		methods: {
			async init(id){
				console.log(id)
				const letter = await this.$http.post('getLetterInfo',{id:id})
				var letterdata = letter.data
				console.log(letterdata)
				const sender  = await this.$http.post('getUserInfo',{user:letterdata.from})
				console.log(sender.data)
				var senderdata = sender.data
				var letterInfo = {};
				letterInfo.content = letterdata.content;
				letterInfo.avatar = senderdata.avatar;
				letterInfo.name = senderdata.username;
				letterInfo.sendTime = letterdata.sendTime;
				letterInfo.sendId = senderdata.user;
				letterInfo.reciveId = letterdata.to
				this.letterInfo = letterInfo
			},
			writeback(letterInfo){
				console.log(letterInfo)
				var to = letterInfo.sendId;
				if(letterInfo.sendId == uni.getStorageSync('user')._id)
					to = letterInfo.reciveId;
				uni.navigateTo({
					url:'../write/write?to='+to
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.body{
		width: 100%;
		// height: 100vh;
		padding-top: 30px;
		padding-bottom: 30px;
		box-sizing: border-box;
		position: relative;
		// background-color: rgba($color: $lighter, $alpha: 0.8);
		// padding-bottom: 49px;
		.letter{
			width: 90%;
			padding: 20px;
			box-sizing: border-box;
			background-color: rgba($color: #fffffb, $alpha: 0.9);
			border-radius: 10px;
			position: relative;
			margin: 0 auto 30px;
			.info{
				padding: 20px;
				border-bottom: 1px solid #eee;
				display: flex;
				.avatar{
					width: 50px;
					height: 50px;
					border-radius: 50px;
					background-image: url(../../static/bgi1.jpg);
					background-position: center;
					background-size: cover;
				}
				.nameAndTime{
					height: 50px;
					margin-left: 10px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					.name{
						font-size: 1.2rem;
						color: #333;
						font-family: 'shoujin';
						font-weight: bolder;
						// height: fit-content;
					}
					.time{
						font-size: 0.8rem;
						font-family: 'shoujin';
						color: #777;
					}

				}
			}
			.content{
				display: block;
				margin: 10px;
				font-size: 1.2rem;
				color: #333;
				font-family: 'shoujin';
				letter-spacing: 3px;
				font-weight: bolder;
				// height: fit-content;
			}
		}
		.add{
			position: fixed;
			width: 50px;
			height: 50px;
			border: none;
			border-radius: 50px;
			line-height: 50px;
			text-align: center;
			background-color:  $primary1;
			// border: 2px solid $primary1;
			bottom: 80px;
			right: 30px;
			color: $lighter;
			font-family: 'shoujin';
			font-weight: bold;
			writing-mode:tb-rl;
		}
	}
	.body::after {
		content: "";
		background-image: url(../../static/bgi5.jpg);
		opacity: 1;
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
