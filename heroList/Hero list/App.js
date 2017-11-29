export default {
  template: `
    <div>
    <!-- 点击下方列表页出现 -->
      <router-link :to="{ name: 'list' }">点击查看英雄列表</router-link>
      <router-view></router-view>
    </div>
  `,
}