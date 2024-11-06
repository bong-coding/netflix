<!-- src/views/SignIn.vue -->
<template>
  <div class="signin-container">
    <div class="form-container">
      <transition name="fade">
        <h2 key="title">{{ isSignIn ? "Sign In" : "Sign Up" }}</h2>
      </transition>
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            @blur="validateEmail"
            required
          />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>
        <div class="input-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div v-if="!isSignIn" class="input-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            @blur="validatePassword"
            required
          />
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </div>
        <div class="checkbox-group" v-if="!isSignIn">
          <input type="checkbox" id="terms" v-model="terms" required />
          <label for="terms">I agree to the terms and conditions</label>
        </div>
        <div class="checkbox-group" v-if="isSignIn">
          <input type="checkbox" id="rememberMe" v-model="rememberMe" />
          <label for="rememberMe">Remember me</label>
        </div>
        <button type="submit">{{ isSignIn ? "Sign In" : "Sign Up" }}</button>
      </form>
      <p>
        <transition name="fade">
          <span key="text">
            {{
              isSignIn ? "Don’t have an account?" : "Already have an account?"
            }}
            <button @click="toggleForm">
              {{ isSignIn ? "Sign Up" : "Sign In" }}
            </button>
          </span>
        </transition>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { useToast } from "vue-toastification";
import { tryLogin, tryRegister } from "../utils/auth";

export default {
  name: "SignIn",
  data() {
    return {
      isSignIn: true,
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
      terms: false,
      emailError: "",
      passwordError: "",
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    toggleForm() {
      this.isSignIn = !this.isSignIn;
      this.resetForm();
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.email)) {
        this.emailError = "Invalid email format.";
      } else {
        this.emailError = "";
      }
    },
    validatePassword() {
      if (this.password !== this.confirmPassword) {
        this.passwordError = "Passwords do not match.";
      } else {
        this.passwordError = "";
      }
    },
    handleSubmit() {
      if (!this.isSignIn) {
        this.validateEmail();
        this.validatePassword();
        if (this.emailError || this.passwordError || !this.terms) {
          this.toast.error("Please fix the errors before submitting.");
          return;
        }
      }

      if (this.isSignIn) {
        // 로그인 로직
        tryLogin(
          this.email,
          this.password,
          (user) => {
            this.login(user);
            if (this.rememberMe) {
              localStorage.setItem("isLoggedIn", true);
            } else {
              sessionStorage.setItem("isLoggedIn", true);
            }
            this.toast.success("Successfully signed in!");
            this.$router.push("/");
          },
          () => {
            this.toast.error("Authentication failed. Please try again.");
          },
          this.rememberMe
        );
      } else {
        // 회원가입 로직
        tryRegister(
          this.email,
          this.password,
          () => {
            this.toast.success("Successfully registered! Please sign in.");
            this.isSignIn = true;
            this.resetForm();
          },
          () => {
            this.toast.error(
              "Registration failed. Email may already be in use."
            );
          }
        );
      }
    },
    resetForm() {
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.rememberMe = false;
      this.terms = false;
      this.emailError = "";
      this.passwordError = "";
    },
  },
};
</script>

<style scoped>
.signin-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #f5f5f5;
}
.form-container {
  width: 400px;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.input-group {
  margin-bottom: 20px;
}
.input-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}
.input-group input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.checkbox-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.checkbox-group input {
  margin-right: 10px;
}
button {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #369870;
}
.error {
  color: red;
  font-size: 0.9em;
}
p {
  text-align: center;
  margin-top: 15px;
}
p button {
  background: none;
  border: none;
  color: #42b983;
  cursor: pointer;
  text-decoration: underline;
  font-size: 1em;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
