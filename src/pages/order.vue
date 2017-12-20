<template>
  <div class="order">
    <orderItem :fooditem="fooditem"></orderItem>
  </div>
</template>

<script>
  import orderItem from '@/components/orderItem.vue'
  export default {
      data() {
        return {
            fooditem:{
              "img": "../../static/food.jpg",
              "name": "千叶豆腐",
              "price": "18",
              "flag": "1"
            }
        }
      },
      components: {
          orderItem
      }
  }
</script>

<style scoped>
  .order {

  }
</style>
