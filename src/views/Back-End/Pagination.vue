<template>
  <div>
    <!-- page -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled':!pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(pagination.current_page-1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active':pagination.current_page == page}">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled':!pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(pagination.current_page+1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <!-- page -->
  </div>
</template>

<script>
export default {
  props: ['pagination'],
  methods: {
    changePage (page) {
      this.$emit('changePage', page)
    }
  }
}
</script>
