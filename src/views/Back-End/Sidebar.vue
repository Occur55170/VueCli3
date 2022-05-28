<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3">
    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
      <span>產品列表</span>
    </h6>
    <ul class="nav flex-column mb-2">
      <li class="nav-item">
        <RouterLink to="/Admin/Products" class="nav-link font-weight-bold"><i class="fas fa-box-open"></i>產品列表</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/Admin/OrderList" class="nav-link font-weight-bold"><i class="far fa-list-alt"></i>訂單列表</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/Admin/Coupon" class="nav-link font-weight-bold"><i class="fas fa-ticket-alt"></i>優惠卷</RouterLink>
      </li>
    </ul>
    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
      <span>模擬功能</span>
    </h6>
    <ul class="nav flex-column mb-2">
      <li class="nav-item">
        <RouterLink to="/AdminOrder" class="nav-link font-weight-bold"><i class="fas fa-shopping-cart"></i>模擬訂單</RouterLink>
      </li>
    </ul>
    </div>
  </nav>
</template>
