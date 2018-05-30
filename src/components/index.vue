<template>
    <div class="main">
        <div class="page-tab">
            <div 
                :class="nowPath == item.path ? 'tab-item tab-item_active' : 'tab-item'"
                v-for='(item, index) in tabList'
                :key="index">
                <router-link 
                    mode="out-in"
                    :to="item.path">{{item.name}}
                </router-link>
            </div>        
        </div>
        <transition :name="slideDirection">
            <slot>
            </slot> 
        </transition>
    </div>
</template>

<script>

export default {
    props: {
        tabList: Array
    },
    mounted() {
        this.nowPath = this.$route.path;
        this.initTouchedEvent();
    },
    data() {
        return {
            tabSwiper: {},
            slideDirection: 'slideforward',
            nowPath: '',
            startX: '',
            startY:''
        };
    },
    methods: {
        touchedstartHandler(e) {
            this.startX = e.changedTouches[0].pageX;
            this.startY = e.changedTouches[0].pageY;
        },
        touchendHandler(e) {
            let direction = this.startX - e.changedTouches[0].pageX;
            let directionY = this.startY - e.changedTouches[0].pageY;
            
            let nowRouteIndex = 0;
            this.tabList.forEach((v, index) => {
                if (v.path == this.nowPath) {
                    nowRouteIndex = index;
                }
            });
            
            var disXY = Math.abs(direction)>Math.abs(directionY);
            
            if (disXY&&direction >= 0 && nowRouteIndex < this.tabList.length - 1) {
                //设置向前动画
                this.slideDirection = 'slideforward';
                this.$router.push({'path': this.tabList[nowRouteIndex + 1].path});
            } 
            if (disXY&&direction < 0 && nowRouteIndex > 0) {
                //设置向后动画
                this.slideDirection = 'slideback';
                this.$router.push({'path': this.tabList[nowRouteIndex - 1].path});
            }
        },
        initTouchedEvent() {
            this.$el.addEventListener('touchstart', this.touchedstartHandler.bind(this));
            this.$el.addEventListener('touchend', this.touchendHandler.bind(this));
        },
    },
    watch: {
        '$route' (to, from) {
            this.nowPath = to.path;
        }
    }
};
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    body {
        height: 100%;
        width: 100%;
        background-color: #fbf9fe;
    }
    a {
        color: #333;
        text-decoration: none;
    }
    .page {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .page-tab {
        display: flex;
        justify-content: center;
    }
    .tab-item {
        text-align: center;
        align-items: center;
        height: 44px;
        line-height: 44px;
        flex: 1;
        height: 100%;
        background-color: #fff;
    }
    .tab-item_active {
        border-bottom: 3px solid #f90;
    }
    .tab-item_active a {
        color: #f90;
    }
    .slideforward-enter-active, .slideforward-leave-active {
        position: absolute;
        transition: all .5s;
        transform: translate3d(0px, 0px, 0px);
    }
    .slideforward-enter, .slideforward-leave-to {
        position: absolute;
        transform:  translate3d(200px, 0px, 0px);
    }
    .slideback-enter-active, .slideback-leave-active {
        position: absolute;
        transition: all .5s;
        transform: translate3d(0px, 0px, 0px);
    }
    .slideback-enter, .slideback-leave-to {
        position: absolute;
        transform:  translate3d(-200px, 0px, 0px);
    }
</style>
