<template>
	<view class="content">
		<mailbox :style="{height:windowHeight-49+'px'}" v-if="index === 0"/>
		<penfriend :style="{height:windowHeight-49+'px'}" v-if="index === 1"/>
		<me :style="{height:windowHeight-49+'px'}" v-if="index === 2"/>
		<!-- 底部导航 -->
		<foo-bar class="foo-bar" @toIndex="toIndex"></foo-bar>
	</view>
</template>

<script>
	import mailbox from  '../mailbox/mailbox.vue'
	import penfriend from  '../penfriend/penfriend.vue'
	import me from  '../me/me.vue'
	import fooBar from  '@/components/fooBar/fooBar.vue'
	export default {
		components:{
			mailbox,
			penfriend,
			me,
			fooBar
		},
		data() {
			return {
				windowHeight:'',
				index: 0,
				title: '首页',
				skeletonOff: false,
				a:0
			}
		},
		onLoad() {
			
				// 模拟延迟赋值
				uni.getSystemInfo({
					success:function(res){
						this.windowHeight = res.windowHeight
						console.log(this.windowHeight)
					}
				})
				this.tologin()
				console.log(this.windowHeight)
			},
		methods: {
			toIndex(index){
				// index 当前页面的索引
				this.index = index
				// 根据index判断页面
				// 修改自定义导航标题等
			},
			async tologin(){
				if(uni.getStorageSync('user')==''){
					uni.redirectTo({
						url: '../login/login'
					})
				}
				else{
					const res = await this.$http.post('getUserInfo',{user:uni.getStorageSync('user')._id})
					console.log(res)
					if(res.data==""){
						uni.redirectTo({
							url: '../editInfo/editInfo'
						})
					}
				}
	
			},
		}
	}
</script>

<style lang="scss">

</style>
