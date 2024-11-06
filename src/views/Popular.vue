<!-- src/views/Popular.vue -->
<template>
  <div class="popular">
    <h1>Popular Movies</h1>
    <div class="view-toggle">
      <button
        @click="setView('table')"
        :class="{ active: currentView === 'table' }"
      >
        Table View
      </button>
      <button
        @click="setView('infinite')"
        :class="{ active: currentView === 'infinite' }"
      >
        Infinite Scroll
      </button>
    </div>
    <div v-if="currentView === 'table'" class="table-view">
      <table>
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title</th>
            <th>Overview</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movies" :key="movie.id">
            <td><img :src="getImageUrl(movie.poster_path)" alt="Poster" /></td>
            <td>{{ movie.title }}</td>
            <td>{{ truncateText(movie.overview, 100) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="page === 1">Previous</button>
        <span>Page {{ page }}</span>
        <button @click="nextPage">Next</button>
      </div>
    </div>
    <div v-else class="infinite-view">
      <div class="movies-grid">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
      <div v-if="loading" class="loading">Loading more movies...</div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useFetch } from "../hooks/useFetch";
import MovieCard from "../components/common/MovieCard.vue";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../utils/constants";

export default {
  name: "Popular",
  components: {
    MovieCard,
  },
  setup() {
    const currentView = ref("table");
    const page = ref(1);
    const { data, error, loading } = useFetch("/movie/popular", {
      page: page.value,
    });
    const movies = ref([]);

    watch(data, (newData) => {
      if (newData) {
        if (currentView.value === "infinite") {
          movies.value = movies.value.concat(newData.results);
        } else {
          movies.value = newData.results;
        }
      }
    });

    const setView = (view) => {
      currentView.value = view;
      if (view === "table") {
        page.value = 1;
      }
    };

    const nextPage = () => {
      page.value += 1;
    };

    const prevPage = () => {
      if (page.value > 1) page.value -= 1;
    };

    const getImageUrl = (path) => {
      return path
        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${path}`
        : "https://via.placeholder.com/500x750?text=No+Image";
    };

    const truncateText = (text, maxLength) => {
      if (!text) {
        return ""; // text가 undefined 또는 null일 경우 빈 문자열 반환
      }
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    };
    // Infinite Scroll 구현
    if (currentView.value === "infinite") {
      window.addEventListener("scroll", handleScroll);
    }

    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading.value
      ) {
        page.value += 1;
      }
    }

    watch(currentView, (newView) => {
      if (newView === "infinite") {
        window.addEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    });

    return {
      currentView,
      setView,
      movies,
      loading,
      error,
      page,
      nextPage,
      prevPage,
      getImageUrl,
      truncateText,
    };
  },
};
</script>

<style scoped>
.popular {
  padding: 20px;
}
.view-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.view-toggle button {
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border: none;
  background-color: #ccc;
  border-radius: 4px;
  transition: background-color 0.3s;
}
.view-toggle button.active,
.view-toggle button:hover {
  background-color: #42b983;
  color: white;
}
.table-view table {
  width: 100%;
  border-collapse: collapse;
}
.table-view th,
.table-view td {
  border: 1px solid #ddd;
  padding: 8px;
}
.table-view th {
  background-color: #f2f2f2;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.pagination button {
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border: none;
  background-color: #42b983;
  color: white;
  border-radius: 4px;
}
.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.infinite-view .movies-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.loading {
  text-align: center;
  margin: 20px 0;
  font-size: 1.2em;
}
</style>
