<template>
	<view>
		<bar :nav="setNav"></bar>
		<view class="body">
			<view class="letter animation-slide-right">
				<view class="info">
					<view class="avatar" v-bind:style="{'backgroundImage':'url(' + UserInfo.avatar + ')'}">
						
					</view>
					<view class="nameAndTime">
						<view class="name">
							{{UserInfo.username}}
						</view>
						<view class="time">
							{{nowDate}}
						</view>
					</view>
				</view>
				<textarea class="content" maxlength="-1" v-model="content">
				</textarea>
			</view>
			<view class="add animation-roundin" @click="send" type="primary">
				寄出
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				UserInfo:{},
				setNav:{
					'isShowBackBtn':true, // 显示返回按钮
					'titleColor':'#fff',  //字体颜色
					'navTitle':'写信' ,//导航标题
					'backBtnColor':'#fff',
					'bgColor':'#426B59'
				},
				nowDate:'',
				content:'',

			}
		},
		onLoad(Option){
			console.log(Option);
			this.init(Option.to);
			this.getDate()
		},
		methods: {
			getDate() {
				// 获取当前日期
				var date = new Date();
				
				// 获取当前月份
				var nowMonth = date.getMonth() + 1;
				
				// 获取当前是几号
				var strDate = date.getDate();
				// 添加分隔符“-”
				var seperator = "-";
				
				
				// 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
				var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
				this.nowDate = nowDate;
			},
			async init(User){
				const res = await this.$http.post('getUserInfo',{user:User})
				this.UserInfo = res.data
			},
			async send(){
				console.log(uni.getStorageSync('user')._id)
				const res = await this.$http.post('getUserInfo',{user:uni.getStorageSync('user')._id})
				var fromInfo = res.data
				var toInfo = this.UserInfo
				var latitudeSpan = fromInfo.latitude - toInfo.latitude;
				var longitudeSpan = fromInfo.longitude - toInfo.longitude;
				console.log(latitudeSpan,longitudeSpan)
				var timeSpan = parseInt(Math.sqrt(latitudeSpan*latitudeSpan+longitudeSpan*longitudeSpan)*0.558)
				var d = new Date();
				var year = d.getYear()<1900?(1900+d.getYear()):d.getYear();
				var sendTime = year + "-" + (d.getMonth() + 1 ) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
				console.log(sendTime);
				d.setTime(d.setHours(d.getHours() + timeSpan+1));
				year = d.getYear()<1900?(1900+d.getYear()):d.getYear();
				var arriveTime = year + "-" + (d.getMonth() + 1 ) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
				console.log(arriveTime);
				var letter = {};
				letter.from = fromInfo.user;
				letter.to = toInfo.user;
				letter.content = this.content;
				letter.sendTime = sendTime;
				letter.arriveTime = arriveTime;
				const res1 = await this.$http.post('sendLetter',letter)
				console.log(res1)
				var timeTitle = '预计'+(timeSpan+1)+'小时后送达'
				console.log(timeTitle)
				uni.showModal({
				    title: '提示',
				    content: timeTitle,
					showCancel:false,
					confirmColor:'#426B59',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							uni.reLaunch({
								url:'../index/index'
							})
				        } 
				    }
				});
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.body{
		width: 100%;
		// height: 100vh;
		padding-top: 30px;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
		// background-color: rgba($color: $lighter, $alpha: 0.8);
		// padding-bottom: 49px;
		.letter{
			width: 90%;
			padding: 20px;
			box-sizing: border-box;
			background-color: rgba($color: #fffffb, $alpha: 0.9);
			border-radius: 10px;
			margin: 0 auto 30px;
			.info{
				padding: 20px;
				border-bottom: 1px solid #eee;
				display: flex;
				.avatar{
					width: 50px;
					height: 50px;
					border-radius: 50px;
					// background-image: url(../../static/bgi1.jpg);
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
				height: 50vh;
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
		height: 100vh;
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
