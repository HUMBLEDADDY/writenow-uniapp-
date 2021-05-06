<template>
	<view class="body">
		<view class="slogon animation-scale-down">
			<view class="logo"></view>
			<view class="theSlogon">
				尺素重重<br/>封锦字
			</view>
		</view>
		<view class="mailbox">
			<view class="mailboxWord animation-fade">
				近期来信：
			</view>
			<view class="recentLetter">
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
					<letter  v-for="item in arriveLetter"  :letter="item" @click.native='read(item.id)' class="scroll-view-item_H animation-slide-right"></letter>
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
				arriveLetter:[],
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			read(id){
				console.log('ajdvjaw')
				uni.navigateTo({
					url:'../read/read?id='+id
				})
			},
			async init(){
				var user = uni.getStorageSync('user')._id
				const res = await this.$http.post('getRecent',{user:user})
				var recentLetter = res.data
				console.log(recentLetter)
				var recentLetterArrive = [];
				for(let i in recentLetter){
					if(this.checkTime(recentLetter[i].arriveTime)){
						recentLetterArrive.push(recentLetter[i])
					}
				}
				var arriveLetter = [];
				
				for(let i in recentLetterArrive){
					
						let res1 = await this.$http.post('getUserInfo',{user:recentLetterArrive[i].from})
						// console.log(res1)
						// console
						let name = res1.data.username
						let sendTime = recentLetterArrive[i].sendTime
						let content = recentLetterArrive[i].content
						let id = recentLetterArrive[i]._id
						let letter = {};
						letter.name = name;
						letter.sendTime = sendTime;
						letter.content = content
						letter.id = id
						arriveLetter.push(letter)
					
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
		overflow: hidden;

		.slogon{
			margin-top: 23vh;
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
				margin-left: 80rpx;
				
			}
			.theSlogon{
				position: relative;
				color: #333;
				font-family: 'shoujin1';
				writing-mode:vertical-lr;
				font-size: 1.5rem;
				font-weight: bolder;
				border-left: 2px solid $primary2dark;
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
					position: relative;
					display: inline-block;
					white-space: pre-wrap;
					margin: 20px;
				}
			}
		}
	}
	.body::after {
		content: "";
		// background-image: url(../../static/bgi4.jpg);
		// opacity: 0.1;
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
