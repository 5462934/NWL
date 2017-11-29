export default {
  template: `
    <div>
      英雄详情：
        <ul>
        <li>
          ID:{{hero.id}}<br>
          名称:{{hero.name}}
        </li>
    	</ul>
    </div>
  `, 
  data() {
    return {
      heros: [{ id: 1, name: '李白' }, { id: 2, name: '娜可露露' }, { id: 3, name: '貂蝉' }, { id: 4, name: '后羿' }, { id: 5, name: '王昭君' }],
      hero: ''
    }
  },
  created() {
    console.log(this.$route.query.id);
    var id = this.$route.query.id || this.$route.params.id;
    this.hero = this.heros.find(ele => ele.id == id);
    
  }
}