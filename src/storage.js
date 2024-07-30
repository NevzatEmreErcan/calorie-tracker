class Storage {
  static getCalorieLimit(defaultLimit = 2000) {
    let calorieLimit;
    if (localStorage.getItem("calorieLimit") === null) {
      calorieLimit = defaultLimit;
    } else {
      calorieLimit = +localStorage.getItem("calorieLimit");
    }

    return calorieLimit;
  }

  static setCalorieLimit(value) {
    localStorage.setItem("calorieLimit", value);
  }

  static getTotalCalories(defaultTotalCalories = 0) {
    let totalCalories;
    if (localStorage.getItem("totalCalories") === null) {
      totalCalories = defaultTotalCalories;
    } else {
      totalCalories = +localStorage.getItem("totalCalories");
    }

    return totalCalories;
  }

  static setTotalCalories(value) {
    localStorage.setItem("totalCalories", value);
  }

  static getMeals() {
    let meals;
    if (localStorage.getItem("meals") === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem("meals"));
    }

    return meals;
  }

  static saveMeal(meal) {
    const meals = this.getMeals();
    meals.push(meal);
    localStorage.setItem("meals", JSON.stringify(meals));
  }

  static removeMeal(index){
    const meals = this.getMeals();
    meals.splice(index, 1);

    localStorage.setItem("meals", JSON.stringify(meals))
  }

  static getWorkouts() {
    let workouts;
    if (localStorage.getItem("workouts") === null) {
      workouts = [];
    } else {
      workouts = JSON.parse(localStorage.getItem("workouts"));
    }
  
    return workouts;
  }
  
  static saveWorkout(workout) {
    const workouts = this.getWorkouts();
    workouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }

  static removeWorkout(index){
    const workouts = this.getWorkouts();
    workouts.splice(index, 1);

    localStorage.setItem("workouts", JSON.stringify(workouts))
  }

  static clear(){
    localStorage.removeItem("totalCalories")
    localStorage.removeItem("meals")
    localStorage.removeItem("workouts")
  }
}

export { Storage };
