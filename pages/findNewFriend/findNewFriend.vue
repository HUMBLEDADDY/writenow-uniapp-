<template>
	<view>
		<bar :nav="setNav"></bar>
		<view class="body">
			<!-- <uni-search-bar class="search" radius="200" placeholder="自动显示隐藏" clearButton="auto" cancelButton="none" @confirm="search" /> -->
			<view class="friendsList">
				<view class="friend" v-for="item in newfriends" @click="checkFriend(item)">
					<view class="avatarAndName">
						<view class="avatar" v-bind:style="{'backgroundImage':'url(' + item.avatar + ')'}">
						</view>
						<view class="name">
							{{item.username}}
						</view>
					</view>
					<view class="interestList">
						<view class="interest" v-for="interest in item.hobbyStr">
							{{hobby[interest]}}
						</view>
					</view>
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
					'navTitle':'匹配笔友' ,//导航标题
					'backBtnColor':'#fff',
					'bgColor':'#426B59'
				},
				newfriends:[],
				hobby: ['哲学','艺术','电影','数码','文学','音乐','诗歌','装机','车友','码农','喜剧','美剧','摄影','番剧','美妆','穿搭','Steam','MOBA','主机','体育','宠物','综艺','旅游', '娱乐'],
			}
		},
		mounted(){
			this.init()
		},
		methods: {
			async init(){
				var user = uni.getStorageSync('user')
				const res1 = await this.$http.post('getUserInfo',{'user':user})
				var myHobby = res1.data.hobbyStr
				console.log(res1)
				const res2 = await this.$http.post('getNewFriends',{'hobbyStr':myHobby})
				var data = res2.data
				for(let j in data){
					let hobbyStr = data[j].hobbyStr.split(" ")
					for(let i in hobbyStr){
						hobbyStr[i] = parseInt(hobbyStr[i])
					}
					data[j].hobbyStr = hobbyStr
				}
				var newfriends = []
				const res3 = await this.$http.post('getFriendList',{'user':user})
				var oldfriends = res3.data
				for(let i in data){
					if(data[i].user!=user._id){
						let flag = false
						for(let j in oldfriends){
							if(data[i].user==oldfriends[j].user1||data[i].user==oldfriends[j].user2){
								flag = true;
							}
						}
						if(!flag)
							newfriends.push(data[i])
					}
				}
				this.newfriends = newfriends
				console.log(newfriends)
			},
			checkFriend(item){
				uni.navigateTo({
					url:'../apenfriend/apenfriend?user='+item.user
				})
				
			}
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
		.friendsList{
			margin: 0 auto;
			width: 90%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			// justify-content: space-around;
			.friend{
				width: 35%;
				height: 150px;
				background-color: $lighter;
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
				margin: 15px 4.4%;
				border-radius: 10px;
				padding: 10px;
				.avatarAndName{
					width: 100%;
					height: 60%;
					align-items: center;
					border-bottom: 1px solid #f3f3f3;
					overflow: hidden;
					.avatar{
						width: 40px;
						height: 40px;
						border-radius: 40px;
						// position: absolute;
						background-position: center;
						background-size: cover;
					}
					.name{
						font-family: 'shoujin';
						font-weight: bold;
						font-size: 1rem;
						border-left: 2px solid $primary2dark;
						height: 20px;
						line-height: 20px;
						margin-top: 5px;
						padding-left: 10px;
					}
				}
				.interestList{
					width: 100%;
					height: 100rpx;
					display: flex;
					padding-top: 10rpx;
					flex-wrap: wrap;
					overflow: hidden;
					.interest{
						font-family: 'shoujin';
						background-color: rgba($color: $primary1, $alpha: 1);
						// border: 1px solid $primary2dark;
						color: rgba($color: #fff, $alpha: 1);
						height: fit-content;
						font-size: 20rpx;
						font-weight: bold;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						width: 60rpx;
						// padding: 4rpx;
						border-radius: 10rpx;
						margin: 6rpx 8rpx;
						box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
						
						// padding: 5px;
						// border-radius: 500px;
					}
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
