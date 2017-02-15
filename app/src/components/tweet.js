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
        <div class="sub-user-name" v-html="data.userScreenName"></div>
        <div class="date">
          {{data.createdAt}}
        </div>
      </div>
    </div>
    <img class="theaser-img" v-if="data.theaserImg" :src="data.theaserImg" alt="">
    <div class="tweet-text" v-html="data.text"></div>
  </li>`
});