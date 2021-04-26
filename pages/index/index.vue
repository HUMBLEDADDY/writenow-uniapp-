<template>
	<view class="content">
		<mailbox v-if="index === 0"/>
		<penfriend v-if="index === 1"/>
		<me v-if="index === 2"/>
		<!-- 底部导航 -->
		<foo-bar @toIndex="toIndex"></foo-bar>
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
				index: 0,
				title: '首页',
				skeletonOff: false,
			}
		},
		methods: {
			toIndex(index){
				// index 当前页面的索引
				this.index = index
				// 根据index判断页面
				// 修改自定义导航标题等
			},

		}
	}
</script>

<style lang="scss">

</style>
