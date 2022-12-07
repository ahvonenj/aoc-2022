const solve = (initialInput) => {
    const input = initialInput[0].split('');
    let marker = 0;
    let lastFour = [];

    for(let i = 14; i < input.length; i++) {
        const s = [...new Set(input.slice(i - 14, i))];
        if(s.length === 14) {
            marker = i;
            lastFour = s;
            break;
        }
    }

    console.log(`marker: ${marker}, markerFour: ${lastFour}`)
}

export default solve;