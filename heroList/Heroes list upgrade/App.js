export default {
  template: `
    <div>
      <list :heros="appHeros"></list>
      <add :heros="appHeros"></add>
      <del-vue :heros="appHeros"></del-vue>
      <update :heros="appHeros"></update>
    </div>
  `,
  data() {
    return {
      appHeros: [{ id: 1, name: '李白' }, { id: 2, name: '娜可露露' }, { id: 3, name: '貂蝉' }, { id: 4, name: '西施' }]
    }
  }
}