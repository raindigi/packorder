<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      show-empty
      small
      stacked="md"
      :items="serveOrderData"
      :fields="fields"
      :filter="filter"
      :current-page="currentPage"
      :per-page="perPage"
      :filter-included-fields="filterOn"
      @filtered="onFiltered"
    >
      <template v-slot:cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>

      <template v-slot:cell(actions)="row">
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </b-card>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      fields: [
        {
          key: 'order_name',
          label: 'Order Name',
          sortable: true,
          sortDirection: 'desc',
        },
        {
          key: 'company_name',
          label: 'Customer Company',
          sortable: false,
          class: 'text-center',
        },
        {
          key: 'fullname',
          label: 'Customer Name',
          sortable: false,
          class: 'text-center',
        },
        {
          key: 'created_at',
          label: 'Order Date',
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },
        {
          key: 'total_delivered',
          label: 'Delivered Amount',
          sortable: false,

          sortDirection: 'desc',
        },
        {
          key: 'total',
          label: 'Total Amount',
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },
      ],

      perPage: 5,
      pageOptions: [5, 10, 15],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
    }
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key }
        })
    },
    ...mapGetters('orders', ['serveOrderData']),
  },
  mounted() {
    this.totalRows = this.serveOrderData.length
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
