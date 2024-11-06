<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <h1>Popular Movies</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">Error loading movies.</div>
    <div v-else class="movies-grid">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script>
import { useFetch } from "../hooks/useFetch";
import MovieCard from "../components/common/MovieCard.vue";

export default {
  name: "Home",
  components: {
    MovieCard,
  },
  setup() {
    const { data, error, loading } = useFetch("/movie/popular");

    return {
      movies: data,
      error,
      loading,
    };
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
}
.loading,
.error {
  text-align: center;
  font-size: 1.2em;
  margin-top: 50px;
}
.movies-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
