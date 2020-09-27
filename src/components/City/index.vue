<template>
	<div class="city_body">
		<Loading v-if="isShow"></Loading>
		<div class="city_list" v-else>
			<Scroller ref="city_List">
				<div>
					<!-- <div class="city_hot">
						<h2>热门城市</h2>
						<ul class="clearfix">
							<li>上海</li>
						</ul>
					</div> -->
					<div class="city_sort" ref="city_sort">
						<div v-for="item in cityList" :key="item.index">
							<h2>{{item.index}}</h2>
							<ul>
								<li v-for="li in item.list" :key="li.id" @tap="handleToCity(li.nm,li.id)">{{li.nm}}</li>
							</ul>
						</div>
					</div>
				</div>
			</Scroller>
		</div>
		<div class="city_index">
			<ul>
				<li
					v-for="(list,index) in cityList"
					:key="list.index"
					@touchstart="handleToIndex(index)"
				>{{list.index}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: "City",
		data() {
			return {
				cityList: [],
				isShow: true,
			};
		},
		mounted() {
			var ctList = window.localStorage.getItem("cityList");
			if (ctList) {
				this.cityList = JSON.parse(ctList);
				this.isShow = false;
			} else {
				this.axios.get("/dianying/cities.json").then((res) => {
					console.log(res);
					var cities = res.data.cts;
					if (cities) {
						this.isShow = false;
						var cityList = this.formatCityList(cities);
						this.cityList = cityList;
						window.localStorage.setItem(
							"cityList",
							JSON.stringify(cityList)
						);
					}
				});
			}
		},
		methods: {
			formatCityList(cities) {
				var cityList = []; //[{index:A,list:{nm:安徽,id:xxx,py:anhui}}]

				for (var i = 0; i < cities.length; i++) {
					//拿到首字母
					var firstLetter = cities[i].py.substring(0, 1).toUpperCase();
					//判断cityList里是否存在
					if (etm(firstLetter)) {
						//不存在则创建，并把数据添加进去
						cityList.push({
							index: firstLetter,
							list: [
								{
									nm: cities[i].nm,
									py: cities[i].py,
									id: cities[i].id,
								},
							],
						});
					} else {
						//如果存在，就把数据push进去
						for (var j = 0; j < cityList.length; j++) {
							if (cityList[j].index === firstLetter) {
								cityList[j].list.push({
									nm: cities[i].nm,
									py: cities[i].py,
									id: cities[i].id,
								});
							}
						}
					}
				}
				//排序 从A到Z
				cityList.sort((n1, n2) => {
					if (n1.index > n2.index) {
						return 1;
					} else if (n1.index < n2.index) {
						return -1;
					} else {
						return 0;
					}
				});
				// console.log(cityList);
				return cityList;

				//判断首字母是否在cityList里的函数
				function etm(data) {
					for (var i = 0; i < cityList.length; i++) {
						if (cityList[i].index === data) {
							return false;
						}
					}
					return true;
				}
			},
			handleToIndex(index) {
				var H2 = this.$refs.city_sort.getElementsByTagName("h2");
				this.$refs.city_List.toScrollTop(-H2[index].offsetTop);
			},
			handleToCity(nm, id) {
				this.$store.commit("city/CITY_INFO", { nm, id });
				window.localStorage.setItem('nowNm',nm);
				window.localStorage.setItem('nowId',id);
				this.$router.push('/movie/nowPlaying');
			},
		},
	};
</script>

<style>
	#content .city_body {
		margin-top: 45px;
		display: flex;
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
	}
	.city_body .city_list {
		flex: 1;
		overflow: auto;
		background: #fff5f0;
	}
	.city_body .city_list::-webkit-scrollbar {
		background-color: transparent;
		width: 0;
	}
	.city_body .city_hot {
		margin-top: 20px;
	}
	.city_body .city_hot h2 {
		padding-left: 15px;
		line-height: 30px;
		font-size: 14px;
		background: #f0f0f0;
		font-weight: normal;
	}

	.city_body .city_hot ul li {
		float: left;
		background: #fff;
		width: 29%;
		height: 33px;
		margin-top: 15px;
		margin-left: 3%;
		padding: 0 4px;
		border: 1px solid #e6e6e6;
		border-radius: 3px;
		line-height: 33px;
		text-align: center;
		box-sizing: border-box;
	}

	.city_body .city_sort div {
		margin-top: 20px;
	}
	.city_body .city_sort h2 {
		padding-left: 15px;
		line-height: 30px;
		font-size: 14px;
		background: #f0f0f0;
		font-weight: normal;
	}
	.city_body .city_sort ul {
		padding-left: 10px;
		margin-top: 10px;
	}
	.city_body .city_sort ul li {
		line-height: 30px;
		line-height: 30px;
	}
	.city_body .city_index {
		width: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		border-left: 1px #e6e6e6 solid;
	}
</style>