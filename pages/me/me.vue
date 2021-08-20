<template>
	<view class="body">
		<view class="info animation-fade">
			<view class="avatar" v-bind:style="{'backgroundImage':'url(' + userinfo.avatar + ')'}">
				
			</view>
			<view class="name">
				{{userinfo.username}}
			</view>
		</view>
		<view class="functionBox animation-slide-bottom">
			<view class="functions">
				<view class="editInfo" @click="editInfo">
					编辑信息
				</view>
				<view class="Stamps" @click="Stamps">
					集邮册
				</view>
				<view class="aboutTheDeveloper" @click="aboutTheDeveloper">
					关于开发者
				</view>
			</view>

		<button class="logout" @click="logout">
			退出登录
		</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo:{
					avatar:'',
					username:'awdawd'
				}

			}
		},
		mounted(){
			
			this.init()
		},
		methods: {
			async init(){
				var user = uni.getStorageSync('user')
				const res = await this.$http.post('getUserInfo',{'user':user})
				// console.log(res)
				this.$set(this.userinfo,'avatar',res.data.avatar)
				this.$set(this.userinfo,'username',res.data.username)
				console.log(this.userinfo.avatar)
			},
			logout(){
				uni.setStorageSync('user','')
				uni.setStorageSync('usertoken','')
				uni.reLaunch({
					url:'../welcome/welcome'
				})
			},
			editInfo(){
				uni.navigateTo({
					url:'../editInfo/editInfo'
				})
			},
			Stamps(){
				uni.navigateTo({
					url:'../Stamps/Stamps'
				})
			},
			aboutTheDeveloper(){
				uni.navigateTo({
					url:'../aboutTheDeveloper/aboutTheDeveloper'
				})
			}
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
		background-color: rgba($color: $lighter, $alpha: 0.6);
		// padding-bottom: 49px;
		.info{
			width: 100%;
			height: 20vh;
			background-color: rgba($color: #fff, $alpha: 0);
			display: flex;
			align-items: center;
			padding-top: 20px;
			z-index: 999;
			.avatar{
				width: 50px;
				height: 50px;
				background-image: url(../../static/bgi4.jpg);
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
				margin-left: 5px;
				padding: 8px 5px 8px;
			}
		}
		.functionBox{
			border-radius: 30px;
			width: 100%;
			height: 80vh;
			background-color: $lighter;
			z-index: 999;
			position: relative;
			// padding-top: 20px;
			display: flex;
			justify-content: center;
			.functions{
				width: 90%;
				view{
					width: 100%;
					height: 60px;
					line-height: 20px;
					padding: 20px;
					font-size: 1.3rem;
					font-family: 'shoujin';
					font-weight: bolder;
					color: #333333;
					box-sizing: border-box;
					border-bottom-color: rgba($color: #999, $alpha: 0.1);
					border-bottom-width: 1px;
					border-bottom-style: solid;
				}
			}

			.logout{
				width:30vw;
				background-color: #D9242B;
				color: $lighter;
				font-family: 'shoujin';
				font-weight: bolder;
				font-size: 1rem;
				// margin-top: 60px;
				bottom: 150px;
				margin: 0 auto;
				position: absolute;
				
			}

		}


	}
	.body::after {
		content: "";
		background-image: url(../../static/bgi4.jpg);
		opacity: 0.5;
		background-color: $lighter;
		top: 0;
		background-size: 90%;
		left: 0;
		bottom: 0;
		right: 0;
		position: absolute;
		z-index: -1;   
	}
</style>
