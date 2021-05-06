<template>
	<view class="body">
		<view class="friendsList">
			<uni-section 
			class="animation-fade"
			    title="笔友"
			    type="line"
			></uni-section>
			<uni-swipe-action class="animation-slide-right">
				<scroll-view :scroll-top="scrollTop" scroll-y="true"  class="scroll-Y">
					<uni-swipe-action-item v-for="(item,index) in friendList" class="friend">
						<view class="content-box" @click="checkfriend(item)">
							<view class="avatar" v-bind:style="{'backgroundImage':'url(' + item.avatar + ')'}"></view>
							<view class="name">
								{{item.username}}
							</view>
						</view>
						<template v-slot:right>
							<view class="function">
								<view class="slot-button delete"  @click="deletefriends(item,index)"><text class="slot-button-text">删除</text></view>
							</view>
						</template>
					</uni-swipe-action-item>
				</scroll-view>
			</uni-swipe-action>
		</view>
		<view class="add animation-roundin" @click="findFriend" type="primary">
			<i class="iconfont icon-plus-line addIcon"/>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				show: false,
				isOpened: 'none',
				options: [{
						text: '置顶',
						style: {
							backgroundColor: '#426B59'
						}
					},
					{
							text: '写信',
							style: {
								backgroundColor: '#DCA04B'
							}
						},
					{
						text: '删除',
						style: {
							backgroundColor: '#cb4042'
						}
					}
				],
				swipeList: [],
				friendList:[]
			};
		},
		mounted(){
			this.getFrinendList()
		},
		onReady() {
			// 模拟延迟赋值
			},
		methods: {
			findFriend(){
				uni.navigateTo({
					url:'../findNewFriend/findNewFriend'
				})
			},
			async getFrinendList(){
				var user = uni.getStorageSync('user')
				console.log(user)
				const friendList = await this.$http.post('getFriendList',{user:user})
				var listData = friendList.data;
				var Data = []
				for(let i in listData){
					let friendId = listData[i].user1
					if(listData[i].user1==user._id){
						friendId = listData[i].user2
					}
					let friendInfo = await this.$http.post('getUserInfo',{user:friendId})
					Data.push(friendInfo.data)
				}
				console.log(Data)
				this.friendList = Data
				// console.log(friendList)
			},
			checkfriend(item){
				console.log(item)
				uni.navigateTo({
					url:'../apenfriend/apenfriend?user='+item.user
				})
			},
			async deletefriends(item,index){
				// event.stopPropagation()
				var user = uni.getStorageSync('user')._id
				var friend = item.user;
				const deletefriends = await this.$http.post('deleteFriend',{friend:friend,user:user})
				this.getFrinendList()
			}
		}
	};
</script>

<style lang="scss" scoped>
	.body{
		width: 100%;
		height: 100vh;
		padding-top: 30px;
		overflow: hidden;
		box-sizing: border-box;
		background-color: rgba($color: $lighter, $alpha: 0.8);
		// padding-bottom: 49px;
	}
	.friendsList{
		background-color: rgba($color: $lighter, $alpha: 0.6);
	}
	.friend{
		border-bottom-color: #efefef;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}
	.content-box {
		flex: 1;
		align-items: center;
		// justify-content: center;
		display: flex;
		height: 60px;
		line-height: 60px;
		padding: 0 15px;
		position: relative;

	}
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
		color: #333;
		margin-left: 10px;
		font-size: 1.2rem;
	}
	.content-text {
		font-size: 15px;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding: 10px 0;
		background-color: #fff;
	}

	.button {
		border-color: #e5e5e5;
		border-style: solid;
		border-width: 1px;
		
		padding: 4px 8px;
		border-radius: 4px;
	}

	.button-text {
		font-size: 15px;
	}
	
	.function{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.slot-button {
		display: flex;
		height: 100%;
		width: 50px;
		height: 50px;
		border-radius: 44px;
		flex: 1;
		margin: 0 5px;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: center;
		word-wrap: rl;
		background-color: #D9242B;
	}
	.up{
		background-color: $primary1;
	}
	.slot-button-text {
		writing-mode:tb-rl;
		color: #ffffff;
		font-size: 14px;
		font-family: 'shoujin';
		// font-size: 1rem;
		// font-weight: bold;
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
		bottom: 100px;
		right: 20px;
	}
	.addIcon{
		color: $lighter;
		font-size: 1.5rem;
		font-weight: 900;
	}
	.body::after {
		content: "";
		background-image: url(../../static/bgi4r.jpg);
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
	.scroll-Y {
		height: 100vh;
		padding-bottom: 49px;
		// margin-bottom: ;
	}
	
</style>
