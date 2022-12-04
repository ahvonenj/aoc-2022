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
            elfCalories.push(parseInt(calory, 10));
            return;
        }

        elfCalories.push(parseInt(calory, 10));
    })

    caloriesByElf.push(elfCalories);

    caloriesByElf = caloriesByElf.map(c => c.reduce((a, b) => a + b));

    const m1 = Math.max(...caloriesByElf);
    caloriesByElf.splice(caloriesByElf.findIndex((v) => v === m1), 1);
    const m2 = Math.max(...caloriesByElf);
    caloriesByElf.splice(caloriesByElf.findIndex((v) => v === m2), 1);
    const m3 = Math.max(...caloriesByElf);

    console.log(m1, m2, m3, m1 + m2 + m3)
}

export default solve;