<template>
	<view class="body">
		<view class="titleWord animation-slide-left">
			<text class="loginWord">注册</text>
		</view>
		<view class="loginPart animation-slide-bottom">
			<view class="input">
				<input
				 class="inputElement id" 
				 v-model="userInfo.id" 
				 placeholder="请输入账号" 
				/>
				<input
				 class="inputElement password" 
				 v-model="userInfo.password" 
				 type="password" 
				 placeholder="请输入密码"
				/>
				<input
				 class="inputElement" 
	             maxlength="25"
				 v-model="userInfo.email"
				 placeholder="请输入邮箱ID"
				 :formatter="formatter"
				 :error-message="errorText"       
				/>
			</view>
			<view class="functions">
				<button class="enroll" type="primary" block>注册</button>
				<text class="login">已有账号，前去登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{
						id:'',
						password:'',
						email:''
					},
					errorText:''
			}
		},
		methods: {
			formatter(val) {
				const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
				if (!val) return '';
				if (!reg.test(val)) {
					this.errorText = '请输入正确的邮箱';
				}
				else {
					this.errorText = '';
				}
				return val;
			},
		}
	}
</script>

<style lang="scss" scoped>
.body{
	height: 100vh;
	overflow: hidden;
	z-index: 0;
	.titleWord{
		margin-top: 50rpx;
		writing-mode:tb-rl;
		border-left: 20rpx solid $primary1;
		// background-color: $primary1;
		// padding: 10rpx;
		// box-shadow: 5px 5px 10px #939393;
		.loginWord{
			font-family: 'shoujin';
			font-size: 3rem;
			color: $primary2dark;
			// font-weight: bold;
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
			.id,.password{
				border-bottom: 1px solid $light;
			}
		}
		.functions{
			margin-top: 50px;
			.enroll{
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
			.login{
				display: block;
				width: 100%;
				text-align: center;
				font-family: 'shoujin';
				text-decoration: underline;
				margin-top: 20rpx;
				font-weight: 1000;
				color: #000000;
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
