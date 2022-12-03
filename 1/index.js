const solve = (initialInput) => {
    // Fiddle with the input data to group it right
    let caloriesByElf = [];
    let elfCalories = [];

    initialInput.forEach((calory, idx) => {
        if(calory.length === 0) {
            caloriesByElf.push(elfCalories);
            elfCalories = [];
            return;
        }

        if(idx === initialInput.length - 1) {
            elfCalories.push(calory);
            return;
        }

        elfCalories.push(calory);
    })

    caloriesByElf.push(elfCalories);

    console.log(caloriesByElf);
}

export default solve;