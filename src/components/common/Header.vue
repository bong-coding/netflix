<!-- src/components/common/Header.vue -->
<template>
  <header :class="['header', { scrolled }]">
    <div class="logo" @click="navigateHome">
      <img src="@/assets/images/logo.png" alt="Logo" />
    </div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/popular">Popular</router-link>
      <router-link to="/search">Search</router-link>
      <router-link to="/wishlist">Wishlist</router-link>
    </nav>
    <div class="auth-section" v-if="isLoggedIn">
      <span>{{ user }}</span>
      <button @click="logout">Logout</button>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      scrolled: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["isLoggedIn", "user"]),
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    navigateHome() {
      this.$router.push("/");
    },
    handleScroll() {
      this.scrolled = window.scrollY > 50;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<!-- src/components/common/Header.vue -->
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  transition: background-color 0.5s, opacity 0.5s;
  background-color: transparent;
}
.header.scrolled {
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0.95;
}
.logo img {
  height: 40px;
  cursor: pointer;
}
nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #fff;
  transition: color 0.3s;
}
nav a:hover {
  color: #42b983;
}
.auth-section {
  display: flex;
  align-items: center;
}
.auth-section span {
  margin-right: 10px;
  color: #fff;
}
.auth-section button {
  padding: 5px 10px;
  cursor: pointer;
  background-color: #ff4d4f;
  border: none;
  border-radius: 4px;
  color: white;
  transition: background-color 0.3s;
}
.auth-section button:hover {
  background-color: #ff7875;
}
</style>
