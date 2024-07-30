import { Meal, Workout } from "./items";
import { Storage } from "./storage";

class CalorieTracker {
  constructor() {
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = Storage.getTotalCalories();
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();

    this._displayCalorieLimit();
    this._displayCaloriesTotal();
    this._displayConsumedCalories();
    this._displayBurnedCalories();
    this._displayRemainingCalories();
    this._displayProgressBar();
  }

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    Storage.setTotalCalories(this._totalCalories);
    this._displayNewMeal(meal);
    Storage.saveMeal(meal);

    this._render();
  }

  removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id === id);

    if (index !== -1) {
      const meal = this._meals[index];
      this._totalCalories -= meal.calories;
      Storage.setTotalCalories(this._totalCalories);
      this._meals.splice(index, 1);
      Storage.removeMeal(index);

      this._render();
    }
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    Storage.setTotalCalories(this._totalCalories);
    this._displayNewWorkout(workout);
    Storage.saveWorkout(workout);

    this._render();
  }

  removeWorkout(id) {
    const index = this._workouts.findIndex((workout) => workout.id === id);

    if (index !== -1) {
      const workout = this._workouts[index];
      this._totalCalories += workout.calories;
      Storage.setTotalCalories(this._totalCalories);
      this._workouts.splice(index, 1);
      Storage.removeWorkout(index);

      this._render();
    }
  }

  reset() {
    this._meals = [];
    this._workouts = [];
    this._totalCalories = 0;
    Storage.clear();

    this._render();
  }

  setLimit(value) {
    this._calorieLimit = value;
    Storage.setCalorieLimit(value);
    this._displayCalorieLimit();

    this._render();
  }

  loadItems() {
    this._meals.forEach((meal) => this._displayNewMeal(meal));
    this._workouts.forEach((workout) => this._displayNewWorkout(workout));
  }

  /* Private Methods */

  _displayCalorieLimit() {
    const calorieLimit_Div = document.querySelector("#daily-calorie-limit");
    calorieLimit_Div.innerHTML = this._calorieLimit;
  }

  _displayCaloriesTotal() {
    const totalCalories_Div = document.querySelector("#total-calories");
    totalCalories_Div.innerHTML = this._totalCalories;

    if (this._totalCalories >= 0) {
      totalCalories_Div.parentElement.classList.remove("bg-orange-500");
      totalCalories_Div.parentElement.classList.add("bg-lime-500");
    } else {
      totalCalories_Div.parentElement.classList.remove("bg-lime-500");
      totalCalories_Div.parentElement.classList.add("bg-orange-500");
    }
  }

  _displayConsumedCalories() {
    const consumedCalories_Div = document.querySelector("#calories-consumed");
    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
    consumedCalories_Div.innerHTML = consumed;
  }

  _displayBurnedCalories() {
    const burnedCalories_Div = document.querySelector("#calories-burned");
    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );
    burnedCalories_Div.innerHTML = burned;
  }

  _displayRemainingCalories() {
    const remainingCalories_Div = document.querySelector("#calories-remaining");
    const remaining = this._calorieLimit - this._totalCalories;
    remainingCalories_Div.innerHTML = remaining;

    if (remaining < 0) {
      remainingCalories_Div.parentElement.classList.remove("bg-gray-100");
      remainingCalories_Div.parentElement.classList.add("bg-red-600");
      remainingCalories_Div.parentElement.classList.add("text-white");
    } else {
      remainingCalories_Div.parentElement.classList.remove("bg-red-500");
      remainingCalories_Div.parentElement.classList.add("bg-gray-100");
      remainingCalories_Div.parentElement.classList.remove("text-white");
    }
  }

  _displayProgressBar() {
    const progressBar = document.querySelector("#calories-progress");
    const per = Math.floor(
      100 -
        ((this._calorieLimit - this._totalCalories) / this._calorieLimit) * 100
    );

    if (per > 100) {
      progressBar.style.width = "100%";
      progressBar.classList.remove("bg-lime-500");
      progressBar.classList.add("bg-red-600");
    } else if (per >= 0) {
      progressBar.style.width = per + "%";
      progressBar.classList.remove("bg-red-600");
      progressBar.classList.add("bg-lime-500");
    } else {
      progressBar.style.width = "0%";
    }
  }

  _createElementCard(item, type) {
    const card = document.createElement("div");
    card.className =
      "bg-gray-100 flex justify-between py-4 px-3 rounded-md shadow-sm";
    card.setAttribute("data-id", item.id);

    const name = document.createElement("div");
    name.className = "basis-1/2  text-xl";
    name.innerHTML = item.name;

    const calories = document.createElement("div");
    calories.className = "text-white py-1 px-4 rounded-sm font-semibold";
    if (type === "meal") {
      card.id = "meal-item";
      calories.classList.add("bg-lime-400");
    } else if (type === "workout") {
      card.id = "workout-item";
      calories.classList.add("bg-orange-400");
    }
    calories.innerHTML = item.calories;

    const btn = document.createElement("button");
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-square-xmark text-red-600 text-2xl";
    btn.appendChild(icon);

    card.appendChild(name);
    card.appendChild(calories);
    card.appendChild(btn);

    return card;
  }

  _displayNewMeal(meal) {
    const card = this._createElementCard(meal, "meal");

    document.querySelector("#meal-list").appendChild(card);
  }

  _displayNewWorkout(workout) {
    const card = this._createElementCard(workout, "workout");

    document.querySelector("#workout-list").appendChild(card);
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayConsumedCalories();
    this._displayBurnedCalories();
    this._displayRemainingCalories();
    this._displayProgressBar();
  }
}

export { CalorieTracker };
