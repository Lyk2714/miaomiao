<template>
	<div class="movie_body">
		<Loading v-if="isShow"></Loading>
		<Scroller v-else>
			<ul>
				<li v-for="item in comingList" :key="item.id">
					<div class="pic_show" @tap="handleToDetail(item.id)">
						<img :src="item.img | setWH('128.180')" />
					</div>
					<div class="info_list">
						<h2 @tap="handleToDetail(item.id)">
							{{item.nm}}
							<img v-if="item.version == v3D" src="@/assets/3D IMAX.png" />
							<img v-else-if="item.version == v2D" src="@/assets/2D IMAX.png" />
						</h2>
						<p>
							<span class="person">{{item.wish}}</span> 人想看
						</p>
						<p>{{item.star}}</p>
						<p>{{item.rt}}上映</p>
					</div>
					<div class="btn_pre">预售</div>
				</li>
			</ul>
		</Scroller>
	</div>
</template>

<script>
	export default {
		name: "ComingSoon",
		data() {
			return {
				comingList: [],
				v3D: "v3d imax",
				v2D: "v2d imax",
				isShow: true,
				prevCityId: ''
			};
		},
		activated() {
			var cityId =  this.$store.state.city.id;
			if(cityId === this.prevCityId){return};
			this.isShow = true;
			this.axios.get("/ajax/comingList?ci="+cityId+"&token=&limit=10").then((res) => {
				var msg = res.data;
				if (msg) {
					this.isShow = false;
					this.comingList = res.data.coming;
					this.prevCityId = cityId;
				}
			});
		},
		methods:{
			handleToDetail(movieId){
				this.$router.push('/movie/detail/2/'+ movieId);
			}
		}
	};
</script>

<style scoped>
	#content .movie_body {
		flex: 1;
		overflow: auto;
	}
	.movie_body ul {
		margin: 0 12px;
		overflow: hidden;
	}
	.movie_body ul li {
		margin-top: 12px;
		display: flex;
		align-items: center;
		border-bottom: 1px #e6e6e6 solid;
		padding-bottom: 10px;
	}
	.movie_body .pic_show {
		width: 64px;
		height: 90px;
	}
	.movie_body .pic_show img {
		width: 100%;
	}
	.movie_body .info_list {
		margin-left: 10px;
		flex: 1;
		position: relative;
	}
	.movie_body .info_list h2 {
		font-size: 17px;
		line-height: 24px;
		width: 150px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
	}
	.movie_body .info_list p {
		font-size: 13px;
		color: #666;
		line-height: 22px;
		width: 200px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	/* .movie_body .info_list .grade {
			font-weight: 700;
			color: #faaf00;
			font-size: 15px;
		} */
	.movie_body .info_list img {
		width: 50px;
		/* position: absolute;
			right: 10px;
			top: 5px; */
		margin: 0px 0px 0px 5px;
	}
	.movie_body .btn_mall,
	.movie_body .btn_pre {
		width: 47px;
		height: 27px;
		line-height: 28px;
		text-align: center;
		background-color: #f03d37;
		color: #fff;
		border-radius: 4px;
		font-size: 12px;
		cursor: pointer;
	}
	.movie_body .btn_pre {
		background-color: #3c9fe6;
	}
</style>