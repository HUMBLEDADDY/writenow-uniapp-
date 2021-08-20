<template>
	<view class="body">
		<view class="titleWord animation-slide-left">
			<text class="loginWord ">登录</text>
		</view>
		<view class="loginPart animation-slide-bottom">
			<view class="input">
				<input
				 class="inputElement id" 
				 v-model="userInfo.username" 
				 placeholder="请输入账号"
				/>
				<input
				 class="inputElement" 
				 v-model="userInfo.password" 
				 type="password" 
				 placeholder="请输入密码"
				/>
			</view>
			<view class="functions">
				<button class="login" @click="login" type="primary" block>登录</button>
				<text class="enroll" @click="enroll">没有账号，前去注册</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				userInfo:{
						username:'',
						password:''
					}
			}
		},
		methods: {
			async login(){
				const res = await this.$http.post('login',this.userInfo).catch(error=>{
					if (error.response.status == 421){
						uni.showToast({
							icon: 'none',
							title: '用户不存在',
							duration: 2000
						});
					}
					if (error.response.status == 422){
						uni.showToast({
							icon: 'none',
							title: '密码错误',
							duration: 2000
						});
					}
				})
				console.log(res)
				if(res.data){
					uni.setStorageSync('usertoken',res.data.token)
					uni.setStorageSync('user',res.data.user)
					console.log(uni.getStorageSync('user'))
					uni.redirectTo({
						url:'../index/index'
					})
				}
				else{
					uni.showToast({
						icon: 'none',
					    title: '网络错误，请稍后再试',
					    duration: 2000
					});
				}
			}
			enroll(){
				uni.redirectTo({
					url:'../enroll/enroll'
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
.body{
	height: 100vh;
	overflow: hidden;
	background-color: rgba($color: $lighter, $alpha: 0.6);
	z-index: 0;
	.titleWord{
		margin-top: 80rpx;
		writing-mode:tb-rl;
		border-left: 20rpx solid $primary1;
		padding: 10rpx 0;
		.loginWord{
			font-family: 'shoujin';
			font-size: 3rem;
			color: $primary2dark;
			display: block;
		}
	}
	.loginPart{
		width: 80%;
		margin: 200rpx auto;
		.input{
			border-radius: 20rpx;
			overflow: hidden;
			background-color: #fff;
			.inputElement{
				margin: 0 auto;
				width: 80%;
				font-family: 'shoujin';
				font-size: 1.3rem;
				font-weight: bolder;
				height: 130rpx;
				line-height: 100rpx;
				background-color: #fff;
			}
			.id{
				border-bottom: 1px solid $light;
			}
		}
		.functions{
			margin-top: 50px;
			.login{
				width: 60%;
				margin: 90px auto 0;
				border-radius: 5px;
				font-size: 1.3rem;
				font-family: 'shoujin';
				font-weight: bold;
				color: $primary2dark;
				padding: 0rpx;
				background-color: rgba($color: $primary1, $alpha: 1);
			}
			.enroll{
				display: block;
				width: 100%;
				text-align: center;
				font-family: 'shoujin';
				text-decoration: underline;
				margin-top: 10rpx;
				font-weight: 1000;
				color: #646464;
			}
		}
	}
}
.body::after {
	content: "";
	background-image: url(../../static/bgi.jpg);
	opacity: 0.1;
	top: 0;
	background-size: cover;
	left: 0;
	bottom: 0;
	right: 0;
	position: absolute;
	z-index: -1;
}
</style>
