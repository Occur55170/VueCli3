# 幸福烘焙電商網站 | [Demo](https://occur55170.github.io/VueCli3/#/)  

> Vue CLI 3 電商 :
  這是一份以 Vue.js 為框架的前端練習作品，無任何商業用途

### 畫面展示

#### 首頁
![幸福烘焙首頁](https://upload.cc/i1/2022/04/28/UrCXlc.jpg)
#### 商品列表頁
![商品列表頁](https://upload.cc/i1/2022/04/28/noQmUv.jpg)


=======

## 作品簡介

此作品為 Vue.js 前端練習，其功能包含：

- 前台：
  - 首頁：介紹網站與吸引使用者目光
  - 商品列表頁：提供多項商品、分類、放入購物車功能
  - 商品內容頁：單一商品介紹、大量下單功能、相關商品推薦功能
  - 購物車：查看目前放入購物車的商品，並且可以進行數量的變更或刪除，也可以進行後續結帳流程
  - 訂單頁：查看過去建立成功的訂單清單狀態
  - 結帳頁：商品資訊確認、訂單使用者資料填寫，優惠碼套用
  - 付款頁：確認是否付款並傳送資料給管理者查詢付款狀態
  
- 後台：
  - 管理者登入
  - 商品頁面：管理商品（新增、修改、刪除）
  - 優惠卷頁面：管理優惠卷 (新增、修改、刪除)
  - 訂單頁面：管理訂單 (查詢、修改)
  - 測試頁：測試商品購買流程(放入購物車、建立訂單、加入優惠卷、結帳)
  
## Skills | 使用技術

使用Vue前端框架，讓協作開發與日後擴充修改更容易，並提供更平順的瀏覽體驗

* 程式相關
  * Vue: 建構 SPA，前後端分離開發
  * Vue CLI 3 : 整合 Vue 生態系的開發環境
  * Vue Component: 將 Web 應用元件化，方便管理、協作
  * Vue Router: 管理前端路由
  * Vuex: 管理網站狀態，跨組件溝通更方便
  * axios: 方便 API 串接
  * ES6: 使用現代主流瀏覽器支援的 JavaScript 語法
  
* 切版相關
  * CSS3: 使用現代主流瀏覽器支援的 CSS 
  * SCSS: 巢嵌 CSS，開發樣式更方便
  * Bootstrap4: 格線系統、顏色管理、元件、utility
  * RWD: 不同斷點的變化，使用者體驗更好
  
* 工具相關
  * Github: 控管程式碼版本
  * VSCode: 編譯工具
  
* 其他
  * 使用 vue-router 處理商品分類的網址
  * 使用 vee-validate 驗證表單


## Plugins | 使用插件

* [@fontawesome](https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers) | icon 圖示
* [axios](https://www.npmjs.com/package/axios)、[vue-axios](https://www.npmjs.com/package/vue-axios) | 方便串接 API
* [vue-awesome-swiper](https://github.surmon.me/vue-awesome-swiper/) | Swiper 輪播效果
* [AOS](https://michalsnik.github.io/aos/) | 滾動式動畫效果
* [bootstrap](https://www.npmjs.com/package/bootstrap) | CSS library
* [jquery](https://www.npmjs.com/package/jquery) | 搭配 BS4
* [popper](https://www.npmjs.com/package/popper) | 搭配 BS4
* [vee-validate](https://www.npmjs.com/package/vee-validate) | 驗證表單
* [vue](https://www.npmjs.com/package/vue) | 前端框架
* [vue-loading-overlay](https://www.npmjs.com/package/vue-loading-overlay) | 全畫面 loading 狀態
* [vue-router](https://www.npmjs.com/package/vue-router) | 管理 vue 前端路由
* [vuex](https://www.npmjs.com/package/vuex) | 管理 vue 網站狀態
* [gh-pages](https://www.npmjs.com/package/gh-pages) | 將編譯後的程式碼佈署到 gh-pages
* [vue-Carousel](https://www.npmjs.com/package/vue-carousel) | 輪播圖套件
* [vue-meta](https://www.npmjs.com/package/vue-meta) | 動態切換meta

## 環境建構
```
npm install   # 安裝相依套件
npm run serve # 建立開發環境
npm run build # 編譯出能放到生產環境的程式碼
```
