export default {
  template: `
    <div>
      <ul>
        <li v-for="(hero, index) in heros" :key="index">
          {{hero.id}} {{hero.name}}
        </li>
      </ul>
    </div>
  `,
  props: ['heros']
}