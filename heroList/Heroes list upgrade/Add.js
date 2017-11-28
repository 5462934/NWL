export default {
  template: `
    <div>
      ID:<input type="text" v-model="addId"/>
      名称:<input type="text" v-model="addName"/>
      <button @click="addHero">添加</button>
    </div>
  `,
  props: ['heros'],
  data() {
    return {
      addId: '',
      addName: '',
    }
  },
  methods: {
    addHero() {
      this.heros.push({
        id: this.addId,
        name: this.addName
      })
    }
  }
}