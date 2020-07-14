<template>
  <div class="container">
    <b-container fluid>
      <Logo />
      <h1 class="title">
        Orders
      </h1>
      <FilterTable />
      <div class="links">
        <nuxt-link to="/" class="button--green">
          Orders
        </nuxt-link>
      </div>
    </b-container>
  </div>
</template>

<script>
import FilterTable from '../components/FilterTable'
export default {
  components: {
    FilterTable,
  },
  async fetch() {
    const data = await fetch('http://localhost:8080/order').then((res) =>
      res.json()
    )
    this.$store.commit('orders/getOrderData', data)
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
