import { CalorieTracker } from "./calorieTracker";
import { Meal, Workout } from "./items";

class App {
  constructor() {
    this._tracker = new CalorieTracker();

    this._addEventListeners();
    this._tracker.loadItems();
  }

  _addEventListeners() {
    document
      .querySelector("#set-daily-limit-btn")
      .addEventListener("click", this._openModal);
    document
      .querySelector("#close-modal-btn")
      .addEventListener("click", this._closeModal);
    document
      .querySelector("#meal-dropdown-btn")
      .addEventListener("click", () => this._dropDown("meal"));
    document
      .querySelector("#workout-dropdown-btn")
      .addEventListener("click", () => this._dropDown("workout"));
    document
      .querySelector("#meal-form")
      .addEventListener("submit", this._newItem.bind(this, "meal"));
    document
      .querySelector("#workout-form")
      .addEventListener("submit", this._newItem.bind(this, "workout"));
    document
      .querySelector("#meal-list")
      .addEventListener("click", this._removeItem.bind(this, "meal"));
    document
      .querySelector("#workout-list")
      .addEventListener("click", this._removeItem.bind(this, "workout"));
    document
      .querySelector("#calorie-limit-form")
      .addEventListener("submit", this._setLimit.bind(this));
    document
      .querySelector("#reset-btn")
      .addEventListener("click", this._reset.bind(this));
    document
      .querySelector("#meal-filter")
      .addEventListener("keyup", this._filterItems.bind(this, "meal"));
    document
      .querySelector("#workout-filter")
      .addEventListener("keyup", this._filterItems.bind(this, "workout"));
  }

  _openModal() {
    const limitModal = document.querySelector("#daily-limit-modal");
    limitModal.style.display = "flex";
  }

  _closeModal() {
    const limitModal = document.querySelector("#daily-limit-modal");
    limitModal.style.display = "none";
  }

  _dropDown(type) {
    if (type === "meal"){
      const dropdown = document.querySelector("#meal-dropdown");
      dropdown.classList.toggle("hidden");
    } else if(type === "workout"){
      const dropdown = document.querySelector("#workout-dropdown");
      dropdown.classList.toggle("hidden");
    }
  }

  _newItem(type, e) {
    e.preventDefault();

    const name = document.querySelector(`#${type}-name`);
    const calories = document.querySelector(`#${type}-calories`);
    const caloriesValue = +calories.value;

    if (name.value === "" || calories.value === "") {
      alert("Please fill in all fields");
    } else if (caloriesValue < 0) {
      alert("Calorie value can't be negative");
    } else {
      if (type === "meal") {
        const item = new Meal(name.value, caloriesValue);
        this._tracker.addMeal(item);
        this._dropDown("meal")
      } else if (type === "workout") {
        const item = new Workout(name.value, caloriesValue);
        this._tracker.addWorkout(item);
        this._dropDown("workout")
      }

      name.value = "";
      calories.value = "";
    }
  }

  _removeItem(type, e) {
    if (e.target.tagName === "I" || e.target.tagName === "BUTTON") {
      if (confirm("Are you sure?")) {
        const id = e.target.closest(".flex").getAttribute("data-id");

        if (type === "meal") {
          this._tracker.removeMeal(id);
        } else if (type === "workout") {
          this._tracker.removeWorkout(id);
        }

        e.target.closest(".flex").remove();
      }
    }
  }

  _filterItems(type, e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(`#${type}-item`).forEach((item) => {
      const name = item.firstElementChild.textContent.toLocaleLowerCase();

      if (name.indexOf(text) !== -1) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  }

  _setLimit(e) {
    e.preventDefault();

    const newLimit = document.querySelector("#new-calorie-limit");
    if (newLimit.value >= 0 && newLimit.value !== "") {
      this._tracker.setLimit(newLimit.value);
    }

    this._closeModal();
    newLimit.value = "";
  }

  _reset() {
    if (confirm("Are you sure?")) {
      const mealList = document.querySelector("#meal-list");
      const workoutList = document.querySelector("#workout-list");

      while (mealList.firstChild) {
        mealList.firstChild.remove();
      }
      while (workoutList.firstChild) {
        workoutList.firstChild.remove();
      }

      this._tracker.reset();
    }
  }
}

const app = new App();

export { App };
