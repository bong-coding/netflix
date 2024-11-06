<!-- src/components/common/MovieCard.vue -->
<template>
  <div class="movie-card" @click="toggleWishlist(movie)">
    <img :src="imageUrl" alt="Movie Poster" />
    <div class="movie-info">
      <h3>{{ movie.title }}</h3>
      <p>{{ truncateText(movie.overview, 100) }}</p>
    </div>
    <div class="wishlist-icon">
      <i :class="isInWishlist ? 'fas fa-heart' : 'far fa-heart'"></i>
    </div>
  </div>
</template>

<script>
import { useWishlist } from "../../hooks/useWishlist";
import { computed } from "vue";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../utils/constants";

export default {
  name: "MovieCard",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { wishlist, toggleWishlist } = useWishlist();

    const isInWishlist = computed(() =>
      wishlist.value.some((item) => item.id === props.movie.id)
    );

    const imageUrl = computed(() => {
      return props.movie.poster_path
        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${props.movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";
    });

    const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    };

    return {
      toggleWishlist,
      isInWishlist,
      imageUrl,
      truncateText,
    };
  },
};
</script>

<!-- src/components/common/MovieCard.vue -->
<style scoped>
.movie-card {
  position: relative;
  width: 200px;
  margin: 10px;
  cursor: pointer;
  transition: transform 0.3s;
}
.movie-card:hover {
  transform: scale(1.05);
}
.movie-card img {
  width: 100%;
  border-radius: 8px;
  transition: transform 0.3s;
}
.movie-card:hover img {
  transform: scale(1.1);
}
.movie-info {
  padding: 10px 0;
}
.movie-info h3 {
  margin: 0;
  font-size: 1.1em;
}
.movie-info p {
  font-size: 0.9em;
  color: #555;
}
.wishlist-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  color: red;
  font-size: 1.5em;
  transition: transform 0.3s;
}
.movie-card:hover .wishlist-icon {
  transform: scale(1.2);
}
</style>
