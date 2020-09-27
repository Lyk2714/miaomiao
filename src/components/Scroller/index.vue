<template>
	<div class="wrapper" ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from "better-scroll";

	export default {
		name: "Scroller",
		props: {
			handleToScroll: {
				type: Function,
				default: function () {},
			},
			handleToTouchEnd: {
				type: Function,
				default: function () {},
			},
		},
		mounted() {
			// console.log(this.scroll);
			setTimeout(() => {
					var BS = new BScroll(this.$refs.wrapper, {
						tap: 'tap' ,
						click: true,
						probeType: 1
					});
					this.BS = BS;
					BS.on("scroll", (pos) => {
						// console.log(pos);
						this.handleToScroll(pos);
					});
					BS.on("touchEnd", (pos) => {
						this.handleToTouchEnd(pos);
					});
			}, 300);
			// this.$nextTick(() => {});
		},
		methods: {
			toScrollTop(y) {
				this.BS.scrollTo(0, y);
			},
			refsresh(){
				this.Bs.refsresh();
			}
		},
		
	};
</script>

<style scoped>
	.wrapper {
		height: 100%;
		/* overflow: hidden; */
	}
</style>