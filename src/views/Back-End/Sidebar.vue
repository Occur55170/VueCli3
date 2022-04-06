<template>
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="position-sticky pt-3">
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>產品列表</span>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link to="/admin/Products" class="nav-link font-weight-bold"><i class="fas fa-box-open"></i>產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/orderList" class="nav-link font-weight-bold"><i class="far fa-list-alt"></i>訂單列表</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/Coupon" class="nav-link font-weight-bold"><i class="fas fa-ticket-alt"></i>優惠卷</router-link>
          </li>
        </ul>
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>模擬功能</span>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link to="/admin_Order" class="nav-link font-weight-bold"><i class="fas fa-shopping-cart"></i>模擬訂單</router-link>
          </li>
        </ul>
      </div>
    </nav>
</template>
