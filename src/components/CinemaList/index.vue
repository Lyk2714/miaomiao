<template>
	<div class="cinema_body">
		<Loading v-if="isShow"></Loading>
		<Scroller v-else>
			<ul>
				<li v-for="item in cinemaList" :key="item.id">
					<div>
						<span>{{item.nm}}</span>
						<span class="q">
							<span class="price">{{item.sellPrice}}</span> 元起
						</span>
					</div>
					<div class="address">
						<span>{{item.addr}}</span>
						<span>{{item.distance}}</span>
					</div>
					<div class="card">
						<div
							v-for="(card,key) in item.tag"
							v-if="card === 1"
							:key="key"
							:class="key | classCard"
						>{{key | formatCard}}</div>
					</div>
				</li>
			</ul>
		</Scroller>
	</div>
</template>

<script>
	export default {
		name: "CinemaList",
		data() {
			return {
				cinemaList: [],
				isShow: true,
				prevCityId: ''
			};
		},
		activated() {
			var cityId =  this.$store.state.city.id;
			if(cityId === this.prevCityId){return};
			this.isShow = true;
			this.axios.get("/ajax/cinemaList?cityId="+cityId+"&limit=").then((res) => {
				console.log(res.data);
				var msg = res.data
				if(msg){
					this.isShow = false;
					this.cinemaList = msg.cinemas;
					this.prevCityId = cityId;
				}
			});
		},
		computed: {
			cardMessage(val) {
				return val;
				console.log(val);
			},
		},
		filters: {
			formatCard(key) {
				var cards = [
					{ key: "allowRefund", value: "退" },
					{ key: "buyout", value: "" },
					{ key: "cityCardTag", value: "" },
					{ key: "deal", value: "" },
					{ key: "endorse", value: "改签" },
					{ key: "giftTag", value: "" },
					{ key: "hallType", value: "" },
					{ key: "hallTypeVOList", value: "" },
					{ key: "sell", value: "折扣" },
					{ key: "snack", value: "小吃" },
					{ key: "vipTag", value: "折扣卡" },
				];
				for (var i = 0; i < cards.length; i++) {
					if (cards[i].key === key) {
						return cards[i].value;
					}
				}
				return "";
			},
			classCard(key) {
				var cards = [
					{ key: "allowRefund", value: "bl" },
					{ key: "buyout", value: "" },
					{ key: "cityCardTag", value: "" },
					{ key: "deal", value: "" },
					{ key: "endorse", value: "bl" },
					{ key: "giftTag", value: "" },
					{ key: "hallType", value: "" },
					{ key: "hallTypeVOList", value: "" },
					{ key: "sell", value: "or" },
					{ key: "snack", value: "or" },
					{ key: "vipTag", value: "" },
				];
				for (var i = 0; i < cards.length; i++) {
					if (cards[i].key === key) {
						return cards[i].value;
					}
				}
				return "";
			},
		},
	};
</script>

<style>
	#content .cinema_body {
		flex: 1;
		overflow: auto;
	}
	.cinema_body ul {
		padding: 20px;
	}
	.cinema_body li {
		border-bottom: 1px solid #e6e6e6;
		margin-bottom: 20px;
	}
	.cinema_body div {
		margin-bottom: 10px;
	}
	.cinema_body .q {
		font-size: 11px;
		color: #f03d37;
	}
	.cinema_body .price {
		font-size: 18px;
	}
	.cinema_body .address {
		font-size: 13px;
		color: #666;
	}
	.cinema_body .address span:nth-of-type(2) {
		float: right;
	}
	.cinema_body .card {
		display: flex;
	}
	.cinema_body .card div {
		padding: 0 3px;
		height: 15px;
		line-height: 15px;
		border-radius: 2px;
		color: #f90;
		border: 1px solid #f90;
		font-size: 13px;
		margin-right: 5px;
	}
	.cinema_body .card div.or {
		color: #f90;
		border: 1px solid #f90;
	}
	.cinema_body .card div.bl {
		color: #589daf;
		border: 1px solid #589daf;
	}
</style>