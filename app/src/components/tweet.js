Vue.component('tweet',{
  props: ['data'],
  template: `
  <li class="tweet" >
    <div class="tweet-header">
      <img class="user-img" :src="data.userImg" alt="" width="48px" height="48px">
      <div class="content-wrapper">
        <div class="user-name">
          {{data.userName}}
        </div>
        <div class="sub-user-name">
          {{data.userScreenName}}
        </div>
        <div class="date">
          {{data.createdAt}}
        </div>
      </div>
    </div>
    <div class="tweet-text" v-html="data.text">
    </div>
  </li>`
});