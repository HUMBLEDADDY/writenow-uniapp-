<template>
	<view class="body">
		<bar :nav="setNav"></bar>
		<view class="userInfo">
			<uni-forms class="userInfoForm" :value="formData" ref="form" validate-trigger="bind" err-show-type="undertext">
				<uni-group title="基本信息" class="animation-scale-up" top="0">
						<uni-forms-item @click="pickPicture" required name="avater" label="头像">
							<view class="add" @click="pickPicture">
								<i class="iconfont icon-plus-line text-white back-btn"/>
							</view>
						</uni-forms-item>
						<uni-forms-item required name="birth" label="生日">
							<uni-datetime-picker type="date" v-model="formData.birth" start="1945-06-01" :end="nowDate" return-type="timestamp"></uni-datetime-picker>
						</uni-forms-item>
						<uni-forms-item required name="sex" label="性别">
							<uni-data-checkbox v-model="formData.sex" :localdata="sex"></uni-data-checkbox>
						</uni-forms-item>
						<uni-forms-item required name="hobby" label="兴趣爱好">
							<uni-data-checkbox mode="tag" multiple v-model="formData.hobby" :localdata="hobby" />
						</uni-forms-item>
						<uni-forms-item class="location" required name="location" label="位置信息">
							<button class="getLocation" @click="getLocation">获取定位信息</button>
							<view class="latitudeAndLongtitude" v-if="formData.longitude!=''">
								<text class="longtitude">经度：{{formData.longitude}}</text>
								<text class="latitude">纬度：{{formData.latitude}}</text>
							</view>
						</uni-forms-item>
						<button class="submit" @click="submitForm('form')">提交</button>
				</uni-group>
			</uni-forms>
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
					'navTitle':'匹配设置' ,//导航标题
					'backBtnColor':'#fff',
					'bgColor':'#426B59'
				},
				nowDate:'2021-06-01',
				formData: {
					sex: '',
					hobby: [],
					birth: '',
					latitude: '',
					longitude:''
				},
				longitude:'',
				latitude:'',
				message:'',
				sex: [
					{
						text: '男',
						value: '0'
					},
					{
						text: '女',
						value: '1'
					},
					{
						text: '未知',
						value: '2'
					}
				],
				hobby: [
					{
						text: '足球',
						value: 0
					},
					{
						text: '篮球',
						value: 1
					},
					{
						text: '游泳',
						value: 2
					}
				],
			}
		},
		mounted(){
			this.getDate();
		},
		methods: {
			getDate() {
				// 获取当前日期
				var date = new Date();
				
				// 获取当前月份
				var nowMonth = date.getMonth() + 1;
				
				// 获取当前是几号
				var strDate = date.getDate();
				
				// 添加分隔符“-”
				var seperator = "-";
				
				
				// 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
				var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
				this.nowDate = nowDate;
			},
			getLocation(){
				var that =this
				uni.getLocation({
				    type: 'gcj02',
					
				    success: function (res) {

				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
						let longitude = res.longitude;
						let latitude = res.latitude;					
						that.$set(that.formData,'longitude',longitude);
						that.$set(that.formData,'latitude',latitude);
						that.$forceUpdate();
						console.log(that.formData.latitude)
						// this.$refs.popupDialog.open()
				    }
				});
			},
			birthChange(e) {
				console.log(e)
			},
			change(name, value) {
				this.formData.checked = value
				this.$refs.form.setValue(name, value)
			},
			pickPicture(){
				console.log('jhgjh')
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
				            filePath: tempFilePaths[0],
				            name: 'file',
				            formData: {
				                'user': 'test'
				            },
				            success: (uploadFileRes) => {
				                console.log(uploadFileRes.data);
				            }
				        });
				    }
				});
			},
			/**
			 * 手动提交
			 * @param {Object} form
			 */
			submitForm(form) {
				// console.log(this.formData);
				this.$refs[form]
					.submit()
					.then(res => {
						console.log('表单的值：', res)
						uni.showToast({
							title: '验证成功'
						})
					})
					.catch(errors => {
						console.error('验证失败：', errors)
					})
			},
			
			/**
			 * 手动重置表单
			 */
			resetForm() {
				this.$refs.form.resetFields()
			},
			/**
			 * 部分表单校验
			 * @param {Object} form
			 */
			validateField(form) {
				this.$refs[form]
					.validateField(['name', 'email'])
					.then(res => {
						uni.showToast({
							title: '验证成功'
						})
						console.log('表单的值：', res)
					})
					.catch(errors => {
						console.error('验证失败：', errors)
					})
			},
			
			/**
			 * 清除表单校验
			 * @param {Object} form
			 * @param {Object} name
			 */
			clearValidate(form, name) {
				if (!name) name = []
				this.$refs[form].clearValidate(name)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.add{
		width: 80rpx;
		height: 80rpx;
		float: left;
		background-color: #fff;
		border: 1px solid $light;
		border-radius: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.body{
		height: 100vh;
		overflow: hidden;
		z-index: 0;
		.userInfo{
			background-color: rgba($color: #fff, $alpha: 0.4)!important;
			.userInfoForm{
				background-color: rgba($color: #fff, $alpha: 0.4)!important;
			}
		}
	}
	*{
		font-family: 'shoujin' ;
		// font-size: 1.4rem;
		font-weight: bold;
	}
	.body::after {
		content: "";
		background-image: url(../../static/bgi5.jpg);
		background-position: center;
		opacity: 0.3;
		top: 0;
		background-size: cover;
		left: 0;
		bottom: 0;
		right: 0;
		position: absolute;
		z-index: -1;
	}
	.uni-datetime-picker-popup {
		background-color: $primary1!important;
	}
	.location{}
	.getLocation{
		width: 50%;
		height: 40px;
		line-height: 40px;
		font-size: 1rem;
		float: left;
	}
	.latitudeAndLongtitude{
		float: right;
		display: flex;
		margin-top: 10rpx;
		flex-direction: column;
		font-family: 'shoujin';
		color: $primary2dark;
		font-weight: bold;
		font-size: 1rem;
	}
	.submit{
		width: 30%;
		background-color: $primary1;
		color: $white;
	}
</style>
