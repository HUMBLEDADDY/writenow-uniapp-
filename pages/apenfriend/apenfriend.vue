<template>
	<view>
		<bar :nav="setNav"></bar>
		<view class="body">
			<view class="info animation-fade">
				<view class="avatar" v-bind:style="{'backgroundImage':'url(' + userInfo.avatar + ')'}">
					
				</view>
				<view class="name">
					{{userInfo.username}}
				</view>
			</view>
			<view class="interests">
				<view class="interestTitle">
					感兴趣的话题
				</view>
				<view class="interestList">
					<view class="interest" v-for="item in userInfo.hobbyStr">
						{{hobby[item]}}
					</view>
				</view>
			</view>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
				<letter v-for="item in arriveLetter" :letter="item" @click.native="read(item.id)" class="scroll-view-item_H animation-slide-right"></letter>
			</scroll-view>
			<view class="add animation-roundin" @click="writeback">
				写信
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId:'',
				userInfo:{},
				setNav:{
					'isShowBackBtn':true, // 显示返回按钮
					'titleColor':'#fff',  //字体颜色
					'navTitle':'笔友' ,//导航标题
					'backBtnColor':'#fff',
					'bgColor':'#426B59'
				},
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				arriveLetter:[],
				hobby: ['哲学','艺术','电影','数码','文学','音乐','诗歌','装机','车友','码农','喜剧','美剧','摄影','番剧','美妆','穿搭','Steam','MOBA','主机','体育','宠物','综艺','旅游', '娱乐'],
			}
		},
		onLoad(Option){
			console.log(Option)
			this.userId = Option.user;
			this.init()
		},
		methods: {
			async init(){
				const res = await this.$http.post('getFriendInfo',{'friend':this.userId,'user':uni.getStorageSync('user')._id})
				var data = res.data.userInfo
				console.log(res)
				var hobbyStr = data.hobbyStr.split(" ")
				for(let i in hobbyStr){
					hobbyStr[i] = parseInt(hobbyStr[i])
				}
				data.hobbyStr = hobbyStr
				this.userInfo = data
				var letterData = res.data.friendInfo.Letters;
				console.log(letterData)
				var arriveLetter = [];
				
				for(let i in letterData){
					if(this.checkTime(letterData[i].arriveTime)||letterData[i].from == uni.getStorageSync('user')._id){
						let name = uni.getStorageSync('user').username
						if(letterData[i].from!=uni.getStorageSync('user')._id){
							name = data.username
						}
						let sendTime = letterData[i].sendTime
						let content = letterData[i].content
						let id = letterData[i]._id
						let letter = {};
						letter.name = name;
						letter.sendTime = sendTime;
						letter.content = content
						letter.id = id
						arriveLetter.push(letter)
					}
				}
				console.log(arriveLetter)
				this.arriveLetter = arriveLetter
			},
			checkTime(time){
				var dateAndTime = time.split(' ')
				var dateArray = dateAndTime[0].split('-')
				var timeArray = dateAndTime[1].split(':')
				console.log(dateArray,timeArray)
				var d = new Date();
				parseInt()
				var year = d.getYear()<1900?(1900+d.getYear()):d.getYear();
				if(year>parseInt(dateArray[0])){
					return true
				}else if(year==parseInt(dateArray[0])){
					if((d.getMonth() + 1 )>parseInt(dateArray[1]))
						return true
					else if((d.getMonth() + 1 )==parseInt(dateArray[1])){
						if(d.getDate()>parseInt(dateArray[2]))
							return true
						else if(d.getDate()==parseInt(dateArray[2])){
							if(d.getHours()>parseInt(timeArray[0]))
								return true
							else if(d.getHours()==parseInt(timeArray[0])){
								if(d.getMinutes()>parseInt(timeArray[1]))
									return true
								else if(d.getMinutes()>parseInt(timeArray[1])){
									if(d.getSeconds()>=parseInt(timeArray[2]))
										return true
								}
							}
						}
					}
				}
				return false
			},
			read(id){
				uni.navigateTo({
					url:'../read/read?id='+id
				})
			},
			writeback(){
				uni.navigateTo({
					url:'../write/write?to='+this.userId
				})
			}
		}
	}
</script>

<style lang="scss">
	.body{
		width: 100%;
		height: 100vh;
		padding-top: 44px;
		overflow: hidden;
		box-sizing: border-box;
		position: absolute;
		top: 0;
		background-color: rgba($color: $lighter, $alpha: 0.6);
		// padding-bottom: 49px;
		.info{
			width: 100%;
			// height: 20vh;
			background-color: rgba($color: #fff, $alpha: 0);
			display: flex;
			// margin: 80rpx 0;
			height: 20vh;
			align-items: center;
			box-sizing: border-box;
			// padding-top: 20px;
			z-index: 999;
			.avatar{
				width: 50px;
				height: 50px;
				background-image: url(../../static/bgi1.jpg);
				background-position: center;
				background-size: cover;
				border-radius: 80px;
				position: relative;
				z-index: 999;
				margin-left: 20px;
			}
			.name{
				position: relative;
				z-index: 999;
				font-size: 2rem;
				color: #333;
				font-family: 'shoujin';
				font-weight: bolder;
				border-left: 2px solid $primary2dark;
				margin-left: 8px;
				padding: 8px 5px 8px;
			}
		}
		.interests{
			display: flex;
			width: 90%;
			margin: 0 auto;
			height: 13vh;
			.interestTitle{
				width: 40%;
				font-family: 'shoujin';
				font-weight: bold;
				font-size: 40rpx;
				color: #333;
				// background-color: blue;
			}
			.interestList{
				// background-color: red;
				width: 60%;
				height: 184rpx;
				display: flex;
				flex-wrap: wrap;
				// align-items: center;
				margin-top: -6rpx;
				// overflow: hidden;
				.interest{
					font-family: 'shoujin';
					background-color: rgba($color: $primary1, $alpha: 1);
					// border: 1px solid $primary2dark;
					color: rgba($color: #fff, $alpha: 1);
					// height: fit-content;
					font-size: 40rpx;
					font-weight: bold;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					width: 100rpx;
					// padding: 4rpx;
					border-radius: 10rpx;
					margin: 6rpx 8rpx;
					box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
					
					// padding: 5px;
					// border-radius: 500px;
				}
			}

		}


			.add{
				position: absolute;
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
		background-image: url(../../static/bgi.jpg);
		opacity: 0.1;
		background-color: $lighter;
		top: 0;
		background-size: cover;
		left: 0;
		bottom: 0;
		right: 0;
		position: absolute;
		z-index: -1;   
	}
	.scroll-Y {
		height: 58vh;
		width: 90%;
		margin: 0px auto 0;
		padding-bottom: 490px;
		.scroll-view-item_H{
			width: 300rpx;
			margin: 18rpx;
			display: inline-block;
			box-sizing: border-box;
		}
	}
</style>
