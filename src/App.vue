<template>
  <div id="app">
      <TabPages 
                  :tab-list='tabList'>
          <router-view/>
      </TabPages>
  </div>
</template>

<script>
import TabPages from './components/index';

export default {
  name: 'app',
  data() {
      return {
        tabList: [{
            name: 'tab1',
            path: '/'
        }, {
            name: 'tab2',
            path: '/page2'
        }, {
            name: 'tab3',
            path: '/page3'
        }, {
            name: 'tab4',
            path: '/page4'
        }]
      }
  },
  components: {
      TabPages
  }
}
</script>

<style>

</style>
