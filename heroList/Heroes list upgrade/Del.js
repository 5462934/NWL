export default {
  template: `
    <div>
      ID:<input type="text" v-model="delId"/>
      <button @click="delHero">删除</button>
    </div>
  `,
  props: ['heros'],
  data() {
    return {
      delId: ''
    }
  },
  methods: {
    delHero() {
      var index = this.heros.findIndex(ele => ele.id == this.delId);
      if (index == -1) return alert('英雄不存在');
      // 删除英雄
      this.heros.splice(index, 1);
    }
  }
}