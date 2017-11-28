export default {
  template: `
    <div>
      ID:<input type="text"  v-model="updateId" />
      名称:<input type="text" v-model="updateName"  />
      <button @click="updateHero">更新</button>
    </div>
  `,
  props: ['heros'],
  data() {
    return {
      updateId: '',
      updateName: ''
    }
  },
  methods: {
    updateHero() {
      var hero = this.heros.find(ele => ele.id == this.updateId);
      if(!hero) {
        alert('英雄不存在');
        returnl;
      }

      // 更改英雄名称
      hero.name = this.updateName;
    }
  }
}