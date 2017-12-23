<template>
  <div class="main">

  </div>
</template>

<script>
  import Bar from '../../node_modules/vue-chartjs/es/BaseCharts/Bar.js';

  export default {
    extends: Bar,
      data() {
          return {

          }
      },
    mounted () {
      this.renderChart({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'GitHub Commits',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          }
        ]
      })
    }
  }
</script>

<style scoped>
  .main {

  }

</style>
