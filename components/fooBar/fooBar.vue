<template>
	<view class="bottom">
		<view class="nav-box">
			<view class="nav-tab" :class="{'nav-tab-active':home===0}" @click="toIndex(0)">
				<view class="nav-icon">
					<view class="circle">
						<i class="iconfont icon-youjian" />
					</view>
				</view>
				<view class="nav-text">
					邮箱
				</view>
			</view>
			<view class="nav-tab" :class="{'nav-tab-active':home===1}" @click="toIndex(1)">
				<view class="nav-icon" >
					<view class="circle">
						<i class="iconfont icon-xinxi" />
					</view>
				</view>
				<view class="nav-text">
					笔友
				</view>
			</view>
			<view class="nav-tab" :class="{'nav-tab-active':home===2}" @click="toIndex(2)">
				<view class="nav-icon" >
					<view class="circle">
						<i class="iconfont icon-aixin" />
					</view>
				</view>
				<view class="nav-text">
					我的
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				home: 0,
			}
		},
		onLoad() {

		},
		methods: {
			toPage(url) {
				uni.navigateTo({
					url
				})
			},
			toIndex(index) {
	
					this.$emit('toIndex', index)
					this.home = index
				

			}
		}
	}
</script>

<style scoped lang="scss">
	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: $navHeight;
		box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.06);
		background: #fffffb;
		z-index: 9999999990;
	}

	.nav-tab {
		fiex: 1;
		text-align: center;
		width: 100%;
		height: $navHeight;
	}

	.nav-icon {
		height: 30px;
		color: $mediumGrey;
		box-sizing:border-box;
		padding: 4px 0 2px 0;
	}
	
	.nav-icon .circle {
		height: 38px;
		width: 38px;
		line-height: 38px;
		position: relative;
		top: -7px;
		left: calc(50% - 19px);
		border-radius: 50%;
		// background: $dominantHue;
		// box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
		transition: 0.5s;
	}

	.nav-icon .iconfont {
		font-size: 20px;
		transition: 0.5s;
	}

	.nav-text {
		font-size: 11px;
		height: 19px;
		color: $mediumGrey;
		font-weight: 400;
		font-family: 'shoujin';
		font-weight: bold;
		font-size: 1rem;
	}

	.nav-tab-active .circle {
		height: 38px;
		width: 38px;
		line-height: 38px;
		position: relative;
		top: -14px;
		left: calc(50% - 19px);
		border-radius: 50%;
		background: $dominantHue;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
		transition: 0.5s;

	}

	.nav-tab-active .iconfont {
		font-size: 20px;
		color: $white;
		transition: 0.5s;
	}

	.nav-tab-active .nav-text{
		color: $dark;
		font-family: 'shoujin';
		transition: 0.5s;
	}
	.nav-box{
		/* position: absolute; */
		display: flex;
		width: 100%;
		box-sizing:border-box;
	}

	/*苹果x适配 H5APP*/
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		.bottom {
			height: $navHeight + $navBoxHeight;
		}
	}

	/*苹果xs适配 H5APP*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		.bottom {
			height: $navHeight + $navBoxHeight;
		}
	}

	/*苹果xr适配 H5APP*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		.bottom {
			height: $navHeight + $navBoxHeight;
		}
	}
	
</style>