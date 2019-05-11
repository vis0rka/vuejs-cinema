import Vue from 'vue';
import './style.scss';
import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import { checkFilter } from './util/bus';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: [],
    movies: [],
    moment,
    day: moment(),
    bus
  },
  methods: {  },
  components: {
    MovieList,
    MovieFilter,
  },
  created() {
    fetch('/api', { method: 'GET' })
      .then(dataWrappedByPromise => dataWrappedByPromise.json())
      .then(resdata => this.movies = resdata);

    this.$bus.$on('check-filter', checkFilter.bind(this));
  }
});

