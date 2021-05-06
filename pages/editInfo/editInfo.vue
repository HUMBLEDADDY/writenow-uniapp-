<template>
	<view class="body">
		<bar :nav="setNav"></bar>
		<view class="userInfo">
			<uni-forms :rules="rules" class="userInfoForm" :value="formData" ref="form" validate-trigger="bind" err-show-type="undertext">
				<uni-group title="基本信息" class="animation-scale-up" top="0">
						<uni-forms-item @click="pickPicture" required name="avater" label="头像">
							<view class="add" v-bind:style="{'backgroundImage':'url(' + formData.avatar + ')'}" @click="pickPicture">
								<i v-if="formData.avatar==''" class="iconfont icon-plus-line text-white back-btn"/>
							</view>
						</uni-forms-item>
						<uni-forms-item required name="birth" label="生日">
							<uni-datetime-picker type="date" v-model="formData.birth" start="1945-06-01" :end="nowDate" return-type="timestamp"></uni-datetime-picker>
						</uni-forms-item>
						<uni-forms-item required name="sex" label="性别">
							<uni-data-checkbox v-model="formData.sex" :localdata="sex"></uni-data-checkbox>
						</uni-forms-item>
						<uni-forms-item required name="hobby" label="我的标签">
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
					username:'',
					user:{},
					avatar:'',
					sex: '',
					hobby: [],
					hobbyStr:'',
					birth: '',
					latitude: '',
					longitude:'',
					age:''
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
						text: '哲学',
						value: 0
					},
					{
						text: '艺术',
						value: 1
					},
					{
						text: '电影',
						value: 2
					},
					{
						text: '数码',
						value: 3
					},
					{
						text: '文学',
						value: 4
					},
					{
						text: '音乐',
						value: 5
					},
					{
						text: '诗歌',
						value: 6
					},
					{
						text: '装机',
						value: 7
					},
					{
						text: '车友',
						value: 8
					},
					{
						text: '码农',
						value: 9
					},
					{
						text: '喜剧',
						value: 10
					},
					{
						text: '美剧',
						value: 11
					},
					{
						text: '摄影',
						value: 12
					},
					{
						text: '番剧',
						value: 13
					},
					{
						text: '美妆',
						value: 14
					},
					{
						text: '穿搭',
						value: 15
					},
					{
						text: 'Steam',
						value: 16
					},
					{
						text: 'MOBA',
						value: 17
					},
					{
						text: '主机',
						value: 18
					},
					{
						text: '体育',
						value: 19
					},
					{
						text: '宠物',
						value: 20
					},
					{
						text: '综艺',
						value: 21
					},
					{
						text: '旅游',
						value: 22
					},
					{
						text: '娱乐',
						value: 23
					},
				],
				rules: {
					name: {
						rules: [
							{
								required: true,
								errorMessage: '请输入用户名'
							},
							{
								minLength: 3,
								maxLength: 15,
								errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符'
							}
						]
					},
					avatar: {
						rules: [
							{
								required: true,
								errorMessage: '请选择头像'
							}
						]
					},
					birth: {
						rules: [
							{
								required: true,
								errorMessage: '请选择生日'
							}
						]
					},
					sex: {
						rules: [
							{
								required: true,
								errorMessage: '请选择性别'
							},
							{
								format: 'string'
							}
						]
					},
					hobby: {
						rules: [
							{
								format: 'array'
							},
							{
								validateFunction: function(rule, value, data, callback) {
									if (value.length < 2) {
										callback('请至少勾选两个兴趣爱好')
									}
									return true
								}
							}
						]
					},
					latitude:{
						rules: [
						{
							required: true,
							errorMessage: '请获取定位信息'
						},
						]
					},
					longitude:{
						rules: [
						{
							required: true,
							errorMessage: '请获取定位信息'
						},
						]
					},
						
				}
			}
		},
		mounted(){
			this.getDate();
			this.init()
		},
		methods: {
			timestampToTime(timestamp) {
				if(timestamp.split('-').length<3){
			        var date = new Date(timestamp * 1);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			        var Y = date.getFullYear() + '-';
			        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			        var D = date.getDate() + ' ';
			        var h = date.getHours() + ':';
			        var m = date.getMinutes() + ':';
			        var s = date.getSeconds();
			        return Y+M+D;
					}
					else return timestamp
			    },
			async init(){
				var user = uni.getStorageSync('user')
				console.log(user.username)
				const res = await this.$http.post('getUserInfo',{'user':user})
				var hobbyStr = res.data.hobbyStr.split(" ")
				for(let i in hobbyStr){
					hobbyStr[i] = parseInt(hobbyStr[i])
				}
				console.log(user)
				this.$set(this.formData,'avatar',res.data.avatar)
				this.$set(this.formData,'latitude',res.data.latitude)
				this.$set(this.formData,'longitude',res.data.longitude)
				this.$set(this.formData,'birth',this.timestampToTime(res.data.birth))
				this.$set(this.formData,'hobby',hobbyStr)
				this.$set(this.formData,'sex',res.data.sex)
				console.log(this.formData)
				console.log(res.data)
				console.log(res.data.birth)
			},
			submit(){
				var user =  uni.getStorageSync('user')
				
				this.formData.age = this.GetAge(this.formData.birth)
				uni.navigateBack({
					
				})
			},

			getAge(birthday)
			{
			    //出生时间 毫秒
			    var birthDayTime = new Date(birthday).getTime(); 
			    //当前时间 毫秒
			    var nowTime = new Date().getTime(); 
			    //一年毫秒数(365 * 86400000 = 31536000000)
			    return Math.ceil((nowTime-birthDayTime)/31536000000);
			    },
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
						console.log(that.formData.latitude)
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
				uni.chooseImage({
					count:1,
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log(tempFilePaths);
				        uni.uploadFile({
				            url: 'http://124.71.228.65:3000/upload', //仅为示例，非真实的接口地址
				            filePath: tempFilePaths[0],
				            name: 'file',
				            header: {
								// 'Content-Type': 'multipart/form-data',
								Authorization: 'Bearer ' + uni.getStorageSync('usertoken')
							},
				            success: (uploadFileRes) => {
				                console.log(typeof(uploadFileRes.data));
								var data = uploadFileRes.data
								// console.log(JSON.parse(data));
								// this.change('avatar',uploadFileRes.data.url)
								// this.formData.avatar = JSON.parse(uploadFileRes.data).url
								let url = JSON.parse(data).url.split('http://localhost:3000').pop()
								console.log(url)
								this.$set(this.formData,'avatar','http://124.71.228.65:3000'+url);
								console.log(this.formData.avatar)
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
					.then(async res => {
						console.log('表单的值：', res)
						if(this.formData.avatar == ''){
							uni.showToast({
								icon: 'none',
							    title: '请选择头像',
							    duration: 2000
							});
						}
						else{
							if(this.formData.latitude == ''){
								uni.showToast({
									icon: 'none',
								    title: '请获取定位信息',
								    duration: 2000
								});
							}
							else{
								var userInfo = uni.getStorageSync("user")
								this.formData.user = userInfo
								console.log(userInfo)
								this.formData.username = userInfo.username
								this.formData.hobbyStr = this.formData.hobby.join(" ")
								console.log(this.formData.hobbyStr)
								console.log(this.getAge(this.formData.birth))
								this.formData.age = this.getAge(this.formData.birth)
								console.log(this.formData)
								const res = await this.$http.post('updateUserInfo',this.formData)
								// console.log(res)
								uni.redirectTo({
									url:'../index/index'
								})
							}
						}
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
		// background-color: #fff;
		border: 1px solid $light;
		border-radius: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-position: center;
		background-size: cover;
	}
	.body{
		width: 100%;
		height: 100vh;
		padding-top: 30px;
		overflow: hidden;
		box-sizing: border-box;
		background-color: rgba($color: $lighter, $alpha: 0.8);
		// padding-bottom: 49px;
		.userInfo{
			background-color: rgba($color: $lighter, $alpha: 0)!important;
			.userInfoForm{
				background-color: rgba($color: $lighter, $alpha: 0)!important;
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
		color: $primary1;
		font-weight: bold;
		font-size: 1rem;
	}
	.submit{
		width: 30%;
		background-color: $primary1;
		color: $white;
	}
</style>
