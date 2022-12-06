import Plot from "../common/plot/Plot.js";

const solve = (initialInput) => {
    let input = initialInput.map(i => {
        let split = i.split(',');
        let aSplit = split[0].split('-').map(s => { return parseInt(s, 10) });
        let bSplit = split[1].split('-').map(s => { return parseInt(s, 10) });;

        return {
            aSplit,
            bSplit
        }
    });

    // Basic solution 4.1
    const containments = input.map(i => {
        let aRange = Math.abs(i.aSplit[0] - i.aSplit[1]);
        let bRange = Math.abs(i.bSplit[0] - i.bSplit[1]);
        let maxRangeId = aRange > bRange ? 'a' : 'b';
        let largerRange = maxRangeId === 'a' ? i.aSplit : i.bSplit;
        let smallerRange = maxRangeId === 'a' ? i.bSplit : i.aSplit;
        
        let contained;

        if(smallerRange[0] >= largerRange[0] && smallerRange[1] <= largerRange[1]) {
            contained = true;
        } else {
            contained = false;
        }
        return {
            aRange,
            bRange,
            aSplit: i.aSplit,
            bSplit: i.bSplit,
            smallerRange,
            largerRange,
            contained
        }
    })

    //console.table(containments.filter(c => c.contained).length)

    /*let linePairs = input.map(pair => {
        let lineComponentsA = pair.aSplit;
        let lineComponentsB = pair.bSplit;
        
        return {
            line_a: { 
                p1: { x: lineComponentsA[0], y: 0 }, 
                p2: { x: lineComponentsA[1], y: 0 } 
            },
            line_b: { 
                p1: { x: lineComponentsB[0], y: 0 }, 
                p2: { x: lineComponentsB[1], y: 0 } 
            }
        }
    })

    Plot({
        series: linePairs.slice(0, 10).map((pair, i) => { 
            return {
                x: [(i * 5) + pair.line_a.p1.x, (i * 5) + pair.line_a.p2.x],
                y: [(i * 5), (i * 5)],
            }
        })
    })*/
    

    const overlaps = input.map(i => {
        let aRange = Math.abs(i.aSplit[0] - i.aSplit[1]);
        let bRange = Math.abs(i.bSplit[0] - i.bSplit[1]);
        let maxRangeId = aRange > bRange ? 'a' : 'b';
        let largerRange = maxRangeId === 'a' ? i.aSplit : i.bSplit;
        let smallerRange = maxRangeId === 'a' ? i.bSplit : i.aSplit;

        let overlap;

        if((smallerRange[0] >= largerRange[0] && smallerRange[0] <= largerRange[1]) || (smallerRange[1] <= largerRange[1] && smallerRange[1] >= largerRange[0])) {
            overlap = true;
        } else {
            overlap = false;
        }
        return {
            aSplit: i.aSplit,
            bSplit: i.bSplit,
            overlap

        }
    })

    console.table(overlaps.filter(c => c.overlap).length)
}

export default solve;